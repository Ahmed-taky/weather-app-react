import { useEffect, useState } from "react";
import DropDown from "./searchResults";
import fetchSearch from "../../api/search";

export default function Search({ setCurrentCity, unit }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    let isMounted = true;

    const loadSearch = async () => {
      try {
        const data = await fetchSearch(query);
        if (isMounted) {
          setSearchResults(data);
        }
      } catch (error) {
        console.error("Search failed:", error);
        if (isMounted) {
          setSearchResults([]);
        }
      }
    };

    loadSearch();

    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <div className="search-container">
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
// mostly it will be hook
// function debounce(func, wait) {
//   let timeout;
//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// }
