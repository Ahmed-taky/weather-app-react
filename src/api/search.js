export default async function fetchSearch(query) {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (!res.ok)
    throw Object.assign(new Error(data.message), { status: res.status });
  return data;
}
