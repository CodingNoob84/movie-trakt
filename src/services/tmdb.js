import { fetchData } from "./common";

const BaseTmdbUrl = process.env.NEXT_PUBLIC_TMDB_APIURL;

export const searchwithQuery = async (query) => {
  if (!query) return;
  const url = `${BaseTmdbUrl}/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;
  return await fetchData(url);
};
