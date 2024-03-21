"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { LeftArrowIcon, RatingIcon, RightArrowIcon } from "@/lib/icons";
import { Movies } from "../../../data/dummydata";

import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import Link from "next/link";
import { MovieCard } from "../common/moviecard";
const baseURL = "https://image.tmdb.org/t/p/w500";

const movie = {
  adult: false,
  backdrop_path: "/4MCKNAc6AbWjEsM2h9Xc29owo4z.jpg",
  genre_ids: [Array],
  id: 792307,
  original_language: "en",
  original_title: "Poor Things",
  overview:
    "Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.",
  popularity: 1968.226,
  poster_path: "/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
  release_date: "2023-12-07",
  title: "Poor Things",
  video: false,
  vote_average: 7.904,
  vote_count: 2158,
};

export const MoviesRow = ({ title, data }) => {
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
            Trending Movies
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
        <Carousel opts={options} setApi={setApi}>
          <CarouselContent className="mt-4 flex flex-row gap-0.5">
            {Movies.results.map((movie, i) => (
              <CarouselItem key={i} className="basis-1/2 lg:basis-1/5">
                <MovieCard data={movie} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  );
};
