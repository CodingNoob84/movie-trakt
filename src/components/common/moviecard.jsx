"use client";
import { RatingIcon } from "@/lib/icons";
import { getTmDBImage, getYear } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  addToWatchList,
  removeFromWatchList,
  updateWatchStatus,
} from "@/services/serveractions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { getGenresString } from "@/data/genres";

export const MovieCard = ({ data, watchStatus, refetch }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: session } = useSession();
  const handleWatchlist = async (watchStatus) => {
    const newData = {
      userId: session.user.id,
      tmdbId: data.id,
      mediaType: data.media_type,
      title: data?.title || data?.name,
      releaseDate: data?.release_date || data?.first_air_date,
      tmdbRating: data?.vote_average,
      watchStatus: watchStatus,
      genres: getGenresString(data.genre_ids.join(","), data.media_type),
      overview: data.overview,
      posterImage: data.poster_path,
      backdropImage: data.backdrop_path,
    };
    //console.log(newData);
    const result = await addToWatchList(newData);
    if (result) {
      refetch();
    }
    //console.log(result);
  };

  const handleRemoveFromWatchList = async () => {
    setIsUpdating(true);
    try {
      await removeFromWatchList({ tmdbId: data.id, userId: session.user.id });
      refetch();
    } catch (error) {
      console.error("Failed to remove from watchlist:", error);
    }
    setIsUpdating(false);
  };

  const getDropdownMenu = () => {
    //console.log(data.watchStatus);
    switch (watchStatus) {
      case "list":
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"sm"}
                className="bg-blue-500 hover:bg-blue-600 w-full"
              >
                In the Watchlist
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white">
              <DropdownMenuItem onClick={() => handleRemoveFromWatchList()}>
                Remove from List
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleWatchStatusChange("watched")}
              >
                Watched
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleWatchStatusChange("watching")}
              >
                Watch Now
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );

      case "watching":
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"sm"}
                className={`bg-green-500 hover:bg-green-600 w-full`}
              >
                Watching Now
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white">
              <DropdownMenuItem
                className="hover:bg-green-600"
                onClick={() => handleWatchStatusChange("list")}
              >
                Watch Later
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-green-600"
                onClick={() => handleWatchStatusChange("watched")}
              >
                Watched
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-green-600">
                Skip / Delete
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-green-600">
                Boring
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      case "watched":
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"sm"}
                className={`bg-red-500 hover:bg-red-600 w-full`}
              >
                Watched
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white">
              <DropdownMenuItem
                className="hover:bg-red-600"
                onClick={() => handleWatchStatusChange("watched")}
              >
                Watch again
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-red-600"
                onClick={() => handleWatchStatusChange("list")}
              >
                Watched to List
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-red-600">
                Delete from Watched
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      default:
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"sm"}
                className="bg-red-500 hover:bg-red-600 w-full"
              >
                Add to Watchlist
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white">
              <DropdownMenuItem onClick={() => handleWatchlist("list")}>
                Add to Watchlist
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleWatchlist("watched")}>
                Watched
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleWatchlist("watching")}>
                Watch Now
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
    }
  };
  return (
    <div className="flex flex-col w-[160px] gap-1 border rounded-xl shadow-xl">
      <Link href="/detail" className="">
        <div className="overflow-hidden rounded-xl w-full max-h-64">
          <img
            src={`${getTmDBImage(data?.poster_path || data?.posterImage)}`}
            className="object-cover transition-transform duration-300 hover:scale-125 cursor-pointer w-full h-full"
            alt={data.title}
          />
        </div>
      </Link>
      <div className="flex flex-col gap-1 p-1 lg:p-2">
        <div className="truncate text-md font-bold">{data?.title}</div>
        <div className="flex items-center justify-between text-xs">
          <span className=" font-normal ">
            {getYear(
              data?.release_date || data?.first_air_date || data.releaseDate
            )}
          </span>
          <span className="flex gap-1 items-center">
            <span>
              {Number(data?.vote_average || data?.tmdbRating).toFixed(1)}
            </span>
            <RatingIcon />
          </span>
        </div>

        {getDropdownMenu()}

        <div className="text-xs px-2">friends are watching</div>
      </div>
    </div>
  );
};
