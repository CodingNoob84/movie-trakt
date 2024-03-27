"use server";

import { db } from "@/lib/db";
import {
  getMovieDetailfromTmdb,
  getTrendingMovies,
  getTrendingTvshows,
} from "./tmdb";
import { getGenresString } from "@/data/genres";

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
  console.log("userid", userId);
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

export const getMovieDetails = async ({ tmdbId, userId }) => {
  //console.log(tmdbId, userId);
  let movie = await db.movie.findFirst({
    where: { tmdbId },
  });

  if (!movie) {
    const result = await getMovieDetailfromTmdb(tmdbId);
    return result;
  }
  const watchdata = await db.watchlist.findFirst({
    where: {
      userId,
      tmdbId,
    },
  });
  return { ...movie, ...watchdata };
};

export const getAllUsers = async () => {
  const AllUsers = db.User.findMany();
  return AllUsers;
};

export const getAllUsersWithFollowingStatus = async (currentUserId) => {
  // Fetch all users except the current user
  const users = await db.user.findMany({
    where: {
      NOT: {
        id: currentUserId, // Exclude the current user from the result set
      },
    },
    include: {
      followers: {
        select: { followerId: true },
      },
    },
  });

  // Initialize arrays to hold following and nonFollowing users
  let following = [];
  let nonFollowing = [];

  // Iterate over users to categorize them as following or nonFollowing
  users.forEach((user) => {
    const isFollowing = user.followers.some(
      (follower) => follower.followerId === currentUserId
    );
    const userWithoutFollowers = { ...user };
    delete userWithoutFollowers.followers; // Optionally remove the followers field

    if (isFollowing) {
      following.push(userWithoutFollowers);
    } else {
      nonFollowing.push(userWithoutFollowers);
    }
  });

  return { following, nonFollowing };
};

export const toggleFollow = async (followerId, followingId) => {
  try {
    // Check if the follow relationship already exists
    const existingFollow = await db.following.findUnique({
      where: {
        followerId_followingId: {
          followerId: followerId,
          followingId: followingId,
        },
      },
    });

    if (existingFollow) {
      // If it exists, delete the follow relationship
      await db.following.delete({
        where: {
          followerId_followingId: {
            followerId: followerId,
            followingId: followingId,
          },
        },
      });
      return {
        status: "success",
        message: "Successfully unfollowed the user.",
      };
    } else {
      // If it does not exist, create the follow relationship
      await db.following.create({
        data: {
          followerId: followerId,
          followingId: followingId,
        },
      });
      return { status: "success", message: "Successfully followed the user." };
    }
  } catch (error) {
    console.error("Toggle follow failed:", error);
    return {
      status: "failure",
      message: "Failed to toggle the follow status due to an unexpected error.",
    };
  }
};

export const getTrendingToDb = async (type) => {
  let results = []; // Declare results outside the if-else blocks

  if (type === "movie") {
    const response = await getTrendingMovies();
    results = response.results;
  } else {
    const response = await getTrendingTvshows();
    results = response.results;
  }

  for (const movie of results.filter((movie) => movie.media_type === type)) {
    // Ensure media type is "movie"
    await db.trending.upsert({
      where: {
        tmdbId: movie.id, // Use tmdbId as the unique identifier
      },
      update: {
        // Fields to update if the movie exists
        mediaType: movie.media_type,
        title: movie.title || movie.name,
        releaseDate: movie.release_date || movie.first_air_date,
        tmdbRating: movie.vote_average,
        genres: getGenresString(movie.genre_ids.join(","), movie.media_type),
        overview: movie.overview,
        posterImage: movie.poster_path,
        backdropImage: movie.backdrop_path,
      },
      create: {
        // Data to insert if the movie doesn't exist
        tmdbId: movie.id,
        mediaType: movie.media_type,
        title: movie.title || movie.name,
        releaseDate: movie.release_date || movie.first_air_date,
        tmdbRating: movie.vote_average,
        genres: getGenresString(movie.genre_ids.join(","), movie.media_type),
        overview: movie.overview,
        posterImage: movie.poster_path,
        backdropImage: movie.backdrop_path,
      },
    });
    //console.log(`Processed: ${movie.title}`);
  }

  return { success: true };
};

export const getCountAndLastUpdatedTime = async (type) => {
  try {
    // Get the count of movies
    const moviesCount = await db.trending.count({
      where: {
        mediaType: type,
      },
    });

    // Get the most recent updatedAt timestamp for movies
    const lastUpdatedMovie = await db.trending.findFirst({
      where: {
        mediaType: type,
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        updatedAt: true,
      },
    });

    // If there's no movie data available, handle it accordingly
    if (!lastUpdatedMovie) {
      return { success: false, message: "No movie data available." };
    }

    return {
      success: true,
      count: moviesCount,
      lastUpdated: lastUpdatedMovie.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching movie count and last updated time:", error);
    return {
      success: false,
      message: "Failed to fetch movie count and last updated time.",
    };
  }
};

export const getTrendingDB = async (type) => {
  //console.log("type", type);
  const result = await db.trending.findMany({
    where: {
      mediaType: type,
    },
    select: {
      id: true,
      tmdbId: true,
      mediaType: true,
      title: true,
      releaseDate: true,
      tmdbRating: true,
      genres: true,
      overview: true,
      posterImage: true,
      backdropImage: true,
      // Ensure all other fields you want to include are listed here
      // Notice the absence of createdAt and updatedAt, which means they will not be included
    },
  });

  //console.log(result);
  return result;
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
export const getTrendingAllDB = async () => {
  //console.log("type", type);
  const result = await db.trending.findMany({
    select: {
      id: true,
      tmdbId: true,
      mediaType: true,
      title: true,
      releaseDate: true,
      tmdbRating: true,
      genres: true,
      overview: true,
      posterImage: true,
      backdropImage: true,
      // Ensure all other fields you want to include are listed here
      // Notice the absence of createdAt and updatedAt, which means they will not be included
    },
  });

  //console.log(result);
  return shuffle(result);
};
