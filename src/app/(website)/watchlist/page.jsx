import { ListTabs } from "@/components/watchlist/listtabs";

export default function WatchListPage() {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-row justify-between">
        <div className="text-2xl font-bold">WatchList</div>
        <div>View</div>
      </div>
      <ListTabs />
    </div>
  );
}
