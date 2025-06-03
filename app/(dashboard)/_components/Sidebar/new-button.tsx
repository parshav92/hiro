"use client";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Hint } from "@/components/hint";
import { useState } from "react";

export const NewButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint
            label="Create organization"
            side="right"
            align="center"
            sideOffset={18}
          >
            <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white border rounded-lg overflow-hidden max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>Create a new organization to collaborate with others</DialogDescription>
        </DialogHeader>
        <div className="bg-white">
          <CreateOrganization routing="hash" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
