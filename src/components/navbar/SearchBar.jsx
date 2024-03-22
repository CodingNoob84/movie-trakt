"use client";
import { SearchIcon } from "@/lib/icons";
import { usePathname, useRouter } from "next/navigation"; // Make sure to import 'next/router' not 'next/navigation'
import React, { useState, useEffect } from "react";

export const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(""); // Store input value in state

  // Clear the input field when the route changes
  useEffect(() => {
    if (router.pathname !== "/search") {
      setSearchValue(""); // Clear the search input
    }
  }, [pathname]);

  const handleSearch = () => {
    console.log(searchValue); // Log the search value
    router.push(`/search?query=${searchValue}`);
    setSearchValue(""); // Optional: Clear search input after search
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="border-[0.4px] w-[150px] md:flex border-opacity-20 px-3 py-4 border-light-white flex items-center font-light gap-3 text-light-white rounded-2xl h-7 transition-all duration-300 ease-in-out hover:w-[300px]">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search Everything"
        value={searchValue} // Bind input value to state
        onChange={(e) => setSearchValue(e.target.value)} // Update state on input change
        className="bg-transparent focus:outline-none text-white placeholder-white text-xs"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
