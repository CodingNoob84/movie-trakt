"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWatchListByUserId } from "@/services/serveractions";
import {
  WatchBigCard,
  WatchBigCardLoader,
  WatchSmallCard,
  WatchSmallCardLoader,
} from "../common/watchcard";
import useViewStore from "@/store/viewstore";

function getMovieTvData(data, mediaType) {
  return data.filter((item) => item.mediaType === mediaType);
}

const ContentDisplay = ({ isLoading, items, view, refetch }) => (
  <div className="flex flex-row justify-evenly gap-4 flex-wrap">
    {isLoading
      ? Array.from({ length: 5 }, (_, i) =>
          view === "small" ? (
            <WatchSmallCardLoader key={i} />
          ) : (
            <WatchBigCardLoader key={i} />
          )
        )
      : items.map((item, i) =>
          view === "small" ? (
            <WatchSmallCard key={i} data={item} refetch={refetch} />
          ) : (
            <WatchBigCard key={i} data={item} refetch={refetch} />
          )
        )}
  </div>
);

export const ListTabs = () => {
  const { view } = useViewStore();
  const { data: session } = useSession();
  const [tab, setTab] = useState("movie");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["watchlist", { userId: session.user.id }],
    queryFn: () => getWatchListByUserId(session.user.id),
  });
  //console.log(data);
  const filteredData = getMovieTvData(data || [], tab);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row h-[40px] w-full">
        {["movie", "tv"].map((type) => (
          <div
            key={type}
            className={`w-full text-center cursor-pointer ${
              tab === type && "border-b-4 border-red-600"
            }`}
            onClick={() => setTab(type)}
          >
            {type === "movie" ? "Movies" : "TV Shows / TV Series"}
          </div>
        ))}
      </div>
      <ContentDisplay
        isLoading={isLoading}
        items={filteredData}
        view={view}
        refetch={refetch}
      />
    </div>
  );
};
