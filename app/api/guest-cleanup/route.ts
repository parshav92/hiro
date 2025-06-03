import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Check if this is a valid guest session
    const guestToken = cookies().get("guestToken")?.value;
    const guestExpiresAt = cookies().get("guestExpiresAt")?.value;
    const guestId = cookies().get("guestId")?.value;
    const guestOrgId = cookies().get("guestOrgId")?.value;
    
    // If any of the cookies are missing, there's nothing to clean up
    if (!guestToken && !guestExpiresAt && !guestId && !guestOrgId) {
      return NextResponse.json({ message: "No guest session to clean up" }, { status: 200 });
    }
    
    // Clear all guest cookies, regardless of expiration
    cookies().delete("guestToken");
    cookies().delete("guestExpiresAt");
    cookies().delete("guestId");
    cookies().delete("guestName");
    cookies().delete("guestOrgId");
    
    return NextResponse.json({ success: true, message: "Guest session cleaned up" });
  } catch (error) {
    console.error("Guest cleanup error:", error);
    return NextResponse.json({ error: "Failed to clean up guest session" }, { status: 500 });
  }
} 