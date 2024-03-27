"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { toggleFollow } from "@/services/serveractions";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

function getInitials(name) {
  const initials = name
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");
  return initials;
}

export const FollowingCard = ({ data, type, refetch }) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  //console.log(data);
  const handleFollow = async () => {
    setLoading(true);
    const result = await toggleFollow(session.user.id, data.id);
    refetch();
    setLoading(false);
    //console.log(result);
  };
  return (
    <div className="w-full border m-2 p-2 rounded-md">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="flex flex-row gap-2">
          <Avatar className="w-24 h-24">
            <AvatarImage src={data.image} alt={data.name} />
            <AvatarFallback>{getInitials(data.name)}</AvatarFallback>
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
              {loading ? "Loading..." : "Un-Follow"}
            </Button>
          ) : (
            <Button className={`text-green-500`} onClick={() => handleFollow()}>
              {loading ? "Loading..." : "Follow"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const FollowingCardLoader = () => {
  return (
    <div className="w-full border m-2 p-2 rounded-md">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="flex flex-row gap-4">
          <Skeleton className="w-24 h-24 rounded-full bg-gray-800" />
          <div className="flex flex-col gap-4 w-3/4">
            <Skeleton className="w-full h-8 bg-gray-800" />
            <Skeleton className="w-full h-8 bg-gray-800" />
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center justify-between">
          <Skeleton className="w-full h-8 bg-gray-800" />
          <Skeleton className="w-full h-8 bg-gray-800" />
        </div>
      </div>
    </div>
  );
};
