import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Guest configuration constants
const GUEST_ORG_PREFIX = "guest-org";
const GUEST_MAX_BOARDS = 5;

// Function to get the current guest context
export const getGuestContext = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // Check if this is a guest session
    if (identity?.tokenIdentifier.startsWith("guest:")) {
      return {
        isGuest: true,
        guestId: identity.subject,
        guestName: identity.name || "Guest User",
      };
    }
    
    return { isGuest: false };
  },
});

// Function to count guest's boards
export const countGuestBoards = query({
  args: {
    guestOrgId: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify this is a guest org ID
    if (!args.guestOrgId.startsWith(GUEST_ORG_PREFIX)) {
      return { count: 0, maxAllowed: GUEST_MAX_BOARDS };
    }
    
    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.guestOrgId))
      .collect();
    
    return { 
      count: boards.length,
      maxAllowed: GUEST_MAX_BOARDS
    };
  },
});

// Function to delete all boards for an expired guest session
export const deleteGuestBoards = mutation({
  args: {
    guestOrgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // Security check - only allow deleting guest boards
    if (!args.guestOrgId.startsWith(GUEST_ORG_PREFIX)) {
      throw new Error("Cannot delete non-guest organization boards");
    }
    
    // Find all boards for this guest org
    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.guestOrgId))
      .collect();
    
    // Delete each board
    for (const board of boards) {
      await ctx.db.delete(board._id);
    }
    
    return { 
      success: true,
      deletedCount: boards.length
    };
  },
});

// Function to create a board as a guest
export const createBoardAsGuest = mutation({
  args: {
    title: v.string(),
    guestOrgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // Check if this is a guest session
    if (!identity || !identity.tokenIdentifier.startsWith("guest:")) {
      throw new Error("Guest authentication required");
    }
    
    const randomImage = [
      "/placeholders/1.svg",
      "/placeholders/2.svg",
      "/placeholders/3.svg",
      "/placeholders/4.svg",
      "/placeholders/5.svg",
    ][Math.floor(Math.random() * 5)];
    
    // Create a temporary board for the guest
    const board = await ctx.db.insert("boards", {
      orgId: args.guestOrgId,
      title: args.title,
      authorId: identity.subject,
      authorName: identity.name || "Guest User",
      imageUrl: randomImage,
    });
    
    return board;
  },
}); 