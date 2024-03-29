//"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleButton } from "./_components/googlebutton";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth();
  const isLoggedIn = !!session;
  if (isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center m-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <div className="flex justify-center items-center ">
            <div className="w-24 h-24">
              <img src="/icons/icon-512x512.png" alt="Logo" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-5">
          <p className="text-sm">Please login with your google account</p>
          <GoogleButton />
        </CardContent>
      </Card>
    </div>
  );
}
