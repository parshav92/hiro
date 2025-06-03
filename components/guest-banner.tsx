"use client";
import { useGuestAuth } from "@/hooks/use-guest-auth";
import { useState, useEffect, useCallback } from "react";
import { GuestSignIn } from "./auth/guest-sign-in";
import { useUser } from "@clerk/nextjs";

export const GuestBanner = () => {
  const { isGuestSession, timeRemaining, cleanupGuestSession } = useGuestAuth();
  const [displayTime, setDisplayTime] = useState("10:00");
  const [remainingSeconds, setRemainingSeconds] = useState(600);
  const { isSignedIn, isLoaded } = useUser();
  
  // Cleanup helper function
  const endGuestSession = useCallback(() => {
    if (isLoaded && isSignedIn && isGuestSession) {
      cleanupGuestSession();
    }
  }, [isLoaded, isSignedIn, isGuestSession, cleanupGuestSession]);
  
  // End guest session if user signs in
  useEffect(() => {
    endGuestSession();
  }, [endGuestSession]);
  
  useEffect(() => {
    if (!isGuestSession) return;
    
    // Initialize with the current time remaining
    setRemainingSeconds(timeRemaining);
    
    // Format time as MM:SS
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    setDisplayTime(formatTime(timeRemaining));
    
    // Update timer every second
    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        const newValue = Math.max(0, prev - 1);
        setDisplayTime(formatTime(newValue));
        
        // If timer reaches zero, reload page to enforce logout
        if (newValue <= 0) {
          window.location.href = "/home";
        }
        
        return newValue;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isGuestSession, timeRemaining]);
  
  // Don't show banner if user is signed in or no guest session
  if (!isGuestSession || (isLoaded && isSignedIn)) return null;
  
  return (
    <div className="bg-amber-500 py-2 px-4 text-black flex items-center justify-between" role="alert" aria-live="polite">
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
        <p className="text-sm font-medium">
          Guest Session: <span className="font-bold">{displayTime}</span> remaining
        </p>
      </div>
      <GuestSignIn />
    </div>
  );
}; 