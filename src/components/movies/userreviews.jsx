"use client";
import { RatingIcon } from "@/lib/icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getWatchedUsers } from "@/services/serveractions";
import { format } from "date-fns";
import { getInitials } from "@/lib/utils";

export const UserReviews = ({ tmdbId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["watchusers", { tmdbId: tmdbId }],
    queryFn: () =>
      getWatchedUsers({
        tmdbId: tmdbId,
      }),
  });
  if (isLoading) {
    return null;
  }
  console.log(data);
  return (
    <div className="flex flex-col gap-5 my-5 mx-2">
      {data?.map((user, i) => (
        <div key={i} className="flex flex-row justify-between">
          <div className="flex flex-row gap-1">
            <Avatar>
              <AvatarImage src={user.image} alt={user.name}></AvatarImage>
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="font-bold text-md">{user.name}</div>
              {user?.watchStatus == "watched" ? (
                <div className="text-xs">
                  watched on {format(user.watchDateTime, "do MMM yyyy")}
                </div>
              ) : (
                <div className="text-xs">watching now</div>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-1 items-center">
            {user.rating ? (
              <>
                {user.rating}
                <RatingIcon className={"text-yellow-500"} />
              </>
            ) : (
              "NA"
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
