"use client";

import { getWatchStatus } from "@/services/serveractions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getMovieDetailfromTmdb } from "@/services/tmdb";
import { MovieDetailCard } from "../common/moviedetailcard";
import { Recommendations } from "./recommendations";

export const MoviesDetail = ({ tmdbId }) => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["moviedetail", { tmdbId: tmdbId }],
    queryFn: () => getMovieDetailfromTmdb(tmdbId),
  });
  const {
    data: watchdata,
    isLoading: isWatchStatusLoading,
    refetch,
  } = useQuery({
    queryKey: ["moviedetail", { tmdbId: [tmdbId] }],
    queryFn: () =>
      getWatchStatus({
        userId: session?.user?.id,
        tmdbIds: [tmdbId],
      }),
    enabled: !!session?.user?.id,
  });
  console.log(data);
  console.log(watchdata);
  const matchingItem = watchdata?.find((item) => item.tmdbId === tmdbId);
  const watchStatus = matchingItem ? matchingItem.watchStatus : "";
  return (
    <div className="flex flex-col w-full">
      {!isLoading && (
        <MovieDetailCard
          data={data}
          watchStatus={watchStatus}
          refetch={refetch}
        />
      )}
      <Recommendations tmdbId={tmdbId} />
    </div>
  );
};
