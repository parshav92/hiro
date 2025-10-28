"use client"
import Image from 'next/image';
import { SignInButton } from '@clerk/nextjs';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import SignInButton to avoid hydration issues
const DynamicSignInButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignInButton),
  { 
    ssr: false,
    loading: () => (
      <button className="bg-white py-2 px-4 rounded-lg text-black">
        Sign In
      </button>
    )
  }
);

export const Navbar = () => {
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/guest-login", { method: "POST" });
      if (res.ok) {
        window.location.href = "/"; // Redirect to app as guest
      }
    } catch (error) {
      console.error("Guest login failed", error);
    }
    setLoading(false);
  };
  return (
    <div className="bg-black">
      <div className="px-4">
        <div className="py-4 flex items-center justify-between">
          <div className="relative">
            <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] blur-md"></div>
            <Image
              src='/logo.svg'
              height={24}
              width={24}
              alt="Saas logo"
              className="relative"
            />
          </div>
          <nav className="text-white sm:flex gap-6 items-center">
            {/* <a
              href="#"
              className="text-opacity-60 text-white hover:opacity-100 transition"
            >
              About
            </a>
            <a
              href="#"
              className="text-opacity-60 text-white hover:opacity-100 transition"
            >
              Features
            </a>
            <a
              href="#"
              className="text-opacity-60 text-white hover:opacity-100 transition"
            >
              Updates
            </a>
            <a
              href="#"
              className="text-opacity-60 text-white hover:opacity-100 transition"
            >
              Help
            </a>
            <a
              href="#"
              className="text-opacity-60 text-white hover:opacity-100 transition"
            >
              Customers
            </a> */}
            <DynamicSignInButton mode="modal">
              <button className="bg-white py-2 px-4 rounded-lg text-black">
                Sign In
              </button>
            </DynamicSignInButton>
            {/* <button onClick={handleGuestLogin} disabled={loading}>
              {loading ? "Starting Guest Session..." : "Continue as Guest"}
            </button> */}
          </nav>
        </div>
      </div>
    </div>
  );
};
