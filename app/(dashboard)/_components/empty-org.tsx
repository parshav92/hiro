import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

export const EmptyOrg = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/elements.svg" alt="empty" height={200} width={200} />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Hiro</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Create Organization</Button>
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
      </div>
    </div>
  );
};
