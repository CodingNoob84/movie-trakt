"use server";

import { db } from "@/lib/db";

export const addToWatchList = async (data) => {
  const { userId, tmdbId, watchStatus, ...movieDetails } = data;

  // Ensure the movie exists in the Movie model
  let movie = await db.movie.findFirst({
    where: { tmdbId },
  });

  // If the movie doesn't exist, insert it into the Movie model
  if (!movie) {
    movie = await db.movie.create({
      data: {
        tmdbId,
        ...movieDetails,
      },
    });
  }

  // Check if the new watchStatus is "watching" and count current watching entries
  if (watchStatus === "watching") {
    const watchingCount = await db.watchlist.count({
      where: {
        userId: userId,
        watchStatus: "watching",
      },
    });

    // If the count is 5 or more, throw an error or return a specific message
    if (watchingCount >= 5) {
      return { msg: "limitreached" };
    }
  }

  // Try to find an existing watchlist entry for the given user and movie
  let watchlistEntry = await db.watchlist.findFirst({
    where: {
      AND: [{ userId: userId }, { tmdbId: tmdbId }],
    },
  });

  // If the watchlist entry exists, update its watchStatus
  if (watchlistEntry) {
    watchlistEntry = await db.watchlist.update({
      where: {
        id: watchlistEntry.id,
      },
      data: {
        watchStatus: watchStatus,
      },
    });
  } else {
    // If there's no existing entry, create a new one
    watchlistEntry = await db.watchlist.create({
      data: {
        userId,
        tmdbId,
        watchStatus: watchStatus,
      },
    });
  }

  return watchlistEntry;
};

export const removeFromWatchList = async ({ tmdbId, userId }) => {
  const result = await db.watchlist.deleteMany({
    where: {
      userId,
      tmdbId,
    },
  });
  return result;
};

export const getWatchListByUserId = async ({ userId }) => {
  const result = await db.watchlist.findMany({
    where: {
      userId: userId,
      watchStatus: "list",
    },
    include: {
      movie: true,
    },
    orderBy: {
      updatedAt: "desc", // Order by updatedAt in descending order
    },
  });
  return result.map(({ movie, ...rest }) => ({
    ...rest,
    mediaType: movie.mediaType,
    title: movie.title,
    releaseDate: movie.releaseDate,
    tmdbRating: movie.tmdbRating,
    genres: movie.genres,
    overview: movie.overview,
    posterImage: movie.posterImage,
    backdropImage: movie.backdropImage,
  }));
};

export const getWatchHistoryByUserId = async ({ userId }) => {
  const Watchingresult = await db.Watchlist.findMany({
    where: {
      userId: userId,
      watchStatus: "watching",
    },
    include: {
      movie: true,
    },
    orderBy: {
      updatedAt: "desc", // Order by updatedAt in descending order
    },
  });
  const watching = Watchingresult.map(({ movie, ...rest }) => ({
    ...rest,
    mediaType: movie.mediaType,
    title: movie.title,
    releaseDate: movie.releaseDate,
    tmdbRating: movie.tmdbRating,
    genres: movie.genres,
    overview: movie.overview,
    posterImage: movie.posterImage,
    backdropImage: movie.backdropImage,
  }));
  const Watchedresult = await db.Watchlist.findMany({
    where: {
      userId: userId,
      watchStatus: "watched",
    },
    include: {
      movie: true,
    },
    orderBy: {
      updatedAt: "desc", // Order by updatedAt in descending order
    },
  });
  const watched = Watchedresult.map(({ movie, ...rest }) => ({
    ...rest,
    mediaType: movie.mediaType,
    title: movie.title,
    releaseDate: movie.releaseDate,
    tmdbRating: movie.tmdbRating,
    genres: movie.genres,
    overview: movie.overview,
    posterImage: movie.posterImage,
    backdropImage: movie.backdropImage,
  }));
  return { watching, watched };
};

export const getWatchStatus = async ({ userId, tmdbIds }) => {
  const matchingItems = await db.watchlist.findMany({
    where: {
      userId,
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
  //console.log("status", tmdbId);
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

  const result = await db.watchlist.update({
    where: {
      userId_tmdbId: {
        userId,
        tmdbId,
      },
    },
    data: {
      watchStatus,
    },
  });

  return { msg: "success", result };
};

// export const getMovieDetails=async(tmdbId)=>{

// }
