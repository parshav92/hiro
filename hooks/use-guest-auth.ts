import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUser } from "@clerk/nextjs";

interface GuestAuthState {
  isGuestSession: boolean;
  guestOrgId: string | null;
  timeRemaining: number;
  boardCount: number;
  maxBoards: number;
}

export const useGuestAuth = (): GuestAuthState & {
  createGuestBoard: (title: string) => Promise<string | null>;
  cleanupGuestSession: () => Promise<void>;
} => {
  const [state, setState] = useState<GuestAuthState>({
    isGuestSession: false,
    guestOrgId: null,
    timeRemaining: 0,
    boardCount: 0,
    maxBoards: 5
  });
  
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  
  // Clean up guest session - defined with useCallback to prevent dependency issues
  const cleanupGuestSession = useCallback(async () => {
    try {
      // Call the cleanup API
      await fetch("/api/guest-cleanup", { method: "POST" });
      
      // Clear local cookies as well
      Cookies.remove("guestToken");
      Cookies.remove("guestExpiresAt");
      Cookies.remove("guestId");
      Cookies.remove("guestName");
      Cookies.remove("guestOrgId");
      
      // Reset state
      setState({
        isGuestSession: false,
        guestOrgId: null,
        timeRemaining: 0,
        boardCount: 0,
        maxBoards: 5
      });
    } catch (error) {
      console.error("Failed to clean up guest session", error);
    }
  }, []);
  
  // End guest session if user signs in
  useEffect(() => {
    if (isLoaded && isSignedIn && state.isGuestSession) {
      // If user is signed in and there's an active guest session, clean it up
      cleanupGuestSession();
    }
  }, [isLoaded, isSignedIn, state.isGuestSession, cleanupGuestSession]);
  
  // Load guest state
  useEffect(() => {
    // Don't setup guest session if user is signed in
    if (isLoaded && isSignedIn) return;
    
    // Check if we have guest cookies
    const guestToken = Cookies.get("guestToken");
    const guestExpiresAt = Cookies.get("guestExpiresAt");
    const orgId = Cookies.get("guestOrgId");
    
    if (guestToken && guestExpiresAt && orgId) {
      const expiresAt = Number(guestExpiresAt);
      
      // Check if the guest session is still valid
      if (Date.now() < expiresAt) {
        setState(prev => ({
          ...prev,
          isGuestSession: true,
          guestOrgId: orgId,
          timeRemaining: Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
        }));
        
        // Get board count
        fetch(`/api/guest-board-count?orgId=${orgId}`)
          .then(res => res.json())
          .then(data => {
            setState(prev => ({
              ...prev,
              boardCount: data.count || 0,
              maxBoards: data.maxAllowed || 5
            }));
          })
          .catch(err => {
            console.error("Failed to get board count", err);
          });
        
        // Set a timer to redirect when the session expires
        const timeout = setTimeout(() => {
          cleanupGuestSession();
          router.push("/home");
        }, expiresAt - Date.now());
        
        return () => clearTimeout(timeout);
      } else {
        // Session has expired, clean up
        cleanupGuestSession();
      }
    }
  }, [isLoaded, isSignedIn, router, cleanupGuestSession]);
  
  // Create a new board as guest
  const createGuestBoard = async (title: string) => {
    if (!state.guestOrgId) return null;
    
    try {
      // Check if we've reached the board limit
      if (state.boardCount >= state.maxBoards) {
        throw new Error(`Guest users can create a maximum of ${state.maxBoards} boards. Sign up to create more.`);
      }
      
      // Create a guest board using the API
      const res = await fetch("/api/guest-board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, guestOrgId: state.guestOrgId }),
      });
      
      if (res.ok) {
        const data = await res.json();
        // Update board count
        setState(prev => ({
          ...prev,
          boardCount: prev.boardCount + 1
        }));
        return data.boardId;
      }
    } catch (error) {
      console.error("Failed to create guest board", error);
    }
    
    return null;
  };
  
  return {
    ...state,
    createGuestBoard,
    cleanupGuestSession
  };
}; 