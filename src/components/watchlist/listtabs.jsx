"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RatingIcon } from "@/lib/icons";
import { getWatchListByUserId } from "@/services/serveractions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { WatchCard } from "../common/watchcard";

export const ListTabs = () => {
  const { data: session } = useSession();
  const [tab, setTab] = useState("movie");
  const { data, isLoading } = useQuery({
    queryKey: ["watchlist", { userId: session.user.id }],
    queryFn: () => getWatchListByUserId(session.user.id),
  });
  if (!isLoading) {
    console.log(data);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row h-[40px] w-full">
        <div
          className={`w-full text-center cursor-pointer ${
            tab === "movie" && "border-b-4 border-red-600"
          }`}
          onClick={() => {
            setTab("movie");
          }}
        >
          Movies
        </div>
        <div
          className={`w-full text-center cursor-pointer ${
            tab === "tv" && "border-b-4 border-red-600"
          }`}
          onClick={() => {
            setTab("tv");
          }}
        >
          TV Shows / TV Series
        </div>
      </div>
      <div className="w-full p-2">
        {tab === "movie" ? (
          <div className="flex flex-col gap-4">
            {!isLoading &&
              data.map((item, i) => <WatchCard key={i} data={item} />)}
          </div>
        ) : (
          <div>
            <div className="border w-full lg:w-[900px] h-[200px] lg:h-[300px] border-gray-700">
              <div className="flex flex-row">
                <div className="overflow-hidden rounded-xl w-[150px] lg:w-[200px] h-[200px] lg:h-[300px]">
                  <img
                    src="https://image.tmdb.org/t/p/w500/95VlSEfLMqeX36UVcHJuNlWEpwf.jpg"
                    className="object-cover transition-transform duration-300 hover:scale-125 cursor-pointer w-full h-full"
                    alt={""}
                  />
                </div>
                <div className="flex flex-col justify-evenly gap-2 w-full p-2">
                  <div className="flex flex-row w-full">
                    <div className="truncate">
                      Titlettttttttttttttttttttttttttttttttt
                    </div>
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <div>2024</div>
                    <div className="flex flex-row items-center">
                      <div>8.8</div>
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
                  <div className="hidden lg:block">
                    {`When the plots of reclusive author Elly Conway's fictional
                    espionage novels begin to mirror the covert actions of a
                    real-life spy organization, quiet evenings at home become a
                    thing of the past. Accompanied by her cat Alfie and Aiden, a
                    cat-allergic spy, Elly races across the world to stay one
                    step ahead of the killers as the line between Conway's
                    fictional world and her real one begins to blur.`}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size={"sm"}
                        className="bg-red-500 hover:bg-red-400 w-full"
                      >
                        Watched
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black text-white">
                      <DropdownMenuItem>Add to List</DropdownMenuItem>
                      <DropdownMenuItem>Watched</DropdownMenuItem>
                      <DropdownMenuItem>Watch Now</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="text-xs">started on monday(18th mar)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
