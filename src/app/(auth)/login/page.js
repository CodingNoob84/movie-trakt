//"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleButton } from "./_components/googlebutton";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth();
  //console.log("loginsession", session);
  const isLoggedIn = !!session;
  //console.log("login", isLoggedIn);
  if (isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center m-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <div>Logo</div>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-5">
          <p className="text-sm">Please login with your google account</p>
          <GoogleButton />
        </CardContent>
      </Card>
    </div>
  );
}
