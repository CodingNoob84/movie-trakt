import { UserComponent } from "@/components/navbar/UserComponent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const movie = {
  adult: false,
  backdrop_path: "/4MCKNAc6AbWjEsM2h9Xc29owo4z.jpg",
  genre_ids: [Array],
  id: 866398,
  original_language: "en",
  original_title: "The Beekeeper",
  overview:
    "One man's campaign for vengeance takes on national stakes after he is revealed to be a former operative of a powerful and clandestine organization known as Beekeepers.",
  popularity: 425.75,
  poster_path: "/A7EByudX0eOzlkQ2FIbogzyazm2.jpg",
  release_date: "2024-01-08",
  title: "The Beekeeper",
  video: false,
  vote_average: 7.463,
  vote_count: 1683,
};
const baseURL = "https://image.tmdb.org/t/p/w500";

export default function TestPage() {
  return (
    <>
      <div className="flex flex-col">
        <div
          class="flex flex-col justify-end mt-4 dark:bg-black/10 bg-blend-multiply rounded-3xl h-80 overflow-hidden bg-cover bg-center px-7 pt-4 pb-6 text-white"
          style={{
            color: "transparent",
            backgroundImage: `url(${baseURL}${movie?.backdrop_path})`,
          }}
        >
          <div class="flex flex-col gap-2 bg-gradient-to-r from-black/40 to-transparent -mx-7 -mb-6 px-7 pb-6 pt-2 text-white">
            <div class="uppercase text-2xl font-semibold drop-shadow-lg text-white ">
              Inception
            </div>
            <div class=" text-sm flex flex-row items-center gap-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 448 512"
                class="text-yellow-400 text-xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM21.3 229.2H21c.1-.1.2-.3.3-.4zM97 319.8H64V192h33zm113.2 0h-28.7v-86.4l-11.6 86.4h-20.6l-12.2-84.5v84.5h-29V192h42.8c3.3 19.8 6 39.9 8.7 59.9l7.6-59.9h43zm11.4 0V192h24.6c17.6 0 44.7-1.6 49 20.9 1.7 7.6 1.4 16.3 1.4 24.4 0 88.5 11.1 82.6-75 82.5zm160.9-29.2c0 15.7-2.4 30.9-22.2 30.9-9 0-15.2-3-20.9-9.8l-1.9 8.1h-29.8V192h31.7v41.7c6-6.5 12-9.2 20.9-9.2 21.4 0 22.2 12.8 22.2 30.1zM265 229.9c0-9.7 1.6-16-10.3-16v83.7c12.2.3 10.3-8.7 10.3-18.4zm85.5 26.1c0-5.4 1.1-12.7-6.2-12.7-6 0-4.9 8.9-4.9 12.7 0 .6-1.1 39.6 1.1 44.7.8 1.6 2.2 2.4 3.8 2.4 7.8 0 6.2-9 6.2-14.4z"></path>
              </svg>
              <p class="text-_light_white font-sans">7.5</p>
              <span class="text-_welcometext_lightblue ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-1 before:rounded-full before:h-1 font-Inter text-[13px]">
                2024
              </span>
              <span class="border-_light_white ml-5 before:-left-4 relative content-['*'] before:absolute before:bg-neutral-400  before:bottom-1/2 before:top-1/2 before:w-1 before:rounded-full before:h-1 border-[1px] rounded-2xl px-3 py-1 leading-none text-xs text-_light_white ">
                TV
              </span>
            </div>
            <div class="text-xs text-gray-200 lg:w-2/3">{movie?.overview}</div>
            <div class="flex space-x-3 items-center">
              <a
                href="#"
                class="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs inline-block"
              >
                Watch
              </a>
              <a
                href="#"
                class="p-2.5 bg-gray-800/80 rounded-lg hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div class="flex -space-x-1 items-center ">
              <img
                class="rounded-full w-7 h-7 shadow-lg border border-white"
                src="https://api.lorem.space/image/face?w=32&amp;h=32&amp;hash=zsrj8csk"
                alt=""
                srcset=""
              />
              <img
                class="rounded-full w-7 h-7 shadow-lg border border-white"
                src="https://api.lorem.space/image/face?w=32&amp;h=32&amp;hash=zsrj8cck"
                alt=""
                srcset=""
              />
              <img
                class="rounded-full w-7 h-7 shadow-lg border border-white"
                src="https://api.lorem.space/image/face?w=32&amp;h=32&amp;hash=zsfj8cck"
                alt=""
                srcset=""
              />
              <span class="pl-4 text-xs drop-shadow-lg">
                +8 friends are watching
              </span>
            </div>
          </div>
        </div>
        <section class="mt-9">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-gray-400 text-base dark:text-white">
              Top Stars
            </span>
            <div class="flex items-center space-x-2 fill-gray-500">
              <svg
                class="h-7 w-7 rounded-full border p-1 hover:border-red-600 hover:fill-red-600 dark:fill-white dark:hover:fill-red-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293L7.58 12l5.7 5.7 1.41-1.42 -4.3-4.3 4.29-4.293Z"></path>
              </svg>
              <svg
                class="h-7 w-7 rounded-full border p-1 hover:border-red-600 hover:fill-red-600 dark:fill-white dark:hover:fill-red-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M10.7 17.707l5.7-5.71 -5.71-5.707L9.27 7.7l4.29 4.293 -4.3 4.29Z"></path>
              </svg>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-2  sm:grid-cols-4 gap-x-5 gap-y-5">
            <div className="flex flex-col gap-1 border rounded-xl shadow-xl">
              <img
                src={`${baseURL}${movie?.poster_path}`}
                class="object-cover rounded-xl w-full max-h-64 -z-10"
                alt=""
              />
              <div className="flex flex-col gap-1 p-1">
                <div>The Beekeeper</div>
                <div class="flex items-center justify-between text-xs">
                  <div class="flex  items-center gap-2">
                    <p class="text-_light_white max-md:text-xxs font-normal ">
                      2024
                    </p>
                    <p class="flex gap-1 max-md:text-xxs  text-_light_white items-center">
                      <span>5.8</span>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        class="text-yellow-500 mb-[1px]"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M256 38.013c-22.458 0-66.472 110.3-84.64 123.502-18.17 13.2-136.674 20.975-143.614 42.334-6.94 21.358 84.362 97.303 91.302 118.662 6.94 21.36-22.286 136.465-4.116 149.665 18.17 13.2 118.61-50.164 141.068-50.164 22.458 0 122.9 63.365 141.068 50.164 18.17-13.2-11.056-128.306-4.116-149.665 6.94-21.36 98.242-97.304 91.302-118.663-6.94-21.36-125.444-29.134-143.613-42.335-18.168-13.2-62.182-123.502-84.64-123.502z"></path>
                      </svg>
                    </p>
                  </div>
                  <span class=" tracking-wider border-[1px] border-opacity-25 font-thin  px-2 rounded-md py-1 scale-90">
                    Movie
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Button className="hover:bg-red-500">Watch Later</Button>
                  <Button>+</Button>
                </div>
                <div className="text-xs px-2">friends are watching</div>
              </div>
            </div>
            <div className="flex flex-col gap-1 border rounded-xl shadow-xl">
              <img
                src={`${baseURL}${movie?.poster_path}`}
                class="object-cover rounded-xl w-full max-h-64 -z-10"
                alt=""
              />
              <div className="flex flex-col gap-1 p-1">
                <div>The Beekeeper</div>
                <div class="flex items-center justify-between text-xs">
                  <div class="flex  items-center gap-2">
                    <p class="text-_light_white max-md:text-xxs font-normal ">
                      2024
                    </p>
                    <p class="flex gap-1 max-md:text-xxs  text-_light_white items-center">
                      <span>5.8</span>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        class="text-yellow-500 mb-[1px]"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M256 38.013c-22.458 0-66.472 110.3-84.64 123.502-18.17 13.2-136.674 20.975-143.614 42.334-6.94 21.358 84.362 97.303 91.302 118.662 6.94 21.36-22.286 136.465-4.116 149.665 18.17 13.2 118.61-50.164 141.068-50.164 22.458 0 122.9 63.365 141.068 50.164 18.17-13.2-11.056-128.306-4.116-149.665 6.94-21.36 98.242-97.304 91.302-118.663-6.94-21.36-125.444-29.134-143.613-42.335-18.168-13.2-62.182-123.502-84.64-123.502z"></path>
                      </svg>
                    </p>
                  </div>
                  <span class=" tracking-wider border-[1px] border-opacity-25 font-thin  px-2 rounded-md py-1 scale-90">
                    Movie
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Button className="hover:bg-red-500">Watch Later</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>+</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black text-white">
                      <DropdownMenuItem>Started to Watch</DropdownMenuItem>
                      <DropdownMenuItem>Already watched</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="text-xs px-2"></div>
              </div>
            </div>
            <div className="flex flex-col gap-1 border rounded-xl shadow-xl">
              <img
                src={`${baseURL}${movie?.poster_path}`}
                class="object-cover rounded-xl w-full max-h-64 -z-10"
                alt=""
              />
              <div className="flex flex-col gap-1 p-1">
                <div>The Beekeeper</div>
                <div class="flex items-center justify-between text-xs">
                  <div class="flex  items-center gap-2">
                    <p class="text-_light_white max-md:text-xxs font-normal ">
                      2024
                    </p>
                    <p class="flex gap-1 max-md:text-xxs  text-_light_white items-center">
                      <span>5.8</span>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        class="text-yellow-500 mb-[1px]"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M256 38.013c-22.458 0-66.472 110.3-84.64 123.502-18.17 13.2-136.674 20.975-143.614 42.334-6.94 21.358 84.362 97.303 91.302 118.662 6.94 21.36-22.286 136.465-4.116 149.665 18.17 13.2 118.61-50.164 141.068-50.164 22.458 0 122.9 63.365 141.068 50.164 18.17-13.2-11.056-128.306-4.116-149.665 6.94-21.36 98.242-97.304 91.302-118.663-6.94-21.36-125.444-29.134-143.613-42.335-18.168-13.2-62.182-123.502-84.64-123.502z"></path>
                      </svg>
                    </p>
                  </div>
                  <span class=" tracking-wider border-[1px] border-opacity-25 font-thin  px-2 rounded-md py-1 scale-90">
                    Movie
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Button className="hover:bg-red-500">Watch Later</Button>
                  <Button>+</Button>
                </div>
                <div className="text-xs px-2"></div>
              </div>
            </div>
            <div className="flex flex-col gap-1 border rounded-xl shadow-xl">
              <img
                src={`${baseURL}${movie?.poster_path}`}
                class="object-cover rounded-xl w-full max-h-64 -z-10"
                alt=""
              />
              <div className="flex flex-col gap-1 p-1">
                <div>The Beekeeper</div>
                <div class="flex items-center justify-between text-xs">
                  <div class="flex  items-center gap-2">
                    <p class="text-_light_white max-md:text-xxs font-normal ">
                      2024
                    </p>
                    <p class="flex gap-1 max-md:text-xxs  text-_light_white items-center">
                      <span>5.8</span>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        class="text-yellow-500 mb-[1px]"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M256 38.013c-22.458 0-66.472 110.3-84.64 123.502-18.17 13.2-136.674 20.975-143.614 42.334-6.94 21.358 84.362 97.303 91.302 118.662 6.94 21.36-22.286 136.465-4.116 149.665 18.17 13.2 118.61-50.164 141.068-50.164 22.458 0 122.9 63.365 141.068 50.164 18.17-13.2-11.056-128.306-4.116-149.665 6.94-21.36 98.242-97.304 91.302-118.663-6.94-21.36-125.444-29.134-143.613-42.335-18.168-13.2-62.182-123.502-84.64-123.502z"></path>
                      </svg>
                    </p>
                  </div>
                  <span class=" tracking-wider border-[1px] border-opacity-25 font-thin  px-2 rounded-md py-1 scale-90">
                    Movie
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Button className="hover:bg-red-500">Watch Later</Button>
                  <Button>+</Button>
                </div>
                <div className="text-xs px-2"></div>
              </div>
            </div>
          </div>
        </section>

        <section class="mt-9">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-gray-700 text-base dark:text-white">
              Similar Movies
            </span>
            <div class="flex items-center space-x-2 fill-gray-500">
              <svg
                class="h-7 w-7 rounded-full border p-1 hover:border-red-600 hover:fill-red-600 dark:fill-white dark:hover:fill-red-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293L7.58 12l5.7 5.7 1.41-1.42 -4.3-4.3 4.29-4.293Z"></path>
              </svg>
              <svg
                class="h-7 w-7 rounded-full border p-1 hover:border-red-600 hover:fill-red-600 dark:fill-white dark:hover:fill-red-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M10.7 17.707l5.7-5.71 -5.71-5.707L9.27 7.7l4.29 4.293 -4.3 4.29Z"></path>
              </svg>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-y-5 sm:grid-cols-3 gap-x-5 ">
            <div class="flex flex-col rounded-xl overflow-hidden aspect-square border dark:border-zinc-600">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg"
                class=" h-4/5 object-cover w-full  "
                alt=""
              />
              <div class="w-full h-1/5 bg-white dark:bg-zinc-800 dark:text-white px-3 flex items-center justify-between border-t-2 border-t-red-600">
                <span class="capitalize  font-medium truncate">Tenet</span>
                <div class="flex space-x-2 items-center text-xs">
                  <svg
                    class="w-8 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="32"
                    viewBox="0 0 64 32"
                    version="1.1"
                  >
                    <g fill="#F5C518">
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="4"
                      ></rect>
                    </g>
                    <g
                      transform="translate(8.000000, 7.000000)"
                      fill="#000000"
                      fill-rule="nonzero"
                    >
                      <polygon points="0 18 5 18 5 0 0 0"></polygon>
                      <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path>
                      <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path>
                      <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path>
                    </g>
                  </svg>
                  <span>7.4</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col rounded-xl overflow-hidden aspect-square border dark:border-zinc-600">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg"
                class=" h-4/5 object-cover w-full  "
                alt=""
              />
              <div class="w-full h-1/5 bg-white dark:bg-zinc-800 dark:text-white px-3 flex items-center justify-between border-t-2 border-t-red-600">
                <span class="capitalize  font-medium truncate">Fight Club</span>
                <div class="flex space-x-2 items-center text-xs">
                  <svg
                    class="w-8 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="32"
                    viewBox="0 0 64 32"
                    version="1.1"
                  >
                    <g fill="#F5C518">
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="4"
                      ></rect>
                    </g>
                    <g
                      transform="translate(8.000000, 7.000000)"
                      fill="#000000"
                      fill-rule="nonzero"
                    >
                      <polygon points="0 18 5 18 5 0 0 0"></polygon>
                      <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path>
                      <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path>
                      <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path>
                    </g>
                  </svg>
                  <span>8.8</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col rounded-xl overflow-hidden aspect-square border dark:border-zinc-600">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg"
                class=" h-4/5 object-cover w-full  "
                alt=""
              />
              <div class="w-full h-1/5 bg-white dark:bg-zinc-800 dark:text-white px-3 flex items-center justify-between border-t-2 border-t-red-600">
                <span class="capitalize  font-medium truncate">Dune</span>
                <div class="flex space-x-2 items-center text-xs">
                  <svg
                    class="w-8 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="32"
                    viewBox="0 0 64 32"
                    version="1.1"
                  >
                    <g fill="#F5C518">
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="4"
                      ></rect>
                    </g>
                    <g
                      transform="translate(8.000000, 7.000000)"
                      fill="#000000"
                      fill-rule="nonzero"
                    >
                      <polygon points="0 18 5 18 5 0 0 0"></polygon>
                      <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path>
                      <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path>
                      <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path>
                    </g>
                  </svg>
                  <span>8.1</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
