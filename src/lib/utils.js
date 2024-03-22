import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getTmDBImage = (image) => {
  if (!image) {
    return "/noposter.PNG";
  }
  return `https://image.tmdb.org/t/p/w500${image}`;
};

export const getYear = (str) => {
  if (!str) {
    return "";
  }
  return str?.split("-")[0];
};

export const getIdsForSearch = (data) => {
  return data.results
    .filter((item) => item.media_type === "movie" || item.media_type === "tv")
    .map((item) => item.id);
};

export const convertGenresString = (array) => {
  return array;
};
