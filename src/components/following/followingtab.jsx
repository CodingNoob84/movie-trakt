"use client";
import { getAllUsersWithFollowingStatus } from "@/services/serveractions";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FollowingContainer } from "./followingcontainer";
import { useSession } from "next-auth/react";
import { FollowingCardLoader } from "./followingcard";

export const FollowingTab = () => {
  const { data: session } = useSession();
  const [tab, setTab] = useState("global");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["following"],
    queryFn: () => getAllUsersWithFollowingStatus(session?.user?.id),
  });

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
      {isLoading && (
        <div className="flex flex-col w-full">
          {Array.from({ length: 5 }, (_, i) => (
            <FollowingCardLoader key={i} />
          ))}
        </div>
      )}
      {tab === "following" ? (
        <FollowingContainer
          data={data?.following || []}
          type={"following"}
          refetch={refetch}
        />
      ) : (
        <FollowingContainer
          data={data?.nonFollowing || []}
          type={"global"}
          refetch={refetch}
        />
      )}
      {/* <FollowingContainer data={data} /> */}
    </div>
  );
};
