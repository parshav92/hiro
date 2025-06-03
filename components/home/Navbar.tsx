"use client"
import Image from 'next/image';
import { ShimmerButton } from '../ui/shimmer-button';
import MenuIcon from '../assets/icons/menu.svg';
import { SignInButton } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/guest-login", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        
        // Ensure cookies are set on client-side as well
        // This is a backup in case HttpOnly: false doesn't work
        Cookies.set("guestToken", data.guestToken, { expires: 1/144 }); // 10 minutes
        Cookies.set("guestExpiresAt", data.expiresAt.toString(), { expires: 1/144 });
        Cookies.set("guestId", data.guestId, { expires: 1/144 });
        Cookies.set("guestOrgId", data.guestOrgId, { expires: 1/144 });
        
        // Wait a moment to ensure cookies are set
        setTimeout(() => {
          // Reload the whole page to get a fresh state with the cookies
          window.location.href = "/";
        }, 100);
      }
    } catch (error) {
      console.error("Guest login failed", error);
      setLoading(false);
    }
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
          <div className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
            <MenuIcon className="text-white" />
          </div>
          <nav className="text-white sm:flex gap-6 items-center hidden">
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
            <ShimmerButton 
              className="shadow-xl"
              onClick={handleGuestLogin}
              disabled={loading}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base">
                {loading ? "Starting..." : "Try Guest Mode (10min)"}
              </span>
            </ShimmerButton>
            <SignInButton mode="modal">
              <button className="bg-white py-2 px-4 rounded-lg text-black">
                Sign In
              </button>
            </SignInButton>
          </nav>
        </div>
      </div>
    </div>
  );
};
