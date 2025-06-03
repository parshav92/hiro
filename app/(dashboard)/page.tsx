"use client";
import { BoardList } from "./_components/board-list";
import { EmptyOrg } from "./_components/empty-org";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Simple inline loader component
const Loader = () => (
  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
);

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization, isLoaded: isOrgLoaded } = useOrganization();
  const { isSignedIn, isLoaded: isUserLoaded } = useUser();
  const [isCreatingOrg, setIsCreatingOrg] = useState(false);

  // Auto-create organization if user doesn't have one
  useEffect(() => {
    const createDefaultOrg = async () => {
      if (isUserLoaded && isOrgLoaded && isSignedIn && !organization && !isCreatingOrg) {
        try {
          setIsCreatingOrg(true);
          const response = await fetch("/api/create-organization", {
            method: "POST",
          });
          
          if (!response.ok) {
            throw new Error("Failed to create organization");
          }
          
          // Reload the page to pick up the new organization
          window.location.reload();
        } catch (error) {
          console.error("Failed to create default organization:", error);
          toast.error("Failed to create organization. Please try again.");
        } finally {
          setIsCreatingOrg(false);
        }
      }
    };

    createDefaultOrg();
  }, [isUserLoaded, isOrgLoaded, isSignedIn, organization, isCreatingOrg]);

  // Loading state for organization creation
  if (isCreatingOrg) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader />
        <h2 className="text-xl mt-6">Setting up your workspace...</h2>
      </div>
    );
  }

  return (
    <div className="flex-1 h-[calc(100%-85px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default DashboardPage;
