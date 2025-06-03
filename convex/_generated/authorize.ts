// This file contains custom authorization logic for guest users
import { ConvexError } from "convex/values";

interface AuthHeaders {
  "x-guest-user-id"?: string;
  "x-guest-token"?: string;
}

export function getGuestInfo(headers: AuthHeaders) {
  const guestId = headers["x-guest-user-id"];
  const guestToken = headers["x-guest-token"];
  
  if (guestId && guestToken) {
    return {
      subject: guestId,
      tokenIdentifier: `guest:${guestToken}`,
      name: "Guest User",
    };
  }
  
  return null;
} 