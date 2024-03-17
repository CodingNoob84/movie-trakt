import { RatingIcon } from "@/lib/icons";
import { getTmDBImage } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export const MovieCard = ({ data }) => {
  return (
    <div className="flex flex-col w-[180px] gap-1 border rounded-xl shadow-xl">
      <Link href="/detail" className="">
        <div className="overflow-hidden rounded-xl w-full max-h-64">
          <img
            src={`${getTmDBImage(data?.poster_path)}`}
            className="object-cover transition-transform duration-300 hover:scale-125 cursor-pointer w-full h-full"
            alt={data.title}
          />
        </div>
      </Link>
      <div className="flex flex-col gap-1 p-1 lg:p-2">
        <div className="truncate text-md font-bold">{data?.title}</div>
        <div className="flex items-center justify-between text-xs">
          <span className=" font-normal ">
            {data?.release_date.split("-")[0]}
          </span>
          <span className="flex gap-1 items-center">
            <span>{Number(data?.vote_average).toFixed(1)}</span>
            <RatingIcon />
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"sm"} className="bg-red-500 hover:bg-red-400 w-full">
              Watch
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black text-white">
            <DropdownMenuItem>Add to List</DropdownMenuItem>
            <DropdownMenuItem>Watched</DropdownMenuItem>
            <DropdownMenuItem>Watch Now</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="text-xs px-2">friends are watching</div>
      </div>
    </div>
  );
};
