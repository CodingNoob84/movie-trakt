"use client";
import { RatingIcon } from "@/lib/icons";
import { getTmDBImage } from "@/lib/utils";
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
import { Badge } from "../ui/badge";

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

export const MovieDetailCard = ({ data, watchStatus, refetch }) => {
  const { data: session } = useSession();
  const prepareData = (status) => ({
    userId: session.user.id,
    tmdbId: data.id,
    mediaType: "movie",
    title: data?.title || data?.name,
    releaseDate: data?.release_date || data?.first_air_date,
    tmdbRating: data?.vote_average,
    watchStatus: status,
    genres: data.genres.map((genre) => genre.name).join(","),
    overview: data.overview,
    posterImage: data.poster_path,
    backdropImage: data.backdrop_path,
  });

  const handleAction = async (action, status) => {
    try {
      let response;
      if (action === "add") {
        response = await addToWatchList(prepareData(status));
      } else if (action === "update") {
        response = await updateWatchStatus({
          tmdbId: data.id,
          userId: session.user.id,
          watchStatus: status,
        });
      } else if (action === "delete") {
        response = await removeFromWatchList({
          tmdbId: data.id,
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
    <div className="w-full px-4">
      <div className="relative">
        <img
          alt={data?.title}
          height="500"
          className="w-[400px] lg:w-full h-[300px] select-none object-top"
          src={`${getTmDBImage(data?.backdropImage || data?.backdrop_path)}`}
          style={{ color: "transparent", objectFit: "cover" }}
        />
        <div className="absolute bottom-0 bg-gradient-to-t from-bg-black inset-x-0 h-40"></div>
      </div>
      <section className="relative -translate-y-12 rounded-t-[45px]">
        <div>
          <div className="w-52 max-md:hidden block h-72 absolute -translate-y-36 max-md:translate-x-32 translate-x-16">
            <div className="overflow-hidden rounded-2xl">
              <img
                alt={data?.title}
                className="select-none hover:scale-125 max-md:w-28 transition-transform duration-150 ease-in  w-full rounded-2xl  max-md:!h-36"
                src={`${getTmDBImage(data?.posterImage || data?.poster_path)}`}
                style={{
                  color: "transparent",
                  objectFit: "cover",
                  height: "300px",
                }}
              />
            </div>
          </div>
          <div className="absolute -top-40 hidden  left-0 bg-transparent right-0 w-full max-md:flex justify-center">
            <img
              alt="Dune: Part Two"
              className=" w-56 h-80 rounded-2xl hidden max-md:block select-none object-top"
              src={`${getTmDBImage(data?.posterImage || data?.poster_path)}`}
              style={{ color: "transparent", objectFit: "cover" }}
            />
          </div>
          <section className="pl-72 lg:bg-black  max-md:justify-center  max-md:pl-0 max-md:flex-col   max-md:pt-44 h-[200px] max-md:h-full py-6 flex justify-between">
            <div className="">
              <h2 className="text-4xl max-md:text-center font-bold tracking-wide">
                {data?.title || data?.original_title}
              </h2>
              <div className="mt-4  max-md:flex max-md:justify-center max-md:flex-wrap">
                <div className="flex gap-3 flex-wrap">
                  {data?.genres.map((genre, i) => (
                    <Badge key={i}>{genre.name}</Badge>
                  ))}
                </div>
              </div>
              <div className="mt-3 pl-1 flex max-md:flex-wrap max-md:justify-center items-center gap-2">
                <span className="text-_welcometext_lightblue font-Inter text-[13px]">
                  {data?.runtime}
                </span>
                <div className="bg-_white w-1 h-1 rounded-full mx-1 "></div>
                <span className="text-_welcometext_lightblue font-Inter text-[13px]">
                  {data?.release_date}
                </span>
                <div className="bg-_white w-1 h-1 rounded-full mx-1"></div>
                <div className="flex items-center gap-2 ">
                  <span className="text-_welcometext_lightblue text-xs">
                    {Number(data?.vote_average).toFixed(1)}
                  </span>
                  <RatingIcon />
                </div>
              </div>
            </div>
            <div className=" mr-24 max-md:mr-0 max-md:flex max-md:justify-center pt-3">
              <DropdownMenuActions
                watchStatus={watchStatus}
                handleAction={handleAction}
              />
            </div>
          </section>
          <section>
            <p className=" font-light tracking-wide px-16 max-md:px-2 text-base font-Helvetica">
              {data?.overview}
            </p>
          </section>
        </div>
      </section>
    </div>
  );
};
