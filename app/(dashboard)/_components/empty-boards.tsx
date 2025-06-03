"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Simple inline loader
const Loader = () => (
  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
);

export function EmptyBoards() {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);
  const [autoCreationAttempted, setAutoCreationAttempted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Auto-create board on first render
  useEffect(() => {
    if (!organization || autoCreationAttempted || isCreating) return;

    const createFirstBoard = async () => {
      setIsCreating(true);
      try {
        const id = await mutate({
          orgId: organization.id,
          title: "My First Board",
        });
        
        if (id) {
          toast.success("Your first board has been created!");
          router.push(`/board/${id}`);
        }
      } catch (error) {
        console.error("Failed to auto-create board:", error);
        setAutoCreationAttempted(true);
      } finally {
        setIsCreating(false);
      }
    };

    createFirstBoard();
  }, [organization, autoCreationAttempted, isCreating, mutate, router]);

  const onClick = async () => {
    if (!organization) return;
    
    setIsCreating(true);
    try {
      const id = await mutate({
        orgId: organization.id,
        title: "Untitled board",
      });
      
      if (id) {
        toast.success("Board created successfully");
        router.push(`/board/${id}`);
      }
    } catch (error) {
      toast.error("Failed to create board");
    } finally {
      setIsCreating(false);
    }
  };

  if (isCreating) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader />
        <h2 className="text-xl font-medium mt-6">Creating your first board...</h2>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" alt="Empty" height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create your first board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button onClick={onClick} size="lg" disabled={pending || isCreating}>
          Create board
        </Button>
      </div>
    </div>
  );
}
