import { HomeBanner } from "@/components/home/homebanner";
import { MoviesRow } from "@/components/home/moviesrow";
import Image from "next/image";

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

export default async function Home() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <HomeBanner />
      <MoviesRow />
      <div className="mt-5 mb-10">
        <div>karthik</div>
      </div>
    </div>
  );
}
