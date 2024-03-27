import { TvDetail } from "@/components/movies/tvdetail";

export default function TvDetailPage({ params }) {
  return (
    <div>
      <TvDetail tmdbId={params.tmdbId} />
    </div>
  );
}
