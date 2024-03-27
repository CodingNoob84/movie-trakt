import { getTmDBImage } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

export const TvDetailCard = ({ data }) => {
  return (
    <div className="w-full">
      <div className="relative">
        <img
          alt="Dune: Part Two"
          height="400"
          className=" w-full h-[400px] select-none object-top"
          src={`${getTmDBImage(data?.backdropImage || data?.backdrop_path)}`}
          style={{ color: "transparent", objectFit: "cover" }}
          //style="color: transparent; object-fit: cover;"
        />
        <div className="absolute bottom-0 bg-gradient-to-t from-bg-black inset-x-0 h-40"></div>
      </div>
      <section className="relative -translate-y-12 rounded-t-[45px]">
        <div>
          <div className="w-52 max-md:hidden block h-72 absolute -translate-y-36 max-md:translate-x-32 translate-x-16">
            <div className="overflow-hidden rounded-2xl">
              <img
                alt="Dune: Part Two"
                className="select-none hover:scale-125 max-md:w-28 transition-transform duration-150 ease-in  w-full rounded-2xl  max-md:!h-36"
                src={`${getTmDBImage(data?.posterImage || data?.poster_path)}`}
                style={{
                  color: "transparent",
                  objectFit: "cover",
                  height: "300px",
                }}
                //style="color: transparent; object-fit: cover; height: 288px;"
              />
            </div>
          </div>
          <div className="absolute -top-40 hidden  left-0 bg-transparent right-0 w-full max-md:flex justify-center">
            <img
              alt="Dune: Part Two"
              className=" w-56 h-80 rounded-2xl hidden max-md:block select-none object-top"
              src={`${getTmDBImage(data?.posterImage || data?.poster_path)}`}
              style={{ color: "transparent", objectFit: "cover" }}
              //style="color: transparent; object-fit: cover;"
            />
          </div>
          <section className="pl-72 lg:bg-black  max-md:justify-center  max-md:pl-0 max-md:flex-col   max-md:pt-44 h-[200px] max-md:h-full py-6 flex justify-between">
            <div className="">
              <h2 className="text-4xl max-md:text-center font-bold tracking-wide">
                {data?.name}
              </h2>
              <div className="mt-4  max-md:flex max-md:justify-center max-md:flex-wrap">
                <div className="flex gap-3 flex-wrap">
                  {data?.genres.map((genre) => (
                    <Badge key={genre.id} variant="secondary">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-3 pl-1 flex max-md:flex-wrap max-md:justify-center items-center gap-2">
                <span className="text-_welcometext_lightblue font-Inter text-[13px]">
                  {/* {data?.status} */}
                </span>
                <div className="bg-_white w-1 h-1 rounded-full mx-1 "></div>
                <span className="text-_welcometext_lightblue font-Inter text-[13px]">
                  {data?.first_air_date}
                </span>
                <div className="bg-_white w-1 h-1 rounded-full mx-1"></div>
                <div className="flex items-center gap-2 ">
                  <span className="text-_welcometext_lightblue text-xs">
                    {Number(data?.vote_average).toFixed(1)}
                  </span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-yellow-400 text-sm mb-[1px]"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 38.013c-22.458 0-66.472 110.3-84.64 123.502-18.17 13.2-136.674 20.975-143.614 42.334-6.94 21.358 84.362 97.303 91.302 118.662 6.94 21.36-22.286 136.465-4.116 149.665 18.17 13.2 118.61-50.164 141.068-50.164 22.458 0 122.9 63.365 141.068 50.164 18.17-13.2-11.056-128.306-4.116-149.665 6.94-21.36 98.242-97.304 91.302-118.663-6.94-21.36-125.444-29.134-143.613-42.335-18.168-13.2-62.182-123.502-84.64-123.502z"></path>
                  </svg>
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
              {data?.overview}
            </p>
          </section>
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <div>Seasons</div>
        <div className="flex fex-row flex-wrap gap-4">
          {data?.seasons.map((season, i) => (
            <div
              key={i}
              className="flex flex-col w-[160px] gap-1 border rounded-xl shadow-xl"
            >
              <div className="overflow-hidden rounded-xl w-full max-h-64">
                <img
                  src={`${getTmDBImage(season?.poster_path)}`}
                  className="object-cover transition-transform duration-300 hover:scale-125 cursor-pointer w-full h-full"
                  alt=""
                />
              </div>

              <div className="flex flex-col gap-1 p-1 lg:p-2">
                <div className="flex items-center justify-between">
                  <div className="truncate text-md font-bold">
                    {season?.name}
                  </div>
                  <span className="flex gap-1 items-center text-xs">
                    <span>{`0/${season?.episode_count}`}</span>
                  </span>
                </div>
                <Progress value={30} indicatorColor="bg-green-600" />

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

                <div className="text-xs px-2">friends are watching</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
