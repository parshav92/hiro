"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import { Loading } from "@/components/auth/loading";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
  const pathname = usePathname();
  const [isGuestUser, setIsGuestUser] = useState(false);
  
  useEffect(() => {
    // Check if guest session cookies exist
    const guestToken = Cookies.get("guestToken");
    const guestExpiresAt = Cookies.get("guestExpiresAt");
    const guestId = Cookies.get("guestId");
    
    // If all guest cookies exist and haven't expired, treat as guest user
    if (guestToken && guestExpiresAt && guestId && Date.now() < Number(guestExpiresAt)) {
      setIsGuestUser(true);
    } else {
      setIsGuestUser(false);
    }
  }, [pathname]);
  
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {pathname === "/home" || isGuestUser ? (
          children 
        ) : (
          <Authenticated>
            {children} 
          </Authenticated>
        )}
        {pathname === "/" && !isGuestUser &&
        <AuthLoading>
          <Loading />
        </AuthLoading>
        }
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
