"use client";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getWatchHistoryByUserId } from "@/services/serveractions";
import {
  WatchBigCard,
  WatchBigCardLoader,
  WatchSmallCard,
  WatchSmallCardLoader,
} from "../common/watchcard";
import useViewStore from "@/store/viewstore";

export const WatchTabs = () => {
  const { data: session } = useSession();
  const [tab, setTab] = useState("watching");
  // Using a hypothetical useContext hook to retrieve the current view state
  const { view } = useViewStore(); // Assume this context provides the current view ("small" or "big")

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["watchhistory", { userId: session.user.id }],
    queryFn: () => getWatchHistoryByUserId(session.user.id),
  });

  const renderWatchCards = (items) => {
    return items.map((item, i) =>
      view === "small" ? (
        <WatchSmallCard key={i} data={item} refetch={refetch} />
      ) : (
        <WatchBigCard key={i} data={item} refetch={refetch} />
      )
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row h-[40px] w-full">
        {["watching", "watched"].map((type) => (
          <div
            key={type}
            className={`w-full text-center cursor-pointer ${
              tab === type && "border-b-4 border-red-600"
            }`}
            onClick={() => setTab(type)}
          >
            {type === "watching" ? "Watching" : "Watched"}
          </div>
        ))}
      </div>
      <div className="w-full">
        {isLoading ? (
          <div className="flex flex-row justify-evenly gap-4 flex-wrap">
            {Array.from({ length: 5 }, (_, i) =>
              view === "small" ? (
                <WatchSmallCardLoader key={i} />
              ) : (
                <WatchBigCardLoader key={i} />
              )
            )}
          </div>
        ) : tab === "watching" ? (
          <div className="flex flex-row justify-evenly gap-4 flex-wrap">
            {renderWatchCards(data?.watching || [])}
          </div>
        ) : (
          <div className="flex flex-row justify-evenly gap-4 flex-wrap">
            {renderWatchCards(data?.watched || [])}
          </div>
        )}
      </div>
    </div>
  );
};
