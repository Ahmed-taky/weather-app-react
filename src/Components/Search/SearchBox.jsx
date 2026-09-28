import { useEffect, useState } from "react";
import DropDown from "./searchResults";
import fetchSearch from "../../api/search";

const results = [
  { id: 1, name: "New York", lat: 40.7128, lon: -74.006 },
  { id: 2, name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { id: 3, name: "Chicago", lat: 41.8781, lon: -87.6298 },
];

export default function Search({ setCurrentCity }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (!query) {
      setSearchResults(null);
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
          const value = target.target.value.trim();
          setQuery(value);
          handleSearch(value, setSearchResults);
        }}
      />
      <DropDown
        options={searchResults}
        query={query}
        setCurrentCity={setCurrentCity}
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

function handleSearch(query, setSearchResults) {
  if (query === "") {
    setSearchResults(null);
    return null;
  }
  setSearchResults(results.filter((e) => e.name.startsWith(query)));
}
