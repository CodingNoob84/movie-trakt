"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
export const GoogleButton = () => {
  const [loader, setLoader] = useState(false);
  return (
    <Button
      className="w-full"
      onClick={() => {
        setLoader(true);
        signIn("google");
      }}
    >
      {loader ? "Loading..." : "Login with Google"}
    </Button>
  );
};
