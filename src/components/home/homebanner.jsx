"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Movies } from "../../../data/dummydata";
import { IMDBIcon } from "@/lib/icons";

const baseURL = "https://image.tmdb.org/t/p/w500";

export const HomeBanner = () => {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {Movies.results.map((movie, i) => (
            <CarouselItem key={i}>
              <div
                className="flex flex-col justify-end mt-4 dark:bg-black/10 bg-blend-multiply rounded-3xl h-80 overflow-hidden bg-cover bg-center px-7 pt-4 pb-6 text-white"
                style={{
                  color: "transparent",
                  backgroundImage: `url(${baseURL}${movie?.backdrop_path})`,
                }}
              >
                <div className="flex flex-col gap-2 bg-gradient-to-r from-black/50 to-transparent -mx-7 -mb-6 px-7 pb-6 pt-2 text-white">
                  <div className="uppercase text-2xl font-semibold drop-shadow-lg text-white ">
                    {movie?.title}
                  </div>
                  <div className=" text-sm flex flex-row items-center gap-2">
                    <IMDBIcon />
                    <p className=" font-sans">7.5</p>
                    <span className=" ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-1 before:rounded-full before:h-1 font-Inter text-[13px]">
                      {movie?.release_date}
                    </span>
                    <span className=" ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-1 before:rounded-full before:h-1 border-[1px] rounded-2xl px-3 py-1 leading-none text-xs text-_light_white ">
                      Movie
                    </span>
                  </div>
                  <div className="text-xs text-gray-200 lg:w-2/4">
                    {movie?.overview}
                  </div>
                  <div className="flex space-x-3 items-center">
                    <a
                      href="#"
                      className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs inline-block"
                    >
                      Watch
                    </a>
                  </div>
                  <div className="flex -space-x-1 items-center ">
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
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
