import { NavBar } from "@/components/navbar/NavBar";
import { SideBar } from "@/components/navbar/SideBar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function WebSiteLayout({ children }) {
  const session = await auth();
  const isLoggedIn = !!session;
  if (!isLoggedIn) {
    redirect("/login");
  }
  return (
    <main className="w-full h-full">
      <NavBar />
      <div className="mt-20 lg:mx-20 left-4 lg:left-16 right-4 lg:right-16">
        <div className="flex flex-row">
          <SideBar />
          <div className="flex lg:w-5/6 w-full px-5">{children}</div>
        </div>
      </div>
    </main>
  );
}
