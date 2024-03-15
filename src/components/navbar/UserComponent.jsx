"use client";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AiOutlineLogout } from "react-icons/ai";

export const UserComponent = () => {
  //console.log("hello");
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex flex-row gap-10 text-white text-xs items-center">
      <div className="hidden md:flex flex-col gap-1">
        <div>{session?.user?.name}</div>
        <div>{session?.user?.email}</div>
      </div>
      <Avatar>
        <AvatarImage src={session?.user?.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <AiOutlineLogout
          className="w-8 h-8 cursor-pointer"
          onClick={() => signOut()}
        />
      </div>
    </div>
  );
};
