"use client";
import { RatingIcon } from "@/lib/icons";
import { Badge } from "../ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { getTmDBImage, getYear } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import {
  removeFromWatchList,
  updateWatchStatus,
} from "@/services/serveractions";
import { useState } from "react";

export const WatchCard = ({ data, refetch }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleWatchStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await updateWatchStatus({
        tmdbId: data.tmdbId,
        userId: data.userId,
        watchStatus: newStatus,
      });
      refetch();
    } catch (error) {
      console.error("Failed to update watch status:", error);
    }
    setIsUpdating(false);
  };

  const handleRemoveFromWatchList = async () => {
    setIsUpdating(true);
    try {
      await removeFromWatchList({ tmdbId: data.tmdbId, userId: data.userId });
      refetch();
    } catch (error) {
      console.error("Failed to remove from watchlist:", error);
    }
    setIsUpdating(false);
  };

  const getDropdownMenu = () => {
    if (isUpdating) {
      return <Skeleton className="w-full h-10" />;
    }

    switch (data.watchStatus) {
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
              <DropdownMenuItem onClick={handleRemoveFromWatchList}>
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
            <DropdownMenuItem className="hover:bg-green-600">
              Watch Later
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-green-600">
              Watched
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-green-600">
              Skip
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-green-600">
              Boring
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>;
      case "watched":
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
            <DropdownMenuItem className="hover:bg-red-600">
              Remove from Watched
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>;
      default:
        return null; // or some default JSX
    }
  };

  return (
    <div className="border w-full h-[200px] lg:h-[300px] border-gray-700">
      <div className="flex flex-row">
        <div className="overflow-hidden rounded-xl w-[150px] lg:w-[200px] h-[200px] lg:h-[300px]">
          <img
            src={getTmDBImage(data.posterImage)}
            className="object-cover transition-transform duration-300 hover:scale-125 cursor-pointer w-full h-full"
            alt={""}
          />
        </div>
        <div className="flex flex-col justify-evenly gap-2 w-full p-2">
          <div className="flex flex-row w-full">
            <div className="truncate">{data.title}</div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>{getYear(data.releaseDate)}</div>
            <div className="flex flex-row items-center">
              <div>{Number(data.tmdbRating).toFixed(1)}</div>
              <RatingIcon />
            </div>
          </div>
          <div className="flex flex-row gap-1 flex-wrap">
            <Badge>Crime</Badge>
            <Badge>science fiction</Badge>
            <Badge>Crime</Badge>
            <Badge>Crime</Badge>
            <Badge>Crime</Badge>
          </div>
          <div className="hidden lg:block">{data.overview}</div>
          {getDropdownMenu()}

          <div className="text-xs">add on </div>
        </div>
      </div>
    </div>
  );
};

export const WatchCardLoader = () => {
  return (
    <div className="border w-full h-[200px] lg:h-[300px] border-gray-700">
      <div className="flex flex-row">
        <div className="overflow-hidden rounded-xl w-[150px] lg:w-[200px] h-[200px] lg:h-[300px]">
          <Skeleton className="w-full h-full bg-slate-600" />
        </div>
        <div className="flex flex-col justify-evenly gap-4 w-full p-2">
          <Skeleton className="w-full h-8 bg-slate-600" />
          <div className="flex flex-row justify-between w-full">
            <Skeleton className="w-full h-4 bg-slate-600" />
            <Skeleton className="w-full h-4 bg-slate-600" />
          </div>
          <div className="flex flex-row gap-4">
            <Skeleton className="w-full h-4 bg-slate-600" />
            <Skeleton className="w-full h-4 bg-slate-600" />
            <Skeleton className="w-full h-4 bg-slate-600" />
          </div>
          <div className="hidden lg:block">
            {" "}
            <Skeleton className="w-full h-8 bg-slate-600" />
          </div>
          <Skeleton className="w-full h-8 bg-slate-600" />
          <div className="text-xs">
            {" "}
            <Skeleton className="w-full h-8 bg-slate-600" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

const getDropdownMenu = (tmdbId, userId, watchStatus) => {
  const handleWatchStatus = async (watchStatus) => {
    await updateWatchStatus(tmdbId, userId, watchStatus);
    refetch();
  };
  if (watchStatus === "list") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={"sm"}
            className={`bg-blue-500 hover:bg-blue-600 w-full`}
          >
            In the Watchlist
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black text-white">
          <DropdownMenuItem
            className="hover:bg-blue-600"
            onClick={() => removeFromWatchList(tmdbId, userId)}
          >
            Remove from List
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-blue-600"
            onClick={() => handleWatchStatus("watched")}
          >
            Watched
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-blue-600"
            onClick={() => handleWatchStatus("watching")}
          >
            Watch Now
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else if (watchStatus === "watching") {
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
          <DropdownMenuItem className="hover:bg-green-600">
            Watch Later
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-green-600">
            Watched
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-green-600">
            Skip
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-green-600">
            Boring
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else if (watchStatus === "watched") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"sm"} className={`bg-red-500 hover:bg-red-600 w-full`}>
            Watched
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black text-white">
          <DropdownMenuItem className="hover:bg-red-600">
            Remove from Watched
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return null;
};
