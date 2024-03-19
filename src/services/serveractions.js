"use server";

import { db } from "@/lib/db";

export const addToWatchList = async (data) => {
  const result = await db.Watchlist.create({
    data: data,
  });
  return result;
};

export const removeFromWatchList = async ({ tmdbId, userId }) => {
  const result = await db.Watchlist.deleteMany({
    where: {
      AND: [{ tmdbId: tmdbId }, { userId: userId }],
    },
  });
  return result;
};

export const getWatchListByUserId = async ({ userId }) => {
  const result = await db.Watchlist.findMany({
    where: {
      userId: userId,
    },
  });
  return result;
};

export const getWatchStatusforSearch = async ({ userId, tmdbIds }) => {
  const matchingItems = await prisma.watchlist.findMany({
    where: {
      userId: userId,
      tmdbId: {
        in: tmdbIds,
      },
    },
    select: {
      tmdbId: true,
      watchStatus: true,
    },
  });
  return matchingItems;
};
