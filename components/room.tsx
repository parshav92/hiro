"use client";

import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";
import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/liveblocks.config";
import { Layer } from "@/types/canvas";

export const Room = ({
  children,
  roomId,
  fallback,
}: {
  children: React.ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode>;
}) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor: null,
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList<string>([]),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
