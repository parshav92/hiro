import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/convex/server";
import { api } from "@/convex/_generated/api";

export async function POST(req: Request) {
  try {
    // Check if we have guest cookies
    const guestToken = cookies().get("guestToken")?.value;
    const guestExpiresAt = cookies().get("guestExpiresAt")?.value;
    const guestId = cookies().get("guestId")?.value;
    
    // Verify guest session is valid
    if (!guestToken || !guestExpiresAt || !guestId || Date.now() >= Number(guestExpiresAt)) {
      return NextResponse.json({ error: "Guest session expired or invalid" }, { status: 401 });
    }
    
    // Get request body
    const body = await req.json();
    const { title, guestOrgId } = body;
    
    if (!title || !guestOrgId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Create a new board using Convex
    const convex = createClient();
    const boardId = await convex.mutation(api.board.create, { 
      title: title || "Untitled Guest Board",
      orgId: guestOrgId 
    });
    
    return NextResponse.json({ success: true, boardId });
  } catch (error) {
    console.error("Guest board creation error:", error);
    return NextResponse.json({ error: "Failed to create guest board" }, { status: 500 });
  }
} 