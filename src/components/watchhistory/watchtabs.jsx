"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RatingIcon } from "@/lib/icons";
import { getWatchHistoryByUserId } from "@/services/serveractions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { WatchCard, WatchCardLoader } from "../common/watchcard";

export const WatchTabs = () => {
  const { data: session } = useSession();
  const [tab, setTab] = useState("watching");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["watchhistory", { userId: session.user.id }],
    queryFn: () => getWatchHistoryByUserId(session.user.id),
  });
  if (!isLoading) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-4 w-full px-4">
      <div className="flex flex-row h-[40px] w-full">
        <div
          className={`w-full text-center cursor-pointer ${
            tab === "watching" && "border-b-4 border-red-600"
          }`}
          onClick={() => {
            setTab("watching");
          }}
        >
          Watching
        </div>
        <div
          className={`w-full text-center cursor-pointer ${
            tab === "watched" && "border-b-4 border-red-600"
          }`}
          onClick={() => {
            setTab("watched");
          }}
        >
          Watched
        </div>
      </div>
      <div className="w-full p-2">
        {tab === "watching" ? (
          <div className="flex flex-col gap-4">
            {isLoading
              ? Array.from({ length: 5 }, (_, i) => <WatchCardLoader key={i} />)
              : data?.watching?.map((item, i) => (
                  <WatchCard key={i} data={item} refetch={refetch} />
                ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {isLoading
              ? Array.from({ length: 5 }, (_, i) => <WatchCardLoader key={i} />)
              : data?.watched?.map((item, i) => (
                  <WatchCard key={i} data={item} refetch={refetch} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};
