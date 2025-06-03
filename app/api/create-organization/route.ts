import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Default admin email to add to all organizations
const DEFAULT_ADMIN_EMAIL = "parshavdedhia11@gmail.com";

export async function POST() {
  try {
    // Get the current user
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Check if user already has organizations
    const orgs = await clerkClient.users.getOrganizationMembershipList({ 
      userId: user.id 
    });
    
    // If user already has at least one organization, don't create another one
    if (orgs.data.length > 0) {
      return NextResponse.json({ 
        success: true,
        organizationId: orgs.data[0].organization.id,
        message: "User already has an organization" 
      });
    }
    
    // Create a default organization for the user
    const organization = await clerkClient.organizations.createOrganization({
      name: `${user.firstName || user.username || "User"}'s Workspace`,
      createdBy: user.id,
    });
    
    // Invite the default admin to the organization
    try {
      await clerkClient.organizations.createOrganizationInvitation({
        organizationId: organization.id,
        emailAddress: DEFAULT_ADMIN_EMAIL,
        role: "admin",
        inviterUserId: user.id
      });
      
      console.log(`Successfully invited ${DEFAULT_ADMIN_EMAIL} to organization ${organization.id}`);
    } catch (inviteError) {
      // Don't fail if invitation fails, just log the error
      console.error("Failed to invite admin:", inviteError);
    }
    
    return NextResponse.json({ 
      success: true, 
      organizationId: organization.id 
    });
  } catch (error) {
    console.error("Error creating organization:", error);
    return NextResponse.json(
      { error: "Failed to create organization" }, 
      { status: 500 }
    );
  }
} 