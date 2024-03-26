"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { toggleFollow } from "@/services/serveractions";

export const FollowingCard = ({ data, type, refetch }) => {
  const { data: session } = useSession();
  console.log(data);
  const handleFollow = async () => {
    const result = await toggleFollow(session.user.id, data.id);
    refetch();
    //console.log(result);
  };
  return (
    <div className="w-full border m-2 p-2 rounded-md">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="flex flex-row gap-2">
          <Avatar className="w-24 h-24">
            <AvatarImage src={data.image} />
            <AvatarFallback>DJ</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div>{data.name}</div>
            <div>{data.email}</div>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center justify-between">
          <Button>Watch History</Button>
          {type === "following" ? (
            <Button className={`text-red-500`} onClick={() => handleFollow()}>
              Un-Follow
            </Button>
          ) : (
            <Button className={`text-green-500`} onClick={() => handleFollow()}>
              Follow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
