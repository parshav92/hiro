// Maximum number of boards a guest user can create
export const GUEST_MAX_BOARDS = 5;

// Default guest organization ID prefix
export const GUEST_ORG_PREFIX = "guest-org";

// Get the guest organization ID (common format across the app)
export const getGuestOrgId = (token: string): string => {
  return `${GUEST_ORG_PREFIX}-${token}`;
};

// Security measures for guest board access
export const isValidGuestBoardAccess = (
  userId: string | null | undefined,
  orgId: string | null | undefined,
  boardOrgId: string | null | undefined
): boolean => {
  // Guest users can only access their own boards
  if (!userId || !orgId || !boardOrgId) return false;
  
  const isGuestUser = userId.startsWith('guest-');
  const isGuestOrg = orgId.startsWith(GUEST_ORG_PREFIX);
  
  // If it's a guest user, they should only access their own org's boards
  if (isGuestUser && isGuestOrg) {
    return orgId === boardOrgId;
  }
  
  // Non-guest users can't access guest boards
  if (!isGuestUser && boardOrgId.startsWith(GUEST_ORG_PREFIX)) {
    return false;
  }
  
  // Regular access patterns continue
  return true;
}; 