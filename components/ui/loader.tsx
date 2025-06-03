import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

const sizeMap = {
  default: "h-6 w-6",
  sm: "h-4 w-4",
  lg: "h-8 w-8",
  icon: "h-10 w-10",
};

export const Loader = ({ className, size = "default" }: LoaderProps) => {
  return (
    <Loader2
      className={cn(
        "animate-spin text-muted-foreground",
        sizeMap[size],
        className
      )}
    />
  );
}; 