// Maps WeatherAPI.com condition `code` + `is_day` to a WeatherIcon `name`.
// Covers all 60 codes (1000-1282). Falls back to "clouds" for unknown codes.
const MIST = new Set([
  1012, 1015, 1018, 1021, 1024, 1027, 1030, 1033, 1036, 1039, 1042, 1045,
  1048, 1135, 1147,
]);
const DRIZZLE = new Set([1072, 1150, 1153, 1168, 1171]);
const RAIN = new Set([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201]);
const SHOWER = new Set([1240, 1243, 1246]);
const SLEET = new Set([1069, 1204, 1207, 1237, 1249, 1252, 1261, 1264]);
const SNOW = new Set([
  1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258,
]);
const THUNDER = new Set([1087, 1273, 1276, 1279, 1282]);

function normalizeIsDay(isDay) {
  if (isDay === 1 || isDay === "1" || isDay === true) return true;
  if (isDay === 0 || isDay === "0" || isDay === false) return false;
  return Boolean(isDay);
}

export default function getWeatherIcon(code, isDay = true) {
  const day = normalizeIsDay(isDay);
  const n = Number(code);

  if (n === 1000) return day ? "day-clear" : "night-clear";
  if (n === 1003) return day ? "day-partlyCloudy" : "night-partlyCloudy";
  if (n === 1006 || n === 1009) return "clouds";
  if (MIST.has(n)) return day ? "day-mist" : "night-mist";
  if (DRIZZLE.has(n)) return day ? "day-drizzle" : "night-drizzle";
  if (RAIN.has(n)) return day ? "day-rain" : "night-rain";
  if (SHOWER.has(n)) return day ? "day-shower" : "night-shower";
  if (SLEET.has(n)) return day ? "day-sleet" : "night-sleet";
  if (SNOW.has(n)) return day ? "day-snow" : "night-snow";
  if (THUNDER.has(n)) return day ? "day-thunder" : "night-thunder";

  return "clouds";
}
