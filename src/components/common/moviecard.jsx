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
import {
  addToWatchList,
  removeFromWatchList,
  updateWatchStatus,
} from "@/services/serveractions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { getGenresString } from "@/data/genres";
import { Skeleton } from "../ui/skeleton";

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

  const items = menuItems[watchStatus] || [
    { text: "Add to Watchlist", action: () => handleAction("add", "list") },
    { text: "Mark as Watched", action: () => handleAction("add", "watched") },
    { text: "Start Watching", action: () => handleAction("add", "watching") },
  ];

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
  const button = ButtonContent[watchStatus] || {
    text: "Add to WatchList",
    color: "bg-red-500 hover:bg-red-600",
  };

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

export const MovieCard = ({ data, watchStatus, refetch }) => {
  const { data: session } = useSession();
  const prepareData = (status) => ({
    userId: session.user.id,
    watchStatus: status,
    ...data,
  });

  const handleAction = async (action, status) => {
    try {
      let response;
      if (action === "add") {
        response = await addToWatchList(prepareData(status));
      } else if (action === "update") {
        response = await updateWatchStatus({
          tmdbId: data.tmdbId,
          userId: session.user.id,
          watchStatus: status,
        });
      } else if (action === "delete") {
        response = await removeFromWatchList({
          tmdbId: data.tmdbId,
          userId: session.user.id,
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

  return (
    <div className="flex flex-col w-[160px] gap-1 border rounded-xl shadow-xl">
      <Link
        href={`/${data.mediaType === "movie" ? "movies" : "tvshows"}/${
          data.tmdbId
        }`}
        className=""
      >
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

        <DropdownMenuActions
          watchStatus={watchStatus}
          handleAction={handleAction}
        />

        <div className="text-xs px-2">friends are watching</div>
      </div>
    </div>
  );
};

export const MovieCardLoader = () => {
  return (
    <div className="flex flex-col w-[160px] gap-1 border border-gray-400 rounded-xl shadow-xl">
      <div className="overflow-hidden rounded-xl w-full h-48">
        <Skeleton className="w-full h-full bg-slate-900" />
      </div>

      <div className="flex flex-col gap-2 p-1 lg:p-2">
        <div className="truncate text-md font-bold">
          <Skeleton className="w-full h-4 bg-slate-900" />
        </div>
        <div className="flex items-center gap-1 justify-between text-xs">
          <Skeleton className="w-1/3 h-4 bg-slate-900" />
          <Skeleton className="w-1/3 h-4 bg-slate-900" />
          <Skeleton className="w-1/3 h-4 bg-slate-900" />
        </div>
        <div className="flex items-center gap-1 justify-between text-xs">
          <Skeleton className="w-1/3 h-4 bg-slate-900" />
          <Skeleton className="w-1/3 h-4 bg-slate-900" />
          <Skeleton className="w-1/3 h-4 bg-slate-900" />
        </div>

        <Skeleton className="w-full h-7 bg-slate-900" />
      </div>
    </div>
  );
};
