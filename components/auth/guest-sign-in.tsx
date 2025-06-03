"use client";

import { SignInButton } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface GuestSignInProps {
  buttonText?: string;
  buttonClassName?: string;
}

export const GuestSignIn = ({ 
  buttonText = "Sign up to save your work",
  buttonClassName = "bg-white py-1 px-3 rounded text-sm font-medium hover:bg-gray-200 transition"
}: GuestSignInProps) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName} variant="ghost">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to your account</DialogTitle>
          <DialogDescription>
            Sign in to save your work and continue using the app after your guest session expires.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <SignInButton mode="modal">
            <Button className="w-full" onClick={() => setOpen(false)}>
              Sign in with Clerk
            </Button>
          </SignInButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 