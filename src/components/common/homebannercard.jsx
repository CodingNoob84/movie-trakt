"use client";
import { getGenresString } from "@/data/genres";
import { IMDBIcon } from "@/lib/icons";
import { getTmDBImage, truncateText } from "@/lib/utils";
import {
  addToWatchList,
  removeFromWatchList,
  updateWatchStatus,
} from "@/services/serveractions";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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

export const HomeBannerCard = ({
  data,
  watchStatus,
  refetch,
  autoplay,
  watchpeopledata,
}) => {
  //console.log(watchpeopledata);
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
      autoplay.play();
    } catch (error) {
      console.error(`Failed to ${action} watch status:`, error);
      toast.error(`Failed to ${action} watch status.`);
    }
  };
  return (
    <div
      className="flex flex-col justify-end mt-4 dark:bg-black/10 bg-blend-multiply rounded-3xl h-80 overflow-hidden bg-cover bg-center px-7 pt-4 pb-6 text-white"
      style={{
        color: "transparent",
        backgroundImage: `url('${getTmDBImage(data?.backdropImage)}')`,
      }}
    >
      <div className="flex flex-col gap-2 bg-gradient-to-r from-black/50 to-transparent -mx-7 -mb-6 px-7 pb-6 pt-2 text-white">
        <div className="uppercase text-2xl font-semibold drop-shadow-lg text-white ">
          {data?.title}
        </div>
        <div className=" text-sm flex flex-row items-center gap-2">
          <IMDBIcon />
          <p className=" font-sans">{Number(data?.tmdbRating).toFixed(1)}</p>
          <span className=" ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-1 before:rounded-full before:h-1 font-Inter text-[13px]">
            {data?.releaseDate}
          </span>
          <span className=" ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-1 before:rounded-full before:h-1 border-[1px] rounded-2xl px-3 py-1 leading-none text-xs text-_light_white ">
            {data.mediaType}
          </span>
        </div>
        <div className="text-xs text-gray-200 lg:w-2/4">
          {" "}
          {truncateText(data?.overview || "", 50)}
        </div>
        <div className="flex lg:w-1/4">
          {" "}
          <DropdownMenuActions
            watchStatus={watchStatus}
            handleAction={handleAction}
          />
        </div>

        <div className="flex -space-x-1 items-center ">
          {watchpeopledata?.users?.length > 0 &&
            watchpeopledata?.users?.map((user, i) => (
              <img
                key={i}
                className="rounded-full w-7 h-7 shadow-lg border border-white"
                src={user?.image}
                alt={user?.name}
                srcSet=""
              />
            ))}

          {watchpeopledata?.totalCount > 0 && (
            <span className="pl-4 text-xs drop-shadow-lg">
              {watchpeopledata?.remainingCount > 0 &&
                ` +${watchpeopledata.remainingCount} `}
              friends are watching/watched
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const HomeBannerCardLoader = () => {
  return (
    <div className="flex flex-col justify-end mt-4 w-full bg-slate-800 rounded-3xl h-80 ">
      <div className="flex flex-col gap-2 -mx-7 -mb-6 px-7 pb-6 pt-2 text-white">
        <Skeleton className="w-full h-4 bg-slate-900" />
        <Skeleton className="w-full h-4 bg-slate-900" />
        <Skeleton className="w-full h-8 bg-slate-900" />
        <Skeleton className="w-full h-4 bg-slate-900" />
      </div>
    </div>
  );
};
