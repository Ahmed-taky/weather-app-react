// utils/airQualityInfo.js
// Plain-language content for the "What do these numbers mean?" panel

export const SCALE = [
  { short: "Good", range: "0–50" },
  { short: "Moderate", range: "51–100" },
  { short: "Sensitive", range: "101–150" },
  { short: "Unhealthy", range: "151–200" },
  { short: "Very bad", range: "201–300" },
  { short: "Hazardous", range: "301+" },
];

// Where the marker sits on the 6-segment strip (0–100 %)
export function scalePosition(aqi) {
  const bounds = [0, 50, 100, 150, 200, 300, 500];
  const v = Math.max(0, Math.min(aqi, 500));
  let i = bounds.findIndex((b, idx) => v <= bounds[idx + 1]);
  if (i < 0) i = 5;
  const frac = (v - bounds[i]) / (bounds[i + 1] - bounds[i]);
  return ((i + frac) / 6) * 100;
}

// Keyed by LEVELS[].label
export const LEVEL_ADVICE = {
  Good: "Great day to be outside. Open the windows and enjoy it.",
  Moderate:
    "Fine for most people. If you're unusually sensitive, take it easy on long outdoor efforts.",
  "Unhealthy for sensitive groups":
    "Children, older adults and people with asthma or heart conditions should cut back on long time outdoors.",
  Unhealthy:
    "Limit time outside and skip outdoor exercise. If you have to go out, consider an N95 mask.",
  "Very unhealthy":
    "Stay indoors with windows closed. Use an air purifier if you have one.",
  Hazardous:
    "Stay inside and avoid any physical effort. Follow local health advice.",
};

// Keyed by the same keys as POLLUTANTS
export const POLLUTANT_INFO = {
  pm2_5: {
    emoji: "🌫️",
    name: "Fine dust",
    what: "Tiny particles, about 30 times thinner than a human hair. They slip deep into your lungs and even your blood.",
    source: "Car exhaust, burning, factories, smoke",
  },
  pm10: {
    emoji: "🏜️",
    name: "Coarse dust",
    what: "Larger specks that irritate your nose, throat and eyes.",
    source: "Road dust, sandstorms, construction",
  },
  o3: {
    emoji: "☀️",
    name: "Ground-level ozone",
    what: "A gas formed when sunlight reacts with exhaust fumes. It can make breathing feel tight.",
    source: "Sunny days + traffic",
  },
  no2: {
    emoji: "🚗",
    name: "Traffic fumes",
    what: "A gas that inflames the airways and can make asthma worse.",
    source: "Vehicles and power plants",
  },
  so2: {
    emoji: "🏭",
    name: "Industrial gas",
    what: "A sharp-smelling gas that irritates the lungs and throat.",
    source: "Burning coal and heavy fuel oil",
  },
  co: {
    emoji: "🔥",
    name: "Carbon monoxide",
    what: "An invisible, odourless gas that lowers the oxygen your blood can carry. The big number is normal: it's measured on a bigger scale.",
    source: "Incomplete burning, engines",
  },
};

// Relative to the reference limit used for the bars
export function pollutantStatus(value, limit) {
  const r = value / limit;
  if (r < 0.5) return { label: "Low", tone: "low" };
  if (r < 1) return { label: "Medium", tone: "mid" };
  return { label: "High", tone: "high" };
}
