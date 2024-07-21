import { Loader } from "lucide-react";
import { Info } from "./info";

export const Loading = () => {
  return (
    <main className="h-full w-full relative relaative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foregroundanimate-spin" />
      <Info.Skeleton />
    </main>
  );
};
