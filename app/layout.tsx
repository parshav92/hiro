import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "../providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";
import { Suspense } from "react";
import { Loading } from "@/components/auth/loading";
import { GuestBanner } from "@/components/guest-banner";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hiro",
  description: "A collaborative whiteboard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmsans.className} antialiased bg-[#EAEEFE]`}>
        <Suspense fallback={<Loading />}>
        <ConvexClientProvider>
          <Toaster />
          <ModalProvider />
          <GuestBanner />
          {children}
        </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
