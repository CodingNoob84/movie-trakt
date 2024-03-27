"use client";
import { getTvDetailfromTmdb } from "@/services/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { TvDetailCard } from "../common/tvdetailcard";

export const TvDetail = ({ tmdbId }) => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["tvdetail", { tmdbId: tmdbId }],
    queryFn: () => getTvDetailfromTmdb(tmdbId),
  });
  console.log(data);
  return (
    <div className="flex flex-col w-full">
      <TvDetailCard data={data} />
    </div>
  );
};
