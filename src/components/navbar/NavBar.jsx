import { LogoIcon } from "@/lib/icons";
import { SearchBar } from "./SearchBar";
import { UserComponent } from "./UserComponent";
import { SideBarMobile } from "./SideBarMobile";

export const NavBar = () => {
  return (
    <>
      <div className="fixed z-50 top-16 left-16 right-16 bottom-16 pointer-events-none"></div>
      <div className="z-50 fixed bg-transparent inset-x-0 h-20 top-0 max-md:pl-0">
        <section className="backdrop-blur-md h-full flex items-center w-full px-5 md:px-20">
          <div className=" font-bold text-lg flex items-center gap-x-1 w-1/4">
            <div className="flex md:hidden text-white h-full">
              <SideBarMobile />
            </div>
            <LogoIcon />
            <div className="tracking-wide hidden md:block dark:text-white">
              MovieTrakt<span className="text-red-600">.</span>
            </div>
          </div>
          <div className="w-3/4 flex flex-row items-center">
            <SearchBar />

            <section className="w-full flex justify-end ">
              <UserComponent />
            </section>
          </div>
        </section>
      </div>
    </>
  );
};
