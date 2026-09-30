const PM25 = [
  [0, 9.0, 0, 50],
  [9.1, 35.4, 51, 100],
  [35.5, 55.4, 101, 150],
  [55.5, 125.4, 151, 200],
  [125.5, 225.4, 201, 300],
  [225.5, 500, 301, 500],
];
const PM10 = [
  [0, 54, 0, 50],
  [55, 154, 51, 100],
  [155, 254, 101, 150],
  [255, 354, 151, 200],
  [355, 424, 201, 300],
  [425, 604, 301, 500],
];

function subIndex(value, table) {
  if (value == null || Number.isNaN(value)) return null;
  const row =
    table.find(([lo, hi]) => value >= lo && value <= hi) ??
    table[table.length - 1];
  const [cLo, cHi, iLo, iHi] = row;
  return Math.round(((iHi - iLo) / (cHi - cLo)) * (value - cLo) + iLo);
}
export const LEVELS = [
  {
    max: 50,
    label: "Good",
    color: "#84b53a",
    text: "Air quality is satisfactory and poses little or no risk.",
  },
  {
    max: 100,
    label: "Moderate",
    color: "#e6b422",
    text: "Acceptable, but sensitive people may notice effects.",
  },
  {
    max: 150,
    label: "Unhealthy for sensitive groups",
    color: "#f08a24",
    text: "Sensitive groups should limit long outdoor activity.",
  },
  {
    max: 200,
    label: "Unhealthy",
    color: "#e5484d",
    text: "Everyone may begin to feel health effects.",
  },
  {
    max: 300,
    label: "Very unhealthy",
    color: "#a855c7",
    text: "Health alert: avoid outdoor activity.",
  },
  {
    max: Infinity,
    label: "Hazardous",
    color: "#8b1e3f",
    text: "Emergency conditions. Stay indoors.",
  },
];

// Reference limit used to scale each bar (µg/m³)
export const POLLUTANTS = [
  { key: "pm2_5", label: "PM2.5", limit: 35 },
  { key: "pm10", label: "PM10", limit: 150 },
  { key: "o3", label: "O₃", limit: 180 },
  { key: "no2", label: "NO₂", limit: 200 },
  { key: "so2", label: "SO₂", limit: 350 },
  { key: "co", label: "CO", limit: 10000 },
];

export function computeAqi(aq) {
  if (!aq) return null;
  const pm25 = subIndex(aq.pm2_5, PM25);
  const pm10 = subIndex(aq.pm10, PM10);
  if (pm25 == null && pm10 == null) return null;
  const useTen = (pm10 ?? -1) > (pm25 ?? -1);
  return {
    value: useTen ? pm10 : pm25,
    primary: useTen ? "PM10" : "PM2.5",
  };
}

export function getAqiLevel(aqi) {
  return LEVELS.find((l) => aqi <= l.max);
}
