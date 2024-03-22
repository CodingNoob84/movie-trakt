"use client";
import { getIdsForSearch } from "@/lib/utils";
import { getWatchStatus } from "@/services/serveractions";
import { getMovieRecommendations } from "@/services/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { MoviesRow } from "../home/moviesrow";

export const Recommendations = ({ tmdbId }) => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["recommendations", { tmdbId: tmdbId }],
    queryFn: () => getMovieRecommendations(tmdbId),
  });

  const ids = data ? getIdsForSearch(data) : [];
  //console.log(data);
  const {
    data: watchdata,
    isLoading: isWatchStatusLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "recommendationswatch",
      { userId: session?.user?.id, tmdbIds: ids },
    ],
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
      <MoviesRow
        title={"Similar Movies"}
        data={data}
        watchdata={watchdata}
        refetch={refetch}
        isLoading={isLoading}
      />
    </>
  );
};
