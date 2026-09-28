import Fav from "./Components/fav";
import ForecastHourly from "./Components/Forcasts/ForcastHours";
import ForecastDaily from "./Components/Forcasts/ForcastDays";
import Header from "./Components/Header";
import Search from "./Components/Search/SearchBox";
import WeatherCard from "./Components/weatherCard";
import { useEffect, useState } from "react";
import fetchWeather from "./api/weather";
import getWeatherIcon from "./utils/getWeatherIcon";

function formatHourLabel(timeStr) {
  const d = new Date(timeStr.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return timeStr;
  return d
    .toLocaleString("en-US", { hour: "numeric", hour12: true })
    .replace(" ", " ");
}

function buildHourlyList(data) {
  const allHours = (data?.forecast?.forecastday ?? []).flatMap(
    (fd) => fd.hour ?? [],
  );
  if (allHours.length === 0) return null;

  const epoch =
    data?.current?.last_updated_epoch ?? data?.location?.localtime_epoch;
  let startIndex = 0;
  if (epoch) {
    const idx = allHours.findIndex(
      (h) => Math.abs((h.time_epoch ?? 0) - epoch) < 3600,
    );
    if (idx >= 0) startIndex = idx;
  }
  return allHours.slice(startIndex, startIndex + 24).map((h, i) => ({
    time: i === 0 ? "Now" : formatHourLabel(h.time),
    icon: getWeatherIcon(h?.condition?.code, h?.is_day),
    temp: `${Math.round(h.temp_c)}°`,
    predict: `${h.chance_of_rain ?? 0}%`,
  }));
}

function buildDailyList(data) {
  const days = data?.forecast?.forecastday ?? [];
  if (days.length === 0) return null;
  return days.map((fd) => {
    const d = new Date(`${fd.date}T12:00:00`);
    return {
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      icon: getWeatherIcon(fd?.day?.condition?.code, true),
      tempMax: `${Math.round(fd.day.maxtemp_c)}°`,
      tempMin: `${Math.round(fd.day.mintemp_c)}°`,
      description: fd.day.condition.text,
      predict: `${fd.day.daily_chance_of_rain ?? 0}%`,
    };
  });
}

function App() {
  // المفروض القيمه الابتدائيه هتيجي من اللوكال ستوريدج مثلا او من البخث

  const [favouritesList, setFavouritesList] = useState([
    { id: 1, name: "New York", lat: 40.7128, lon: -74.006 },
    { id: 2, name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
    { id: 3, name: "Chicago", lat: 41.8781, lon: -87.6298 },
  ]);
  const [currentCity, setCurrentCity] = useState({});
  const [hours, setHours] = useState([]);
  const [days, setDays] = useState([]);
  const [weatherCardInfo, setWeatherCardInfo] = useState({
    currentLocation: "Cairo, Egypt",
    date: "Tuesday, May 20, 2025 10:30 AM",
    temp: 28,
    feels: 30,
    description: "Cloudy",
    icon: "clouds",
    humidity: 45,
    wind: 18,
    clouds: 25,
    pressure: 1012,
    visibility: 10,
    lastUpdate: "30 Minutes",
  });
  function updateFavorites() {
    const isFav = favouritesList.some(
      (item) => item.lon === currentCity.lon && item.lat === currentCity.lat,
    );
    if (isFav) {
      setFavouritesList(
        favouritesList.filter(
          (item) =>
            !(item.lon === currentCity.lon && item.lat === currentCity.lat),
        ),
      );
    } else {
      setFavouritesList([...favouritesList, currentCity]);
    }
  }

  function handleFavoriteSelect(city) {
    console.log(city);
    setCurrentCity(city);
  }
  console.log(currentCity);
  useEffect(() => {
    if (!currentCity?.name) {
      return;
    }

    let isMounted = true;

    const loadSearch = async () => {
      try {
        const data = await fetchWeather(
          `${currentCity.lat},${currentCity.lon}`,
        );
        console.log(data);
        if (isMounted) {
          setWeatherCardInfo({
            currentLocation:
              data.location.name +
              " , " +
              data.location.region +
              " , " +
              data.location.country,
            date: new Date(data.location.localtime).toString(),
            temp: data.current.temp_c,
            feels: data.current.feelslike_c,
            description: data.current.condition.text,
            icon: getWeatherIcon(
              data.current.condition.code,
              data.current.is_day,
            ),
            humidity: data.current.humidity,
            wind: data.current.wind_kph,
            wind_dir: data.current.wind_dir,
            clouds: data.current.cloud,
            pressure: data.current.pressure_mb,
            visibility: data.current.vis_km,
            lastUpdate: data.current.last_updated,
          });
          const nextHours = buildHourlyList(data);
          if (nextHours) setHours(nextHours);
          const nextDays = buildDailyList(data);
          if (nextDays) setDays(nextDays);
          console.log(data.current);
        }
      } catch (error) {
        console.error("Search failed:", error);
        if (isMounted) {
          return;
        }
      }
    };

    loadSearch();

    return () => {
      isMounted = false;
    };
  }, [currentCity]);
  return (
    <>
      <Header />
      <main className="app-container">
        <Search setCurrentCity={setCurrentCity} />
        <Fav cities={favouritesList} handleClick={handleFavoriteSelect} />
        <WeatherCard
          Data={weatherCardInfo}
          isCurrentSet={Boolean(currentCity?.name)}
          setFavouritesList={updateFavorites}
          isFav={favouritesList.some(
            (item) =>
              item.lon === currentCity.lon && item.lat === currentCity.lat,
          )}
        />
        <ForecastHourly Hours={hours} />
        <ForecastDaily Days={days} />
      </main>
    </>
  );
}

export default App;
