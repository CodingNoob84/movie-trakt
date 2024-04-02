"use client";
import { getIds, getIdsForSearch } from "@/lib/utils";
import {
  getTotalWatchForUserId,
  getWatchStatus,
} from "@/services/serveractions";
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

  const ids = data ? getIds(data) : [];
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
  const { data: watchcountdata } = useQuery({
    queryKey: [
      "recommendationwatchcount",
      { userId: session?.user?.id, tmdbIds: ids },
    ],
    queryFn: () =>
      getTotalWatchForUserId({
        tmdbIds: ids,
        userId: session?.user?.id,
      }),
    enabled: !!session?.user?.id && ids.length > 0,
  });
  //console.log(data);
  //console.log(watchdata);
  return (
    <>
      <MoviesRow
        title={"Similar Movies"}
        data={data}
        watchdata={watchdata}
        refetch={refetch}
        isLoading={isLoading}
        watchCount={watchcountdata}
      />
    </>
  );
};
