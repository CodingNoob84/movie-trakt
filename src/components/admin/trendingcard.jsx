"use client";

import {
  getCountAndLastUpdatedTime,
  getTrendingToDb,
} from "@/services/serveractions";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Button } from "../ui/button";

export const TrendingUpdateCard = ({ type }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["trendingmovies"],
    queryFn: () => getCountAndLastUpdatedTime(type),
  });
  console.log(data);
  const handleTrendingMovies = async () => {
    const result = await getTrendingToDb(type);
    console.log(result);
    refetch();
  };
  return (
    <div className="flex flex-row border rounded-md p-5 justify-center items-center border-red-600 gap-5">
      <div>
        last updated at{" "}
        {!isLoading && format(data?.lastUpdated, "EEE, d MMM p")}{" "}
      </div>
      <Button onClick={() => handleTrendingMovies()}>
        Trending {type === "movie" ? "Movies" : "TvSeries"}
      </Button>
    </div>
  );
};
