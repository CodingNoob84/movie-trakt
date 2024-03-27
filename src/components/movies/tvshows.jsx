"use client";
import { getIds, getIdsForSearch } from "@/lib/utils";
import { getTrendingDB, getWatchStatus } from "@/services/serveractions";
import { getTrendingTvshows } from "@/services/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { MovieCard, MovieCardLoader } from "../common/moviecard";

export const TvShows = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["trendingtvshows"],
    queryFn: () => getTrendingDB("tv"),
  });

  const ids = data ? getIds(data) : [];
  //console.log(data);
  const {
    data: watchdata,
    isLoading: isWatchStatusLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "trendingtvshowswatchstatus",
      { userId: session?.user?.id, tmdbIds: ids },
    ],
    queryFn: () =>
      getWatchStatus({
        userId: session?.user?.id,
        tmdbIds: ids,
      }),
    enabled: !!session?.user?.id && ids.length > 0,
  });
  if (isLoading) {
    return (
      <div className="flex flex-row flex-wrap justify-evenly gap-4">
        {Array.from({ length: 5 }, (_, i) => (
          <MovieCardLoader key={i} />
        ))}
      </div>
    );
  }
  //console.log(data);
  //console.log(watchdata);
  return (
    <div className="flex flex-row flex-wrap justify-evenly gap-4">
      {data?.map((movie, i) => {
        const matchingWatchData = watchdata?.find(
          (watchItem) => watchItem.tmdbId === movie.tmdbId
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
