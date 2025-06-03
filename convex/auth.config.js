import { getGuestInfo } from "./_generated/authorize";

export default {
  providers: [
    {
      domain: "https://comic-wasp-22.clerk.accounts.dev",
      applicationID: "convex",
    }
  ],
  
  // Custom function to handle guest authentication
  getToken: async (request) => {
    // Check for guest user headers
    const guestInfo = getGuestInfo(request.headers);
    
    if (guestInfo) {
      // Create a custom token for guest users
      return {
        sub: guestInfo.subject,
        iss: "guest",
        token_identifier: guestInfo.tokenIdentifier,
        name: guestInfo.name
      };
    }
    
    // Fall back to regular clerk authentication
    return null;
  }
};
