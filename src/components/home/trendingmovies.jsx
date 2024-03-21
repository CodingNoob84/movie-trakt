"use client";
import { getIdsForSearch } from "@/lib/utils";
import { getWatchStatus } from "@/services/serveractions";
import { getTrendingMovies } from "@/services/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { MoviesRow } from "./moviesrow";

export const TrendingMovies = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["trendingmovies"],
    queryFn: () => getTrendingMovies(),
  });

  const ids = data ? getIdsForSearch(data) : [];
  console.log(data);
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
  console.log(data);
  console.log(watchdata);
  return (
    <>
      <MoviesRow title={"Trending Movies"} data={data} />
    </>
  );
};
