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
  return await fetchData(url);
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

export const getMovieDetails = async (tmdbId) => {
  const url = `${BaseTmdbUrl}/3/movie/${tmdbId}?language=en-US`;
  return await fetchData(url);
};
