import { MoviesDetail } from "@/components/movies/moviesdetail";

export default function MovieDetailPage({ params }) {
  console.log(params);

  return (
    <>
      <MoviesDetail tmdbId={parseInt(params.tmdbId)} />
    </>
  );
}
