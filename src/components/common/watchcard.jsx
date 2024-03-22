"use client";
import { format } from "date-fns";
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
import Link from "next/link";
import { toast } from "sonner";

const DropdownMenuActions = ({ watchStatus, handleAction }) => {
  const menuItems = {
    list: [
      {
        text: "Remove from List",
        action: () => handleAction("delete", "remove"),
      },
      {
        text: "Mark as Watched",
        action: () => handleAction("update", "watched"),
      },
      {
        text: "Start Watching",
        action: () => handleAction("update", "watching"),
      },
    ],
    watching: [
      { text: "Watch Later", action: () => handleAction("update", "list") },
      {
        text: "Mark as Watched",
        action: () => handleAction("update", "watched"),
      },
      { text: "Skip / Delete", action: () => handleAction("delete", "delete") },
    ],
    watched: [
      { text: "Watch Again", action: () => handleAction("update", "watching") },
      { text: "Move to List", action: () => handleAction("update", "list") },
      {
        text: "Delete from Watched",
        action: () => handleAction("delete", "delete"),
      },
    ],
  };

  const items = menuItems[watchStatus];

  const ButtonContent = {
    list: {
      text: "In the WatchList",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    watching: {
      text: "Watching now",
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    watched: {
      text: "Watched",
      color: "bg-green-500 hover:bg-green-600",
    },
  };
  const button = ButtonContent[watchStatus];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className={`w-full ${button.color}`}>
          {button.text}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black text-white">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.action}
            className="hover:bg-gray-700"
          >
            {item.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const WatchBigCard = ({ data, refetch }) => {
  const handleAction = async (action, status) => {
    try {
      let response;
      if (action === "update") {
        response = await updateWatchStatus({
          tmdbId: data.tmdbId,
          userId: data.userId,
          watchStatus: status,
        });
      } else if (action === "delete") {
        response = await removeFromWatchList({
          tmdbId: data.tmdbId,
          userId: data.userId,
        });
      }

      if (response?.msg === "limitreached") {
        toast.warning("Maximum 5 movies can be marked as Watching");
      } else if (action === "delete") {
        // Show success message specifically for delete action
        refetch();
        toast.error("Removed from watchlist/watch history");
      } else {
        // General success message for other actions
        refetch();
        toast.success(`Movie marked as ${status}`);
      }
    } catch (error) {
      console.error(`Failed to ${action} watch status:`, error);
      toast.error(`Failed to ${action} watch status.`);
    }
  };

  const getWatchDate = () => {
    switch (data.watchStatus) {
      case "list":
        return <>{`Added on ${format(data.createdAt, "do MMMM yyyy")}`}</>;

      case "watching":
        return (
          <>{`Started watching on ${format(data.updatedAt, "do MMMM yyyy")}`}</>
        );

      case "watched":
        return <>{`Watched on ${format(data.updatedAt, "do MMMM yyyy")}`}</>;

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
            {data.genres.split(",").map((genre, i) => (
              <Badge key={i}>{genre}</Badge>
            ))}
          </div>
          <div className="hidden lg:block">{data.overview}</div>
          <DropdownMenuActions
            watchStatus={data.watchStatus}
            handleAction={handleAction}
          />

          <div className="text-xs">{getWatchDate()} </div>
        </div>
      </div>
    </div>
  );
};

export const WatchBigCardLoader = () => {
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

export const WatchSmallCard = ({ data, refetch }) => {
  const handleAction = async (action, status) => {
    try {
      let response;
      if (action === "update") {
        response = await updateWatchStatus({
          tmdbId: data.tmdbId,
          userId: data.userId,
          watchStatus: status,
        });
      } else if (action === "delete") {
        response = await removeFromWatchList({
          tmdbId: data.tmdbId,
          userId: data.userId,
        });
      }

      if (response?.msg === "limitreached") {
        toast.warning("Maximum 5 movies can be marked as Watching");
      } else if (action === "delete") {
        // Show success message specifically for delete action
        refetch();
        toast.error("Removed from watchlist/watch history");
      } else {
        // General success message for other actions
        refetch();
        toast.success(`Movie marked as ${status}`);
      }
    } catch (error) {
      console.error(`Failed to ${action} watch status:`, error);
      toast.error(`Failed to ${action} watch status.`);
    }
  };

  const getWatchDate = () => {
    switch (data.watchStatus) {
      case "list":
        return <>{`Added on ${format(data.createdAt, "do MMMM yyyy")}`}</>;

      case "watching":
        return (
          <>{`Started watching on ${format(data.updatedAt, "do MMMM yyyy")}`}</>
        );

      case "watched":
        return <>{`Watched on ${format(data.updatedAt, "do MMMM yyyy")}`}</>;

      default:
        return null; // or some default JSX
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
          <span className=" font-normal ">{getYear(data.releaseDate)}</span>
          <span className="flex gap-1 items-center">
            <span>
              {Number(data?.vote_average || data.tmdbRating).toFixed(1)}
            </span>
            <RatingIcon />
          </span>
        </div>

        <DropdownMenuActions
          watchStatus={data.watchStatus}
          handleAction={handleAction}
        />

        <div className="text-xs font-thin px-2">{getWatchDate()}</div>
      </div>
    </div>
  );
};

export const WatchSmallCardLoader = () => {
  return (
    <div className="flex flex-col w-[160px] gap-1 border rounded-xl shadow-xl">
      <Skeleton className="w-full h-64 bg-slate-600" />
      <div className="flex flex-col gap-2 p-1 lg:p-2">
        <Skeleton className="w-full h-4 bg-slate-600" />
        <div className="flex items-center justify-between text-xs">
          <Skeleton className="w-full h-2 bg-slate-600" />
          <Skeleton className="w-full h-2 bg-slate-600" />
        </div>

        <Skeleton className="w-full h-4 bg-slate-600" />

        <div className="text-xs px-2">
          {" "}
          <Skeleton className="w-full h-2 bg-slate-600" />
        </div>
      </div>
    </div>
  );
};
