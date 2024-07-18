"use client";

import { useEffect, useState } from "react";
import { RenameModal } from "@/components/modals/rename-modal";

export const ModalProvider = () => {
  const [isMunted, setIsMunted] = useState(false);

  useEffect(() => {
    setIsMunted(true);
  }, []);

  if (!isMunted) return null;

  return (
    <>
      <RenameModal />
    </>
  );
};
