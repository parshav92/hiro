import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/(board)(.*)", "/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = auth();

  if (!userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url)); 
  }

  if (isProtectedRoute(req) && userId) {
    await auth().protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};