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
  WatchHistory,
  WatchListIcon,
} from "@/lib/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SIDEBAR_ITEMS = [
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
        label: "Upcoming",
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
        label: "WatchList",
        link: "/watchlist",
        icon: <WatchListIcon />,
      },
      {
        label: "History",
        link: "/watchhistory",
        icon: <WatchHistory />,
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
                className={`flex items-center space-x-2 py-1  hover:text-red-600  font-semibold hover:border-r-4 hover:border-r-red-600 hover:font-semibold  ${
                  pathname === submenu.link
                    ? "text-red-600 border-r-4 border-r-red-600"
                    : "text-white"
                }  pr-20`}
                href={submenu.link}
              >
                {submenu.icon}
                <span>{submenu.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
