import Link from "next/link";
import { Badge } from "../ui/badge";
import { RatingIcon } from "@/lib/icons";
import { Button } from "../ui/button";
import { getTmDBImage, getYear } from "@/lib/utils";
import { getGenres, getGenresString } from "@/data/genres";
import { Skeleton } from "../ui/skeleton";
import { useSession } from "next-auth/react";
import { addToWatchList, removeFromWatchList } from "@/services/serveractions";

export const SearchCard = ({ data, watchStatus, refetch }) => {
  console.log(data);
  const { data: session } = useSession();
  if (data.media_type === "person") {
    return;
  }
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

  const handleRemove = async () => {
    const result = await removeFromWatchList({
      tmdbId: data.id,
      userId: session.user.id,
    });
    if (result) {
      refetch();
    }
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
    <div className="flex flex-col w-[160px] gap-1 border rounded-xl shadow-xl">
      <Link href="/detail" className="">
        <div className="overflow-hidden rounded-xl w-full h-64">
          <img
            src={`${getTmDBImage(data?.poster_path || data?.backdrop_path)}`}
            className="object-cover transition-transform duration-300 hover:scale-125 cursor-pointer w-full h-full"
            alt={data?.title || data?.name}
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2 p-1 lg:p-2">
        <div className="truncate text-md font-bold">
          {data?.title || data?.name}
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className=" font-normal ">
            {getYear(data?.release_date || data?.first_air_date)}
          </span>
          <Badge>{data?.media_type}</Badge>
          <span className="flex gap-1 items-center">
            <span>{Number(data?.vote_average).toFixed(1)}</span>
            <RatingIcon />
          </span>
        </div>
        <div className="flex flex-row gap-1 flex-wrap text-xs">
          {getGenres(data.genre_ids.join(","), data.media_type).map(
            (genre, i) => (
              <Badge key={i} variant="outline" className={"text-white"}>
                {genre}
              </Badge>
            )
          )}
        </div>

        {getButtonBasedOnWatchStatus()}
      </div>
    </div>
  );
};

export const SearchCardLoader = () => {
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
