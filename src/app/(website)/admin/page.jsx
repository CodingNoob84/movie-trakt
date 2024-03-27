import { TrendingUpdateCard } from "@/components/admin/trendingcard";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-5">
      <TrendingUpdateCard type={"movie"} />
      <TrendingUpdateCard type={"tv"} />
    </div>
  );
}
