import { ViewSwitch } from "@/components/common/viewswitch";
import { ListTabs } from "@/components/watchlist/listtabs";

export default function WatchListPage() {
  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex flex-row justify-between">
        <div className="text-2xl font-bold">WatchList</div>
        <div>
          <ViewSwitch />
        </div>
      </div>
      <ListTabs />
    </div>
  );
}
