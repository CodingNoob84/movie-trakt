"use client";
import { getUser } from "@/services/serveractions";

import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

export const UserCard = ({ userId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user", { userId: userId }],
    queryFn: () => getUser({ userId: userId }),
  });

  //console.log(data);

  return (
    <div className="my-5 border rounded-md p-5">
      {!isLoading && (
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
        </div>
      )}
    </div>
  );
};
