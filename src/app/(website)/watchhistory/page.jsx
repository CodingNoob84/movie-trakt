import { ViewSwitch } from "@/components/common/viewswitch";
import { WatchTabs } from "@/components/watchhistory/watchtabs";

export default function WatchHistoryPage() {
  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex flex-row justify-between">
        <div className="text-2xl font-bold">Watch History</div>
        <div>
          <ViewSwitch />
        </div>
      </div>
      <WatchTabs />
    </div>
  );
}
