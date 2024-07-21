"use client";
import { LucideIcon } from "lucide-react";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        variant={isActive ? "boardActive" : "board"}
        className="text-base font-normal px-2"
        onClick={onClick}
        disabled={isDisabled}
        size="icon"
      >
        <Icon
          className={`text-neutral-500 ${
            isActive ? "text-primary" : "text-neutral-500"
          }`}
        />
      </Button>
    </Hint>
  );
};