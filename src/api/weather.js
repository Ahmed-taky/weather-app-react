export default async function fetchWeather(query) {
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_API_KEY environment variable");
  }

  const result = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(query)}&days=5`,
  );

  if (!result.ok) {
    throw new Error("Failed to fetch search results");
  }

  return result.json();
}
