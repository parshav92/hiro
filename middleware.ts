import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/(board)(.*)", "/"]); // Define protected routes

export default clerkMiddleware(async (auth, req) => {
  const { userId } = auth();
  const guestToken = cookies().get("guestToken")?.value;
  const guestExpiresAt = cookies().get("guestExpiresAt")?.value;

  // ✅ Allow guest access to protected routes for 10 minutes
  if (!userId && guestToken && guestExpiresAt && Date.now() < Number(guestExpiresAt)) {
    return NextResponse.next();
  }

  // ✅ Redirect non-authenticated users (including guests after 10 mins)
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // ✅ Require authentication for protected routes
  if (isProtectedRoute(req) && userId) {
    await auth().protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
