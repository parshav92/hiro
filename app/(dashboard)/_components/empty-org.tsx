import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export const EmptyOrg = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/elements.svg" alt="empty" height={200} width={200} />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Hiro</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create Organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none maz-w-[480px]">
            <CreateOrganization routing="hash" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
