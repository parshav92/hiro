import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/convex/server";
import { api } from "@/convex/_generated/api";

export async function POST() {
  try {
    const guestToken = Math.random().toString(36).substring(2);
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    
    // Create a temporary guest user ID
    const guestId = `guest-${guestToken}`;
    const guestName = `Guest User`;
    
    // Set guest session cookies
    cookies().set("guestToken", guestToken, {
      httpOnly: false, // Allow JS access for client-side
      secure: process.env.NODE_ENV === "production",
      maxAge: 600, // 10 minutes
      path: "/",
      sameSite: "lax", // Changed to lax for better compatibility
    });

    cookies().set("guestExpiresAt", expiresAt.toString(), {
      httpOnly: false, // Allow JS access for client-side
      secure: process.env.NODE_ENV === "production",
      maxAge: 600,
      path: "/",
      sameSite: "lax",
    });
    
    cookies().set("guestId", guestId, {
      httpOnly: false, // Allow JS access for client-side
      secure: process.env.NODE_ENV === "production",
      maxAge: 600,
      path: "/",
      sameSite: "lax",
    });
    
    cookies().set("guestName", guestName, {
      httpOnly: false, // Allow JS access for client-side
      secure: process.env.NODE_ENV === "production",
      maxAge: 600,
      path: "/",
      sameSite: "lax",
    });

    // Create a temporary organization for the guest
    const convex = createClient();
    const guestOrgId = `guest-org-${guestToken}`;
    
    cookies().set("guestOrgId", guestOrgId, {
      httpOnly: false, // Allow JS access for client-side
      secure: process.env.NODE_ENV === "production",
      maxAge: 600,
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({ 
      success: true, 
      guestToken, 
      guestId,
      guestOrgId,
      expiresAt 
    });
  } catch (error) {
    console.error("Guest Login Error:", error);
    return NextResponse.json({ error: "Guest login failed" }, { status: 500 });
  }
}
