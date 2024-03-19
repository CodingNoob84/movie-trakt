import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WatchTabs } from "@/components/watchhistory/watchtabs";
import { RatingIcon } from "@/lib/icons";

export default function WatchHistoryPage() {
  return (
    <div className="w-full">
      <WatchTabs />
    </div>
  );
}
