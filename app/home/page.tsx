"use client";

import { useAuth, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full p-4 flex justify-between items-center bg-white shadow">
        <h1 className="text-2xl font-bold">Hiro</h1>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center p-10">
        <h1 className="text-4xl font-bold">Collaborate in Real-Time with Hiro</h1>
        <p className="mt-4 text-lg text-gray-600">
          Create, collaborate, and organize ideas with your team instantly.
        </p>

        {/* Call to Action */}
        <SignInButton mode="redirect">
          <Button className="mt-6 px-6 py-3 text-lg">Get Started</Button>
        </SignInButton>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Hiro. All rights reserved.
      </footer>
    </div>
  );
}
