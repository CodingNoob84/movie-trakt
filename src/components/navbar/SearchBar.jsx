"use client";
import { SearchIcon } from "@/lib/icons";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (value) => {
    console.log(value); // Log the search value
    router.push(`/search?query=${value}`); // Uncomment to enable redirection
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };

  return (
    <div className="border-[0.4px] w-[150px] max-md:flex border-opacity-20 px-3 py-4 border-_light_white flex items-center font-light gap-3 text-_light_white rounded-2xl h-7 transition-all duration-300 ease-in-out hover:w-[300px]">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search Everything"
        className="bg-transparent focus:outline-none text-white placeholder-white text-xs" // Adjusted styles for full width
        onKeyDown={handleKeyDown} // Handle key down event
      />
    </div>
  );
};
