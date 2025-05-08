import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const guestToken = Math.random().toString(36).substring(2);
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Set guest session cookies
    cookies().set("guestToken", guestToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 600, // 10 minutes
      path: "/",
      sameSite: "strict",
    });

    cookies().set("guestExpiresAt", expiresAt.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 600,
      path: "/",
      sameSite: "strict",
    });

    return NextResponse.json({ success: true, guestToken, expiresAt });
  } catch (error) {
    console.error("Guest Login Error:", error);
    return NextResponse.json({ error: "Guest login failed" }, { status: 500 });
  }
}
