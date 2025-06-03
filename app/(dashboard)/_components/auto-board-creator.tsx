"use client";

import { useEffect, useState } from "react";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";

export const AutoBoardCreator = () => {
  const { organization, isLoaded } = useOrganization();
  const [hasChecked, setHasChecked] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  
  const { mutate: createBoard } = useApiMutation(api.board.create);
  const { mutate: getBoards } = useApiMutation(api.baords.get);
  
  useEffect(() => {
    const checkAndCreateBoard = async () => {
      if (!isLoaded || !organization || hasChecked || isCreating) return;
      
      try {
        setIsCreating(true);
        
        // Check if user already has boards
        const boards = await getBoards({ 
          orgId: organization.id 
        });
        
        // If user has no boards, create a default one
        if (!boards || boards.length === 0) {
          const boardId = await createBoard({
            orgId: organization.id,
            title: "Welcome Board"
          });
          
          if (boardId) {
            toast.success("Welcome board created!");
            router.push(`/board/${boardId}`);
          }
        }
        
        setHasChecked(true);
      } catch (error) {
        console.error("Failed to check/create board:", error);
      } finally {
        setIsCreating(false);
      }
    };
    
    checkAndCreateBoard();
  }, [organization, isLoaded, hasChecked, isCreating, createBoard, getBoards, router]);
  
  if (isCreating) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader size="lg" />
        <p className="text-muted-foreground mt-4">Setting up your first board...</p>
      </div>
    );
  }
  
  return null;
}; 