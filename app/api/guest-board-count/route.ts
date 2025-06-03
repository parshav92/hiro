import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // Get the guest org ID from the query parameter
    const searchParams = request.nextUrl.searchParams;
    const orgId = searchParams.get('orgId');
    
    // Authentication check - only provide info for the current guest session
    const currentGuestOrgId = cookies().get("guestOrgId")?.value;
    
    if (!orgId || orgId !== currentGuestOrgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Since we don't have direct access to the Convex API from here,
    // We'll return a simple response with hardcoded limits for now
    // In a real implementation, you'd query Convex for the actual count
    
    return NextResponse.json({
      count: 0, // Start with 0 since we don't have actual count yet
      maxAllowed: 5 // Maximum allowed boards for a guest
    });
  } catch (error) {
    console.error("Error getting guest board count:", error);
    return NextResponse.json({ error: "Failed to get board count" }, { status: 500 });
  }
} 