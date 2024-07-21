"use client";
import { User } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { useOthers, useSelf } from "@/liveblocks.config";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 1;

export const Participants = () => {
  const users = useOthers();
  const self = useSelf();
  const hasMore = users.length > MAX_SHOWN_USERS;
  return (
    <div className="absolute right-2 top-2 h-12 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-y-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(self.connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          );
        })}

        {self && (
          <UserAvatar
            borderColor={connectionIdToColor(self.connectionId)}
            src={self.info?.picture}
            name={`${self.info?.name} (You)`}
            fallback={self.info?.name?.[0]}
          />
        )}

        {hasMore && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};
