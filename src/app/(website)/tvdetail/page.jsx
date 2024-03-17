import { MoviesRow } from "@/components/home/moviesrow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
const baseURL = "https://image.tmdb.org/t/p/w500";

const tvDetail = {
  adult: false,
  backdrop_path: "/rIe3PnM6S7IBUmvNwDkBMX0i9EZ.jpg",
  created_by: [
    {
      id: 9813,
      credit_id: "5256c8c219c2956ff604858a",
      name: "David Benioff",
      gender: 2,
      profile_path: "/xvNN5huL0X8yJ7h3IZfGG4O2zBD.jpg",
    },
    {
      id: 228068,
      credit_id: "552e611e9251413fea000901",
      name: "D.B. Weiss",
      gender: 2,
      profile_path: "/2RMejaT793U9KRk2IEbFfteQntE.jpg",
    },
  ],
  episode_run_time: [],
  first_air_date: "2011-04-17",
  genres: [
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10759,
      name: "Action & Adventure",
    },
  ],
  homepage: "http://www.hbo.com/game-of-thrones",
  id: 1399,
  in_production: false,
  languages: ["en"],
  last_air_date: "2019-05-19",
  last_episode_to_air: {
    id: 1551830,
    name: "The Iron Throne",
    overview:
      "In the aftermath of the devastating attack on King's Landing, Daenerys must face the survivors.",
    vote_average: 4.668,
    vote_count: 283,
    air_date: "2019-05-19",
    episode_number: 6,
    episode_type: "finale",
    production_code: "806",
    runtime: 80,
    season_number: 8,
    show_id: 1399,
    still_path: "/zBi2O5EJfgTS6Ae0HdAYLm9o2nf.jpg",
  },
  name: "Game of Thrones",
  next_episode_to_air: null,
  networks: [
    {
      id: 49,
      logo_path: "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
      name: "HBO",
      origin_country: "US",
    },
  ],
  number_of_episodes: 73,
  number_of_seasons: 8,
  origin_country: ["US"],
  original_language: "en",
  original_name: "Game of Thrones",
  overview:
    "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
  popularity: 854.81,
  poster_path: "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
  production_companies: [
    {
      id: 76043,
      logo_path: "/9RO2vbQ67otPrBLXCaC8UMp3Qat.png",
      name: "Revolution Sun Studios",
      origin_country: "US",
    },
    {
      id: 12525,
      logo_path: null,
      name: "Television 360",
      origin_country: "",
    },
    {
      id: 5820,
      logo_path: null,
      name: "Generator Entertainment",
      origin_country: "GB",
    },
    {
      id: 12526,
      logo_path: null,
      name: "Bighead Littlehead",
      origin_country: "US",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "GB",
      name: "United Kingdom",
    },
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  seasons: [
    {
      air_date: "2010-12-05",
      episode_count: 269,
      id: 3627,
      name: "Specials",
      overview: "",
      poster_path: "/aos6lC1JGYt6ZRL85lgstNsfSeY.jpg",
      season_number: 0,
      vote_average: 0,
    },
    {
      air_date: "2011-04-18",
      episode_count: 10,
      id: 3624,
      name: "Season 1",
      overview:
        "Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring.",
      poster_path: "/wgfKiqzuMrFIkU1M68DDDY8kGC1.jpg",
      season_number: 1,
      vote_average: 8.3,
    },
    {
      air_date: "2012-03-31",
      episode_count: 10,
      id: 3625,
      name: "Season 2",
      overview:
        "The cold winds of winter are rising in Westeros...war is coming...and five kings continue their savage quest for control of the all-powerful Iron Throne. With winter fast approaching, the coveted Iron Throne is occupied by the cruel Joffrey, counseled by his conniving mother Cersei and uncle Tyrion. But the Lannister hold on the Throne is under assault on many fronts. Meanwhile, a new leader is rising among the wildings outside the Great Wall, adding new perils for Jon Snow and the order of the Night's Watch.",
      poster_path: "/9xfNkPwDOqyeUvfNhs1XlWA0esP.jpg",
      season_number: 2,
      vote_average: 8.2,
    },
    {
      air_date: "2013-03-31",
      episode_count: 10,
      id: 3626,
      name: "Season 3",
      overview:
        "Duplicity and treachery...nobility and honor...conquest and triumph...and, of course, dragons. In Season 3, family and loyalty are the overarching themes as many critical storylines from the first two seasons come to a brutal head. Meanwhile, the Lannisters maintain their hold on King's Landing, though stirrings in the North threaten to alter the balance of power; Robb Stark, King of the North, faces a major calamity as he tries to build on his victories; a massive army of wildlings led by Mance Rayder march for the Wall; and Daenerys Targaryen--reunited with her dragons--attempts to raise an army in her quest for the Iron Throne.",
      poster_path: "/5MkZjRnCKiIGn3bkXrXfndEzqOU.jpg",
      season_number: 3,
      vote_average: 8.2,
    },
    {
      air_date: "2014-04-06",
      episode_count: 10,
      id: 3628,
      name: "Season 4",
      overview:
        "The War of the Five Kings is drawing to a close, but new intrigues and plots are in motion, and the surviving factions must contend with enemies not only outside their ranks, but within.",
      poster_path: "/jXIMScXE4J4EVHUba1JgxZnWbo4.jpg",
      season_number: 4,
      vote_average: 8.4,
    },
    {
      air_date: "2015-04-12",
      episode_count: 10,
      id: 62090,
      name: "Season 5",
      overview:
        "The War of the Five Kings, once thought to be drawing to a close, is instead entering a new and more chaotic phase. Westeros is on the brink of collapse, and many are seizing what they can while the realm implodes, like a corpse making a feast for crows.",
      poster_path: "/7Q1Hy1AHxAzA2lsmzEMBvuWTX0x.jpg",
      season_number: 5,
      vote_average: 8.2,
    },
    {
      air_date: "2016-04-24",
      episode_count: 10,
      id: 71881,
      name: "Season 6",
      overview:
        "Following the shocking developments at the conclusion of season five, survivors from all parts of Westeros and Essos regroup to press forward, inexorably, towards their uncertain individual fates. Familiar faces will forge new alliances to bolster their strategic chances at survival, while new characters will emerge to challenge the balance of power in the east, west, north and south.",
      poster_path: "/p1udLh0gfqyZFmXBGa393gk8go5.jpg",
      season_number: 6,
      vote_average: 8.3,
    },
    {
      air_date: "2017-07-16",
      episode_count: 7,
      id: 81266,
      name: "Season 7",
      overview:
        "The long winter is here. And with it comes a convergence of armies and attitudes that have been brewing for years.",
      poster_path: "/oX51n32QyHeFP5kErksemJsJljL.jpg",
      season_number: 7,
      vote_average: 8.1,
    },
    {
      air_date: "2019-04-14",
      episode_count: 6,
      id: 107971,
      name: "Season 8",
      overview:
        "The Great War has come, the Wall has fallen and the Night King's army of the dead marches towards Westeros. The end is here, but who will take the Iron Throne?",
      poster_path: "/259Q5FuaD3TNB7DGauTaJVRC8XV.jpg",
      season_number: 8,
      vote_average: 6.4,
    },
  ],
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
  ],
  status: "Ended",
  tagline: "Winter Is Coming",
  type: "Scripted",
  vote_average: 8.446,
  vote_count: 22806,
};

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

export default function TvDetailPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <div className="relative">
          <img
            alt="Dune: Part Two"
            height="400"
            className=" w-full h-[400px] select-none object-top"
            src={`${baseURL}${tvDetail.backdrop_path}`}
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
                  src={`${baseURL}${tvDetail.poster_path}`}
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
                src={`${baseURL}${tvDetail.poster_path}`}
                style={{ color: "transparent", objectFit: "cover" }}
                //style="color: transparent; object-fit: cover;"
              />
            </div>
            <section className="pl-72 lg:bg-black  max-md:justify-center  max-md:pl-0 max-md:flex-col   max-md:pt-44 h-[200px] max-md:h-full py-6 flex justify-between">
              <div className="">
                <h2 className="text-4xl max-md:text-center font-bold tracking-wide">
                  {tvDetail.original_name}
                </h2>
                <div className="mt-4  max-md:flex max-md:justify-center max-md:flex-wrap">
                  <div className="flex gap-3 flex-wrap">
                    {tvDetail.genres.map((genre) => (
                      <Badge key={genre.id} variant="secondary">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-3 pl-1 flex max-md:flex-wrap max-md:justify-center items-center gap-2">
                  <span className="text-_welcometext_lightblue font-Inter text-[13px]">
                    {tvDetail.status}
                  </span>
                  <div className="bg-_white w-1 h-1 rounded-full mx-1 "></div>
                  <span className="text-_welcometext_lightblue font-Inter text-[13px]">
                    {tvDetail.first_air_date}
                  </span>
                  <div className="bg-_white w-1 h-1 rounded-full mx-1"></div>
                  <div className="flex items-center gap-2 ">
                    <span className="text-_welcometext_lightblue text-xs">
                      {Number(tvDetail.vote_average).toFixed(1)}
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
                {tvDetail.overview}
              </p>
            </section>
          </div>
        </section>
        <section className="flex flex-col gap-5 px-4">
          <div>Seasons</div>
          <div className="flex fex-row flex-wrap gap-4">
            {tvDetail.seasons.map((season, i) => (
              <div
                key={i}
                className="flex flex-col w-[160px] gap-1 border rounded-xl shadow-xl"
              >
                <Link href="/detail" className="">
                  <div className="overflow-hidden rounded-xl w-full max-h-64">
                    <img
                      src={`${baseURL}${season?.poster_path}`}
                      className="object-cover transition-transform duration-300 hover:scale-125 cursor-pointer w-full h-full"
                      alt=""
                    />
                  </div>
                </Link>
                <div className="flex flex-col gap-1 p-1 lg:p-2">
                  <div className="flex items-center justify-between">
                    <div className="truncate text-md font-bold">
                      {season?.name}
                    </div>
                    <span className="flex gap-1 items-center text-xs">
                      <span>{`0/${season.episode_count}`}</span>
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

      <MoviesRow />
    </div>
  );
}
