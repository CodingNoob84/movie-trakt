"use client";
import {
  ComingSoonIcon,
  FriendsIcon,
  HomeIcon,
  LogOutIcon,
  MoviesIcon,
  ProfileIcon,
  SettingsIcon,
  TvShowIcon,
} from "@/lib/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SIDEBAR_ITEMS = [
  {
    label: "Menu",
    items: [
      {
        label: "Home",
        link: "/",
        icon: <HomeIcon />,
      },
      {
        label: "Movies",
        link: "/movies",
        icon: <MoviesIcon />,
      },
      {
        label: "Tv Shows",
        link: "/tvshows",
        icon: <TvShowIcon />,
      },
      {
        label: "Coming Soon",
        link: "/upcoming",
        icon: <ComingSoonIcon />,
      },
    ],
  },
  {
    label: "Social",
    items: [
      {
        label: "Profile",
        link: "/profile",
        icon: <ProfileIcon />,
      },
      {
        label: "Friends",
        link: "/friends",
        icon: <FriendsIcon />,
      },
      {
        label: "History",
        link: "/watchhistory",
        icon: <TvShowIcon />,
      },
    ],
  },
  {
    label: "General",
    items: [
      {
        label: "Settings",
        link: "/settings",
        icon: <SettingsIcon />,
      },
      {
        label: "Friends",
        link: "/movie",
        icon: <LogOutIcon />,
      },
    ],
  },
];

export const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="hidden lg:flex flex-col w-1/6">
      <div className="mt-12 mb-24 flex flex-col gap-y-4 text-gray-200 fill-gray-500 text-sm">
        {SIDEBAR_ITEMS.map((menu, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="text-gray-300/70  font-medium uppercase">
              {menu.label}
            </div>
            {menu.items.map((submenu, j) => (
              <Link
                key={j}
                className={`flex items-center space-x-2 py-1 dark:text-white hover:text-red-600  font-semibold hover:border-r-4 hover:border-r-red-600 hover:font-semibold  ${
                  pathname === submenu.link && "border-r-4 border-r-red-600"
                }  pr-20`}
                href={submenu.link}
              >
                {submenu.icon}
                <span>{submenu.label}</span>
              </Link>
            ))}
          </div>
        ))}

        {/* <a className=" flex items-center space-x-2 py-1 mt-4" href="#">
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer"
            />
            <label
              for="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <label for="toggle" className="">
            Dark Theme
          </label>
        </a> */}
      </div>
    </div>
  );
};
