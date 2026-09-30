export default async function fetchWeather(query) {
  const res = await fetch(`/api/weather?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (!res.ok)
    throw Object.assign(new Error(data.message), { status: res.status });
  return data;
}
