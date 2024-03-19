import { SearchContainer } from "@/components/search/searchContainer";
import { auth } from "@/lib/auth";
import { searchwithQuery } from "@/services/tmdb";

export default async function SearchPage({ searchParams }) {
  return (
    <div>
      <SearchContainer searchquery={searchParams.query} />
    </div>
  );
}
