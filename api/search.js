export default async function handler(req, res) {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ message: "Server is missing WEATHER_API_KEY" });
  }

  const q = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
  if (!q) {
    return res.status(400).json({ message: "Query parameter 'q' is required" });
  }

  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(q)}&days=3`;
    const upstream = await fetch(url);
    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        message: data?.error?.message ?? "Weather provider error",
        code: data?.error?.code,
      });
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
    return res.status(200).json(data);
  } catch {
    return res
      .status(502)
      .json({ message: "Could not reach the weather service" });
  }
}
