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
import { MoviesRow } from "./moviesrow";

export const TrendingMovies = () => {
  const { data: session } = useSession();
  //console.log("session", session);
  const { data, isLoading } = useQuery({
    queryKey: ["trendingmovies"],
    queryFn: () => getTrendingDB("movie"),
  });

  const ids = data ? getIds(data) : [];
  //console.log(data);
  const {
    data: watchdata,
    isLoading: isWatchStatusLoading,
    refetch,
  } = useQuery({
    queryKey: ["trendingmovies", { userId: session?.user?.id, tmdbIds: ids }],
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
  //console.log(watchcountdata);
  //console.log("watchdata-trendingmovies", watchdata);
  return (
    <>
      <MoviesRow
        title={"Trending Movies"}
        data={data}
        watchdata={watchdata}
        refetch={refetch}
        isLoading={isLoading}
        watchCount={watchcountdata}
      />
    </>
  );
};
