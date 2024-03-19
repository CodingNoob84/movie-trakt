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

export const WatchCard = ({ data }) => {
  return (
    <div className="border w-full lg:w-[900px] h-[200px] lg:h-[300px] border-gray-700">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"sm"}
                className="bg-green-500 hover:bg-red-400 w-full"
              >
                {data.watchStatus}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white">
              <DropdownMenuItem>Add to List</DropdownMenuItem>
              <DropdownMenuItem>Watched</DropdownMenuItem>
              <DropdownMenuItem>Watch Now</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="text-xs">add on </div>
        </div>
      </div>
    </div>
  );
};
