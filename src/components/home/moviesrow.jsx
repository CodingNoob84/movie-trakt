"use client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { LeftArrowIcon, RightArrowIcon } from "@/lib/icons";

import { useState } from "react";
import { MovieCard } from "../common/moviecard";
import { WatchSmallCardLoader } from "../common/watchcard";

export const MoviesRow = ({ title, data, watchdata, refetch, isLoading }) => {
  const options = {
    align: "start",
    loop: "true",
  };
  const [api, setApi] = useState();
  return (
    <>
      <section className="h-[500px] w-full">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-400 text-base dark:text-white">
            {title}
          </span>
          <div className="flex items-center space-x-2 fill-gray-500">
            <div
              onClick={() => {
                api.scrollPrev();
              }}
            >
              <LeftArrowIcon />
            </div>
            <div onClick={() => api.scrollNext()}>
              <RightArrowIcon />
            </div>
          </div>
        </div>
        {isLoading ? (
          <>
            <div className="mt-4 lg:hidden flex flex-row justify-evenly">
              {Array.from({ length: 2 }, (_, i) => (
                <WatchSmallCardLoader key={i} />
              ))}
            </div>
            <div className="hidden mt-4 lg:flex flex-row justify-evenly">
              {Array.from({ length: 5 }, (_, i) => (
                <WatchSmallCardLoader key={i} />
              ))}
            </div>
          </>
        ) : (
          <Carousel opts={options} setApi={setApi}>
            <CarouselContent className="mt-4 flex flex-row gap-0.5">
              {data?.results.map((movie, i) => {
                const matchingWatchData = watchdata?.find(
                  (watchItem) => watchItem.tmdbId === movie.id
                );
                return (
                  <CarouselItem key={i} className="basis-1/2 lg:basis-1/5">
                    <MovieCard
                      data={movie}
                      watchStatus={
                        matchingWatchData ? matchingWatchData.watchStatus : ""
                      }
                      refetch={refetch}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        )}
      </section>
    </>
  );
};
