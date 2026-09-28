import Fav from "./Components/fav";
import ForecastHourly from "./Components/Forcasts/ForcastHours";
import ForecastDaily from "./Components/Forcasts/ForcastDays";
import Header from "./Components/Header";
import Search from "./Components/Search/SearchBox";
import WeatherCard from "./Components/weatherCard";
import { useState } from "react";
const Hours = [
  {
    time: "Now",
    icon: "clouds",
    temp: "28°",
    predict: "0%",
  },
  {
    time: "11 AM",
    icon: "clouds",
    temp: "29°",
    predict: "0%",
  },
  {
    time: "12 PM",
    icon: "clouds",
    temp: "31°",
    predict: "10%",
  },
  {
    time: "1 PM",
    icon: "clouds",
    temp: "31°",
    predict: "20%",
  },
  {
    time: "2 PM",
    icon: "clouds",
    temp: "30°",
    predict: "15%",
  },
  {
    time: "3 PM",
    icon: "clouds",
    temp: "29°",
    predict: "5%",
  },
  {
    time: "Now",
    icon: "clouds",
    temp: "28°",
    predict: "0%",
  },
  {
    time: "11 AM",
    icon: "clouds",
    temp: "29°",
    predict: "0%",
  },
  {
    time: "12 PM",
    icon: "clouds",
    temp: "31°",
    predict: "10%",
  },
  {
    time: "1 PM",
    icon: "clouds",
    temp: "31°",
    predict: "20%",
  },
  {
    time: "2 PM",
    icon: "clouds",
    temp: "30°",
    predict: "15%",
  },
  {
    time: "3 PM",
    icon: "clouds",
    temp: "29°",
    predict: "5%",
  },
  {
    time: "Now",
    icon: "clouds",
    temp: "28°",
    predict: "0%",
  },
  {
    time: "11 AM",
    icon: "clouds",
    temp: "29°",
    predict: "0%",
  },
  {
    time: "12 PM",
    icon: "clouds",
    temp: "31°",
    predict: "10%",
  },
  {
    time: "1 PM",
    icon: "clouds",
    temp: "31°",
    predict: "20%",
  },
  {
    time: "2 PM",
    icon: "clouds",
    temp: "30°",
    predict: "15%",
  },
  {
    time: "3 PM",
    icon: "clouds",
    temp: "29°",
    predict: "5%",
  },
  {
    time: "Now",
    icon: "clouds",
    temp: "28°",
    predict: "0%",
  },
  {
    time: "11 AM",
    icon: "clouds",
    temp: "29°",
    predict: "0%",
  },
  {
    time: "12 PM",
    icon: "clouds",
    temp: "31°",
    predict: "10%",
  },
  {
    time: "1 PM",
    icon: "clouds",
    temp: "31°",
    predict: "20%",
  },
  {
    time: "2 PM",
    icon: "clouds",
    temp: "30°",
    predict: "15%",
  },
  {
    time: "3 PM",
    icon: "clouds",
    temp: "29°",
    predict: "5%",
  },
];
const Days = [
  {
    day: "Mon",
    date: "May 20",
    icon: "clouds",
    tempMax: "30°",
    tempMin: "18°",
    description: "Sunny",
    predict: "0%",
  },
  {
    day: "Tue",
    date: "May 21",
    icon: "clouds",
    tempMax: "32°",
    tempMin: "20°",
    description: "Partly Cloudy",
    predict: "10%",
  },
  {
    day: "Wed",
    date: "May 22",
    icon: "clouds",
    tempMax: "28°",
    tempMin: "17°",
    description: "Rain",
    predict: "60%",
  },
  {
    day: "Thu",
    date: "May 23",
    icon: "clouds",
    tempMax: "29°",
    tempMin: "19°",
    description: "Windy",
    predict: "20%",
  },
  {
    day: "Fri",
    date: "May 24",
    icon: "clouds",
    tempMax: "31°",
    tempMin: "21°",
    description: "Clear",
    predict: "0%",
  },
];

function App() {
  // المفروض القيمه الابتدائيه هتيجي من اللوكال ستوريدج مثلا او من البخث

  const [favouritesList, setFavouritesList] = useState([
    { id: 1, name: "New York", lat: 40.7128, lon: -74.006 },
    { id: 2, name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
    { id: 3, name: "Chicago", lat: 41.8781, lon: -87.6298 },
  ]);
  const [currentCity, setCurrentCity] = useState({});

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
  return (
    <>
      <Header />
      <main className="app-container">
        <Search setCurrentCity={setCurrentCity} />
        <Fav cities={favouritesList} handleClick={handleFavoriteSelect} />
        <WeatherCard
          Data={{
            current: "Cairo, Egypt",
            date: "Tuesday, May 20, 2025 10:30 AM",
            temp: 28,
            feels: 30,
            description: "Cloudy",
            humidity: 45,
            wind: 18,
            clouds: 25,
            pressure: 1012,
            visibility: 10,
            lastUpdate: "30 Minutes",
          }}
          isCurrentSet={Boolean(currentCity?.name)}
          setFavouritesList={updateFavorites}
          isFav={favouritesList.some(
            (item) =>
              item.lon === currentCity.lon && item.lat === currentCity.lat,
          )}
        />
        <ForecastHourly Hours={Hours} />
        <ForecastDaily Days={Days} />
      </main>
    </>
  );
}

export default App;
