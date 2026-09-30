import { useEffect, useState } from "react";
import DropDown from "./searchResults";
import fetchSearch from "../../api/search";
import { SearchIcon } from "../icons/UiIcons";

export default function Search({ setCurrentCity, unit }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const data = await fetchSearch(query);
        setSearchResults(data);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  return (
    <div className="search-container">
      <SearchIcon />
      <input
        type="text"
        placeholder="Enter city name"
        className="search-input"
        value={query}
        onChange={(target) => {
          const value = target.target.value;
          setQuery(value);
        }}
      />
      <DropDown
        unit={unit}
        options={searchResults}
        query={query}
        handleResultSelection={(data) => {
          setCurrentCity({ ...data });
          setSearchResults(null);
          setQuery("");
        }}
      />
    </div>
  );
}
