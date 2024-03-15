import Image from "next/image";

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

export default async function Home() {
  return (
    <div className="w-full h-full p-5 text-white">
      <div className="flex flex-col space-y-2 py-8 md:space-y-4 lg:h-[500px] lg:justify-end lg:pb-12 lg:pl-24">
        <div className="absolute top-0 left-0 h-[400px] w-screen -z-10">
          <Image
            src={`${baseURL}/${movie?.backdrop_path || movie?.poster_path}`}
            alt={movie?.title || movie?.name}
            layout="fill"
            objectfit="cover"
          />
          <div className="absolute w-full h-[400px] bg-gradient-to-r from-black to-transparent bottom-0 z-20" />
          <div className="absolute w-full h-14 bg-gradient-to-t from-[#141414] to-transparent bottom-0 z-20" />
        </div>
        <div className="space-y-5 relative">
          <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          {movie?.vote_average && (
            <div className="flex justify-start gap-8 items-center cursor-pointer">
              {/* <CircularRate value={movie?.vote_average} /> */}
              <p className="bg-red-600 rounded-full px-2.5 py-2.5 text-sm w-20 text-center">
                Action
              </p>
              <p className="bg-red-600 rounded-full px-2.5 py-2.5 text-sm w-20 text-center">
                Drama
              </p>
            </div>
          )}
          <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl line-clamp-5">
            {movie?.overview}
          </p>
          <button className="flex gap-3 bg-red-600 px-2.5 py-2.5 rounded-md items-center">
            {/* <BsPlayFill /> */}
            WATCH NOW
          </button>
        </div>
      </div>
    </div>
  );
}
