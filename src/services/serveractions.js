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
      watchStatus: "list",
    },
  });
  return result;
};

export const getWatchHistoryByUserId = async ({ userId }) => {
  console.log(userId);
  const watching = await db.Watchlist.findMany({
    where: {
      userId: userId,
      watchStatus: "watching",
    },
  });
  const watched = await db.Watchlist.findMany({
    where: {
      userId: userId,
      watchStatus: "watched",
    },
  });
  return { watching, watched };
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

export const updateWatchStatus = async ({ userId, tmdbId, watchStatus }) => {
  const result = await db.Watchlist.updateMany({
    where: {
      AND: [{ userId: userId }, { tmdbId: tmdbId }],
    },
    data: {
      watchStatus: watchStatus,
    },
  });
  return result;
};
