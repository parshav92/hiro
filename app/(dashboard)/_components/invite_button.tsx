import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="flex items-center gap-x-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
        <DialogHeader className="sr-only">
          <DialogTitle>Organization Profile</DialogTitle>
          <DialogDescription>Manage organization members and settings</DialogDescription>
        </DialogHeader>
        <OrganizationProfile routing="hash" />
      </DialogContent>
    </Dialog>
  );
};
