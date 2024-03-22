"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { SearchCard, SearchCardLoader } from "../common/searchcard";
import { getIdsForSearch } from "@/lib/utils";
import { getWatchStatus } from "@/services/serveractions";
import { searchwithQuery } from "@/services/tmdb";
import { MovieCard, MovieCardLoader } from "../common/moviecard";

export const SearchContainer = ({ searchquery }) => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["search", { searchquery }],
    queryFn: () => searchwithQuery(searchquery),
    enabled: searchquery !== "",
  });
  console.log(data);
  const ids = data ? getIdsForSearch(data) : [];
  console.log(data);
  // Ensure the second query is enabled only if `ids` array is not empty and session is available
  const {
    data: watchdata,
    isLoading: isWatchStatusLoading,
    refetch,
  } = useQuery({
    queryKey: ["searchwatch", { userId: session?.user?.id, tmdbIds: ids }],
    queryFn: () =>
      getWatchStatus({
        userId: session?.user?.id,
        tmdbIds: ids,
      }),
    enabled: !!session?.user?.id && ids.length > 0,
  });

  if (isLoading || !data) {
    return (
      <div className="flex flex-row gap-2 lg:gap-4 flex-wrap justify-around">
        {Array.from({ length: 5 }, (_, i) => (
          <MovieCardLoader key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row text-2xl py-4">
        Search Results for : <span className="italic px-2">{searchquery}</span>
      </div>
      <div className="flex flex-row gap-2 lg:gap-4 flex-wrap justify-around">
        {data?.results
          .filter(
            (searchitem) =>
              searchitem.media_type === "movie" ||
              searchitem.media_type === "tv"
          ) // Filter items to only include movies or TV shows
          .map((searchitem, i) => {
            const matchingWatchData = watchdata?.find(
              (watchItem) => watchItem.tmdbId === searchitem.id
            );
            return (
              <MovieCard
                key={i}
                data={searchitem}
                watchStatus={
                  matchingWatchData ? matchingWatchData.watchStatus : ""
                }
                refetch={refetch}
              />
            );
          })}
      </div>
    </div>
  );
};
