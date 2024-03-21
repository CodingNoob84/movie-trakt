"use client";
import { getGenresString } from "@/data/genres";
import { IMDBIcon } from "@/lib/icons";
import { getTmDBImage } from "@/lib/utils";
import { addToWatchList } from "@/services/serveractions";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

export const HomeBannerCard = ({ data, watchStatus, refetch }) => {
  const { data: session } = useSession();
  const handleWatchlist = async () => {
    const newData = {
      userId: session.user.id,
      tmdbId: data.id,
      mediaType: data.media_type,
      title: data?.title || data?.name,
      releaseDate: data?.release_date || data?.first_air_date,
      tmdbRating: data?.vote_average,
      watchStatus: "list",
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

  const getButtonBasedOnWatchStatus = () => {
    switch (watchStatus) {
      case "list":
        return (
          <Button
            size={"sm"}
            className="bg-blue-600 hover:bg-blue-400 w-full"
            onClick={() => handleRemove()}
          >
            In the Watchlist
          </Button>
        );
      case "watching":
        return (
          <Button
            size={"sm"}
            className="bg-yellow-600 hover:bg-yellow-400 w-full"
          >
            Watching
          </Button>
        );
      case "watched":
        return (
          <Button
            size={"sm"}
            className="bg-green-600 hover:bg-green-400 w-full"
          >
            Watched
          </Button>
        );
      default:
        return (
          <Button
            size={"sm"}
            className="bg-red-600 hover:bg-red-400 w-full"
            onClick={() => handleWatchlist()}
          >
            Add to WatchList
          </Button>
        );
    }
  };
  return (
    <div
      className="flex flex-col justify-end mt-4 dark:bg-black/10 bg-blend-multiply rounded-3xl h-80 overflow-hidden bg-cover bg-center px-7 pt-4 pb-6 text-white"
      style={{
        color: "transparent",
        backgroundImage: `url('${getTmDBImage(data?.backdrop_path)}')`,
      }}
    >
      <div className="flex flex-col gap-2 bg-gradient-to-r from-black/50 to-transparent -mx-7 -mb-6 px-7 pb-6 pt-2 text-white">
        <div className="uppercase text-2xl font-semibold drop-shadow-lg text-white ">
          {data?.title || data?.name}
        </div>
        <div className=" text-sm flex flex-row items-center gap-2">
          <IMDBIcon />
          <p className=" font-sans">{Number(data?.vote_average).toFixed(1)}</p>
          <span className=" ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-1 before:rounded-full before:h-1 font-Inter text-[13px]">
            {data?.release_date || data?.first_air_date}
          </span>
          <span className=" ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-1 before:rounded-full before:h-1 border-[1px] rounded-2xl px-3 py-1 leading-none text-xs text-_light_white ">
            {data.media_type}
          </span>
        </div>
        <div className="text-xs text-gray-200 lg:w-2/4">{data?.overview}</div>
        <div className="flex w-1/4">{getButtonBasedOnWatchStatus()}</div>
        {/* <div className="flex -space-x-1 items-center ">
            <img
              className="rounded-full w-7 h-7 shadow-lg border border-white"
              src="https://api.lorem.space/image/face?w=32&amp;h=32&amp;hash=zsrj8csk"
              alt=""
              srcSet=""
            />
            <img
              className="rounded-full w-7 h-7 shadow-lg border border-white"
              src="https://api.lorem.space/image/face?w=32&amp;h=32&amp;hash=zsrj8cck"
              alt=""
              srcSet=""
            />
            <img
              className="rounded-full w-7 h-7 shadow-lg border border-white"
              src="https://api.lorem.space/image/face?w=32&amp;h=32&amp;hash=zsfj8cck"
              alt=""
              srcSet=""
            />
            <span className="pl-4 text-xs drop-shadow-lg">
              +8 friends are watching
            </span>
          </div> */}
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
