import { NavBar } from "@/components/navbar/NavBar";
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
      {children}
    </main>
  );
}
