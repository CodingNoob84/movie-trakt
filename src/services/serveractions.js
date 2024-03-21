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

export const getWatchStatus = async ({ userId, tmdbIds }) => {
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
  console.log("status", watchStatus);
  if (watchStatus === "watching") {
    // Count how many movies are already set to "watching"
    const watchingCount = await db.Watchlist.count({
      where: {
        userId: userId,
        watchStatus: "watching",
      },
    });

    // If there are already 5 movies set to "watching", prevent the update or handle accordingly
    if (watchingCount >= 5) {
      //console.log("User has reached the limit of 5 movies set to watching.");
      return { msg: "limitreached" }; // Or throw an error or handle this case as needed
    }
  }

  const result = await db.Watchlist.updateMany({
    where: {
      AND: [{ userId: userId }, { tmdbId: tmdbId }],
    },
    data: {
      watchStatus: watchStatus,
    },
  });
  console.log(result);

  return { msg: "sucess", result };
};
