import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getTmDBImage = (image) => {
  if (!image) {
    return "";
  }
  return `https://image.tmdb.org/t/p/w500${image}`;
};
