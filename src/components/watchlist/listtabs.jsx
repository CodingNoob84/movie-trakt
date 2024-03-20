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
import { getWatchListByUserId } from "@/services/serveractions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { WatchCard, WatchCardLoader } from "../common/watchcard";

function getMovieTvData(data, mediaType) {
  return data.filter((item) => item.mediaType === mediaType);
}

export const ListTabs = () => {
  const { data: session } = useSession();
  const [tab, setTab] = useState("movie");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["watchlist", { userId: session.user.id }],
    queryFn: () => getWatchListByUserId(session.user.id),
  });
  if (!isLoading) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row h-[40px] w-full">
        <div
          className={`w-full text-center cursor-pointer ${
            tab === "movie" && "border-b-4 border-red-600"
          }`}
          onClick={() => {
            setTab("movie");
          }}
        >
          Movies
        </div>
        <div
          className={`w-full text-center cursor-pointer ${
            tab === "tv" && "border-b-4 border-red-600"
          }`}
          onClick={() => {
            setTab("tv");
          }}
        >
          TV Shows / TV Series
        </div>
      </div>
      <div className="w-full p-2">
        {tab === "movie" ? (
          <div className="flex flex-col gap-4">
            {isLoading
              ? Array.from({ length: 5 }, (_, i) => <WatchCardLoader key={i} />)
              : getMovieTvData(data, "movie").map((item, i) => (
                  <WatchCard key={i} data={item} refetch={refetch} />
                ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {isLoading
              ? Array.from({ length: 5 }, (_, i) => <WatchCardLoader key={i} />)
              : getMovieTvData(data, "tv").map((item, i) => (
                  <WatchCard key={i} data={item} refetch={refetch} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};
