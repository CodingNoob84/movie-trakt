import { MoviesRow } from "@/components/home/moviesrow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RatingIcon } from "@/lib/icons";

const movie = {
  adult: false,
  backdrop_path: "/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg",
  genre_ids: [Array],
  id: 438631,
  original_language: "en",
  original_title: "Dune",
  overview:
    "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
  popularity: 734.998,
  poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
  release_date: "2021-09-15",
  title: "Dune",
  video: false,
  vote_average: 7.786,
  vote_count: 10708,
};
const baseURL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <div className="relative">
          <img
            alt={movie.original_title}
            height="500"
            className=" w-full h-[400px] select-none object-top"
            src={`${baseURL}${movie.backdrop_path}`}
            style={{ color: "transparent", objectFit: "cover" }}
          />
          <div className="absolute bottom-0 bg-gradient-to-t from-bg-black inset-x-0 h-40"></div>
        </div>
        <section className="relative -translate-y-12 rounded-t-[45px]">
          <div>
            <div className="w-52 max-md:hidden block h-72 absolute -translate-y-36 max-md:translate-x-32 translate-x-16">
              <div className="overflow-hidden rounded-2xl">
                <img
                  alt={movie.original_title}
                  className="select-none hover:scale-125 max-md:w-28 transition-transform duration-150 ease-in  w-full rounded-2xl  max-md:!h-36"
                  src={`${baseURL}${movie.poster_path}`}
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
                src={`${baseURL}${movie.poster_path}`}
                style={{ color: "transparent", objectFit: "cover" }}
              />
            </div>
            <section className="pl-72 lg:bg-black  max-md:justify-center  max-md:pl-0 max-md:flex-col   max-md:pt-44 h-[200px] max-md:h-full py-6 flex justify-between">
              <div className="">
                <h2 className="text-4xl max-md:text-center font-bold tracking-wide">
                  {movie.original_title}
                </h2>
                <div className="mt-4  max-md:flex max-md:justify-center max-md:flex-wrap">
                  <div className="flex gap-3 flex-wrap">
                    <Badge variant="secondary">Science Fiction</Badge>
                    <Badge variant="secondary">Adventure</Badge>
                    <Badge variant="secondary">Crime</Badge>
                  </div>
                </div>
                <div className="mt-3 pl-1 flex max-md:flex-wrap max-md:justify-center items-center gap-2">
                  <span className="text-_welcometext_lightblue font-Inter text-[13px]">
                    2 hours 47 minutes
                  </span>
                  <div className="bg-_white w-1 h-1 rounded-full mx-1 "></div>
                  <span className="text-_welcometext_lightblue font-Inter text-[13px]">
                    2024-02-27
                  </span>
                  <div className="bg-_white w-1 h-1 rounded-full mx-1"></div>
                  <div className="flex items-center gap-2 ">
                    <span className="text-_welcometext_lightblue text-xs">
                      8.4
                    </span>
                    <RatingIcon />
                  </div>
                </div>
              </div>
              <div className=" mr-24 max-md:mr-0 max-md:flex max-md:justify-center pt-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size={"sm"}
                      className="bg-red-500 hover:bg-red-400 w-full"
                    >
                      Watch
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black text-white">
                    <DropdownMenuItem>Add to List</DropdownMenuItem>
                    <DropdownMenuItem>Watched</DropdownMenuItem>
                    <DropdownMenuItem>Watch Now</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </section>
            <section>
              <p className=" font-light tracking-wide px-16 max-md:px-2 text-base font-Helvetica">
                Follow the mythic journey of Paul Atreides as he unites with
                Chani and the Fremen while on a path of revenge against the
                conspirators who destroyed his family. Facing a choice between
                the love of his life and the fate of the known universe, Paul
                endeavors to prevent a terrible future only he can foresee.
              </p>
            </section>
          </div>
        </section>
      </div>
      <section className="mt-9">
        <MoviesRow />
      </section>
    </div>
  );
}
