"use client";
import { getIds, getIdsForSearch } from "@/lib/utils";
import {
  getTotalWatchForUserId,
  getTrendingDB,
  getWatchStatus,
} from "@/services/serveractions";
import { getTrendingMovies } from "@/services/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { MovieCard, MovieCardLoader } from "../common/moviecard";

export const Movies = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["trendingmovies"],
    queryFn: () => getTrendingDB("movie"),
  });

  const ids = data ? getIds(data) : [];
  //console.log(ids);
  const {
    data: watchdata,
    isLoading: isWatchStatusLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "trendingmovieswatchstatus",
      { userId: session?.user?.id, tmdbIds: ids },
    ],
    queryFn: () =>
      getWatchStatus({
        userId: session?.user?.id,
        tmdbIds: ids,
      }),
    enabled: !!session?.user?.id && ids.length > 0,
  });
  const { data: watchcountdata } = useQuery({
    queryKey: [
      "trendingmovieswatchcount",
      { userId: session?.user?.id, tmdbIds: ids },
    ],
    queryFn: () =>
      getTotalWatchForUserId({
        tmdbIds: ids,
        userId: session?.user?.id,
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
            watchCount={
              watchcountdata?.find((item) => item.tmdbId === movie.tmdbId)
                ?.totalCount || 0
            }
            refetch={refetch}
          />
        );
      })}
    </div>
  );
};
