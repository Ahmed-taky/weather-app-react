export default async function handler(req, res) {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ message: "Server is missing WEATHER_API_KEY" });
  }

  const q = (Array.isArray(req.query.q) ? req.query.q[0] : req.query.q)?.trim();
  if (!q) {
    return res.status(400).json({ message: "Query parameter 'q' is required" });
  }
  if (q.length < 2) return res.status(200).json([]);

  const base = "https://api.weatherapi.com/v1";

  try {
    const upstream = await fetch(
      `${base}/search.json?key=${apiKey}&q=${encodeURIComponent(q)}`,
    );
    const found = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        message: found?.error?.message ?? "Weather provider error",
        code: found?.error?.code,
      });
    }

    // One current-weather request per city (max 5). allSettled = one failure won't break the rest.
    const settled = await Promise.allSettled(
      found.slice(0, 5).map(async (city) => {
        const r = await fetch(
          `${base}/current.json?key=${apiKey}&q=${city.lat},${city.lon}`,
        );
        if (!r.ok) throw new Error("current failed");
        const { current } = await r.json();

        return {
          id: city.id ?? `${city.lat},${city.lon}`,
          name: city.name,
          region: city.region,
          country: city.country,
          lat: city.lat,
          lon: city.lon,
          temp_c: Math.round(current.temp_c),
          temp_f: Math.round(current.temp_f),
          code: current.condition.code,
          text: current.condition.text,
          is_day: current.is_day,
        };
      }),
    );

    const results = settled
      .filter((s) => s.status === "fulfilled")
      .map((s) => s.value);

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
    return res.status(200).json(results);
  } catch {
    return res
      .status(502)
      .json({ message: "Could not reach the weather service" });
  }
}
