import Fav from "./Components/fav";
import ForecastHourly from "./Components/Forcasts/ForcastHours";
import ForecastDaily from "./Components/Forcasts/ForcastDays";
import Header from "./Components/Header";
import Search from "./Components/Search/SearchBox";
import WeatherCard from "./Components/weatherCard";
import { useEffect, useState } from "react";
import fetchWeather from "./api/weather";
import getWeatherIcon from "./utils/getWeatherIcon";
import Astro from "./Components/Astro";
function formatHourLabel(timeStr) {
  const d = new Date(timeStr.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return timeStr;
  return d.toLocaleString("en-US", { hour: "numeric", hour12: true });
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
    temp_c: `${Math.round(h.temp_c)}°`,
    temp_f: `${Math.round(h.temp_f)}°`,
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
      tempMax_c: `${Math.round(fd.day.maxtemp_c)}°`,
      tempMin_c: `${Math.round(fd.day.mintemp_c)}°`,
      tempMax_f: `${Math.round(fd.day.maxtemp_f)}°`,
      tempMin_f: `${Math.round(fd.day.mintemp_f)}°`,
      description: fd.day.condition.text,
      predict: `${fd.day.daily_chance_of_rain ?? 0}%`,
    };
  });
}

function App() {
  const [favouritesList, setFavouritesList] = useState(() => {
    const data = localStorage.getItem("favorites");
    if (data) return JSON.parse(data);
    else
      return [
        { id: 1, name: "New York", lat: 40.7128, lon: -74.006 },
        { id: 2, name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
        { id: 3, name: "Chicago", lat: 41.8781, lon: -87.6298 },
      ];
  });
  const [currentCity, setCurrentCity] = useState(() => {
    const data = localStorage.getItem("currentCity");
    if (data) return JSON.parse(data);
    else return { id: 1, name: "New York", lat: 40.7128, lon: -74.006 };
  });
  const [hours, setHours] = useState(
    Array.from({ length: 10 }, () => ({
      time: "12 AM",
      icon: "clouds",
      temp_c: "00",
      temp_f: "00",
      predict: "0%",
    })),
  );
  const [days, setDays] = useState(
    Array.from({ length: 3 }, () => ({
      day: "Mon",
      date: "10 Jan",
      icon: "clouds",
      tempMax_c: "00",
      tempMin_c: "00",
      tempMax_f: "00",
      tempMin_f: "00",
      description: "Loading",
      predict: "0%",
    })),
  );
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
    temp_c: 28,
    feels_c: 30,
    feels_f: 72,
    wind_dir: "N/W",
    temp_f: 74,
  });
  const [unit, setUnit] = useState(() => {
    const data = localStorage.getItem("unit");
    console.log(data);
    if (data) return data;
    return "C";
  });
  const [AstroInfo, setAstroInfo] = useState({
    sunrise: "06:25 AM",
    sunset: "06:25 PM",
    currentTime: new Date(),
    tz_id: "Africa/Cairo",
  });

  const [state, setstate] = useState("idle");
  const [theme, setTheme] = useState(() => {
    let data = localStorage.getItem("theme") ?? "light";
    document.documentElement.dataset.theme = data;
    return data;
  });
  const [retryKey, setRetryKey] = useState(0);
  function updateFavorites() {
    const isFav = favouritesList.some(
      (item) => item.lon === currentCity.lon && item.lat === currentCity.lat,
    );
    let newFav;

    if (isFav) {
      newFav = favouritesList.filter(
        (item) =>
          !(item.lon === currentCity.lon && item.lat === currentCity.lat),
      );
    } else {
      newFav = [...favouritesList, currentCity];
    }
    localStorage.setItem("favorites", JSON.stringify(newFav));

    setFavouritesList(newFav);
  }

  function handleFavoriteSelect(city) {
    localStorage.setItem("currentCity", JSON.stringify(city));
    setCurrentCity(city);
  }

  useEffect(() => {
    if (!currentCity?.name) {
      return;
    }
    let isMounted = true;

    const loadSearch = async () => {
      try {
        setstate("loading");
        const data = await fetchWeather(
          `${currentCity.lat},${currentCity.lon}`,
        );

        if (isMounted) {
          setWeatherCardInfo({
            currentLocation:
              data.location.name +
              " , " +
              data.location.region +
              " , " +
              data.location.country,
            date: new Date(data.location.localtime_epoch * 1000).toLocaleString(
              "en-US",
              {
                timeZone: data.location.tz_id,
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              },
            ),
            temp_c: data.current.temp_c,
            feels_c: data.current.feelslike_c,
            temp_f: data.current.temp_f,
            feels_f: data.current.feelslike_f,
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
          const astro = data?.forecast?.forecastday[0]?.astro;
          if (astro)
            setAstroInfo({
              ...astro,
              tz_id: data.location.tz_id,
              currentTime: data.location.localtime_epoch * 1000,
            });
          setstate("idle");
        }
      } catch (error) {
        console.error("Search failed:", error);
        setstate("error");
        if (isMounted) {
          return;
        }
      }
    };

    loadSearch();

    return () => {
      isMounted = false;
    };
  }, [currentCity, retryKey]);
  return (
    <>
      <Header
        theme={theme}
        unit={unit}
        toggleUnit={() => {
          setUnit((unit) => {
            if (state !== "idle") return;
            let newValue = unit === "C" ? "F" : "C";
            localStorage.setItem("unit", newValue);
            console.log(newValue, unit);
            return newValue;
          });
        }}
        toggleTheme={() => {
          setTheme((c) => {
            const newValue = c === "light" ? "dark" : "light";
            document.documentElement.dataset.theme = newValue;
            localStorage.setItem("theme", newValue);
            return newValue;
          });
        }}
      />
      <main
        className={`app-container ${state === "loading" || state === "error" ? `is-${state}` : ""}`}
      >
        <Search setCurrentCity={setCurrentCity} />
        <Fav cities={favouritesList} handleClick={handleFavoriteSelect} />
        <WeatherCard
          status={state}
          retry={() => {
            setRetryKey((key) => key + 1);
          }}
          unit={unit}
          Data={weatherCardInfo}
          isCurrentSet={Boolean(currentCity?.name)}
          setFavouritesList={updateFavorites}
          refresh={() => {
            if (currentCity?.lon && currentCity.lat) {
              {
                setRetryKey((key) => key + 1);
              }
            }
          }}
          isFav={favouritesList.some(
            (item) =>
              item.lon === currentCity.lon && item.lat === currentCity.lat,
          )}
        />
        <ForecastHourly Hours={hours} unit={unit} />
        <ForecastDaily Days={days} unit={unit} />
        <Astro data={AstroInfo} />
      </main>
    </>
  );
}

export default App;
