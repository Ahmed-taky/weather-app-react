export default async function fetchSearch(query) {
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    return [];
  }

  const result = await fetch(
    `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(query)}`,
  );

  if (!result.ok) {
    throw new Error("Failed to fetch search results");
  }

  return result.json();
}
