"use client";
import {
  getAllUsers,
  getAllUsersWithFollowingStatus,
} from "@/services/serveractions";
import { useAmp } from "next/amp";
import { useState } from "react";
import { FollowingCard } from "./followingcard";
import { useQuery } from "@tanstack/react-query";
import { FollowingContainer } from "./followingcontainer";
import { useSession } from "next-auth/react";

export const FollowingTab = () => {
  const { data: session } = useSession();
  const [tab, setTab] = useState("global");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["global"],
    queryFn: () => getAllUsersWithFollowingStatus(session?.user?.id),
  });
  if (isLoading) {
    return <>Loading...</>;
  }
  //const allusers = await getAllUsers();
  console.log("following", data);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full">Search</div>
      <div className="flex flex-row h-[40px] w-full">
        {["following", "global"].map((type) => (
          <div
            key={type}
            className={`w-full text-center cursor-pointer ${
              tab === type && "border-b-4 border-red-600"
            }`}
            onClick={() => setTab(type)}
          >
            {type === "following" ? "Following" : "Global"}
          </div>
        ))}
      </div>
      {tab === "following" ? (
        <FollowingContainer
          data={data.following}
          type={"following"}
          refetch={refetch}
        />
      ) : (
        <FollowingContainer
          data={data.nonFollowing}
          type={"global"}
          refetch={refetch}
        />
      )}
      {/* <FollowingContainer data={data} /> */}
    </div>
  );
};
