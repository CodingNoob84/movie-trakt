import { HomeBanner } from "@/components/home/homebanner";
import { TrendingMovies } from "@/components/home/trendingmovies";

export default async function Home() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <HomeBanner />
      <TrendingMovies />
      <div className="mt-5 mb-10">
        <div>karthik</div>
      </div>
    </div>
  );
}
