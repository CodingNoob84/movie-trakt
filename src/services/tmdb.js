import { getGenresString } from "@/data/genres";

const APIKEY = process.env.NEXT_PUBLIC_TMDB_APIKEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${APIKEY}`,
  },
};

export async function fetchData(url) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("fetchData error:", error);
    return null; // or handle the error as needed
  }
}

const BaseTmdbUrl = process.env.NEXT_PUBLIC_TMDB_APIURL;

export const searchwithQuery = async (query) => {
  if (!query) return;
  const url = `${BaseTmdbUrl}/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;
  const data = await fetchData(url);
  //console.log(data);
  const result = data?.results
    .filter(
      (movie) => movie.media_type === "movie" || movie.media_type === "tv"
    ) // This line is optional if you're sure all items are either movies or tv shows
    .map((movie) => ({
      tmdbId: movie.id,
      mediaType: movie.media_type,
      title: movie.title || movie.name, // Use 'title' for movies and 'name' for TV shows
      releaseDate: movie.release_date || movie.first_air_date, // Use 'release_date' for movies and 'first_air_date' for TV shows
      tmdbRating: movie.vote_average,
      genres: getGenresString(movie.genre_ids.join(","), movie.media_type),
      overview: movie.overview,
      posterImage: movie.poster_path,
      backdropImage: movie.backdrop_path,
    }));

  //console.log("result", result);
  return result;
};

export const getTrending = async () => {
  const url = `${BaseTmdbUrl}/3/trending/all/day?language=en-US`;
  return await fetchData(url);
};

export const getTrendingMovies = async () => {
  const url = `${BaseTmdbUrl}/3/trending/movie/day?language=en-US`;
  return await fetchData(url);
};

export const getTrendingTvshows = async () => {
  const url = `${BaseTmdbUrl}/3/trending/tv/day?language=en-US`;
  return await fetchData(url);
};

export const getMovieDetailfromTmdb = async (tmdbId) => {
  const url = `${BaseTmdbUrl}/3/movie/${tmdbId}?language=en-US`;
  return await fetchData(url);
};

export const getMovieRecommendations = async (tmdbId) => {
  const url = `${BaseTmdbUrl}/3/movie/${tmdbId}/recommendations?language=en-US&page=1`;
  return await fetchData(url);
};
