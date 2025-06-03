import { ConvexHttpClient } from "convex/browser";

export const createClient = () => {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
  return new ConvexHttpClient(convexUrl);
}; 