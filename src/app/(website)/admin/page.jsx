import { TrendingUpdateCard } from "@/components/admin/trendingcard";
import { auth } from "@/lib/auth";

export default async function AdminPage() {
  const session = await auth();
  if (session?.user?.role != "admin") {
    return <div className="mx-auto text-red-500">You dont have access</div>;
  }
  return (
    <div className="flex flex-col gap-5">
      <TrendingUpdateCard type={"movie"} />
      <TrendingUpdateCard type={"tv"} />
    </div>
  );
}
