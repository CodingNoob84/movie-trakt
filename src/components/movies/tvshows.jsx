"use client";
import { getIdsForSearch } from "@/lib/utils";
import { getWatchStatus } from "@/services/serveractions";
import { getTrendingTvshows } from "@/services/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { MovieCard } from "../common/moviecard";

export const TvShows = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["trendingtvshows"],
    queryFn: () => getTrendingTvshows(),
  });

  const ids = data ? getIdsForSearch(data) : [];
  console.log(data);
  const {
    data: watchdata,
    isLoading: isWatchStatusLoading,
    refetch,
  } = useQuery({
    queryKey: ["trendingtvshows", { userId: session?.user?.id, tmdbIds: ids }],
    queryFn: () =>
      getWatchStatus({
        userId: session?.user?.id,
        tmdbIds: ids,
      }),
    enabled: !!session?.user?.id && ids.length > 0,
  });
  console.log(data);
  console.log(watchdata);
  return (
    <div className="flex flex-row flex-wrap justify-evenly gap-4">
      {data?.results.map((movie, i) => {
        const matchingWatchData = watchdata?.find(
          (watchItem) => watchItem.tmdbId === movie.id
        );
        return (
          <MovieCard
            key={i}
            data={movie}
            watchStatus={matchingWatchData ? matchingWatchData.watchStatus : ""}
            refetch={refetch}
          />
        );
      })}
    </div>
  );
};
