import { UserCard } from "@/components/following/UserCard";
import { UserWatchTabs } from "@/components/watchhistory/userwatchhistory";

export default function UserPage({ params }) {
  return (
    <div className="w-full">
      <UserCard userId={params.userId} />
      <UserWatchTabs userId={params.userId} />
    </div>
  );
}
