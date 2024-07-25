"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";
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
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList([]),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
