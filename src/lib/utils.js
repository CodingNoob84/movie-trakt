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

export const getIds = (data) => {
  return data.map((item) => item.tmdbId);
};

export const convertGenresString = (array) => {
  return array;
};

export function getInitials(name) {
  const initials = name
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");
  return initials;
}

export const truncateText = (text, maxWords) => {
  const words = text.split(/\s+/);
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return text;
};
