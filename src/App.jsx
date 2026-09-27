import "./App.css";
import Fav from "./Components/fav";
import ForecastHourly from "./Components/Forcasts/ForcastHours";
import ForecastDaily from "./Components/Forcasts/ForcastDays";
import Header from "./Components/Header";
import Search from "./Components/Search/SearchBox";
import WeatherCard from "./Components/weatherCard";
import icon from "./assets/icons/clouds.svg";
const Hours = [
  {
    time: "Now",
    icon: icon,
    temp: "28°",
    predict: "0%",
  },
  {
    time: "11 AM",
    icon: icon,
    temp: "29°",
    predict: "0%",
  },
  {
    time: "12 PM",
    icon: icon,
    temp: "31°",
    predict: "10%",
  },
  {
    time: "1 PM",
    icon: icon,
    temp: "31°",
    predict: "20%",
  },
  {
    time: "2 PM",
    icon: icon,
    temp: "30°",
    predict: "15%",
  },
  {
    time: "3 PM",
    icon: icon,
    temp: "29°",
    predict: "5%",
  },
  {
    time: "Now",
    icon: icon,
    temp: "28°",
    predict: "0%",
  },
  {
    time: "11 AM",
    icon: icon,
    temp: "29°",
    predict: "0%",
  },
  {
    time: "12 PM",
    icon: icon,
    temp: "31°",
    predict: "10%",
  },
  {
    time: "1 PM",
    icon: icon,
    temp: "31°",
    predict: "20%",
  },
  {
    time: "2 PM",
    icon: icon,
    temp: "30°",
    predict: "15%",
  },
  {
    time: "3 PM",
    icon: icon,
    temp: "29°",
    predict: "5%",
  },
  {
    time: "Now",
    icon: icon,
    temp: "28°",
    predict: "0%",
  },
  {
    time: "11 AM",
    icon: icon,
    temp: "29°",
    predict: "0%",
  },
  {
    time: "12 PM",
    icon: icon,
    temp: "31°",
    predict: "10%",
  },
  {
    time: "1 PM",
    icon: icon,
    temp: "31°",
    predict: "20%",
  },
  {
    time: "2 PM",
    icon: icon,
    temp: "30°",
    predict: "15%",
  },
  {
    time: "3 PM",
    icon: icon,
    temp: "29°",
    predict: "5%",
  },
  {
    time: "Now",
    icon: icon,
    temp: "28°",
    predict: "0%",
  },
  {
    time: "11 AM",
    icon: icon,
    temp: "29°",
    predict: "0%",
  },
  {
    time: "12 PM",
    icon: icon,
    temp: "31°",
    predict: "10%",
  },
  {
    time: "1 PM",
    icon: icon,
    temp: "31°",
    predict: "20%",
  },
  {
    time: "2 PM",
    icon: icon,
    temp: "30°",
    predict: "15%",
  },
  {
    time: "3 PM",
    icon: icon,
    temp: "29°",
    predict: "5%",
  },
];
const Days = [
  {
    day: "Mon",
    date: "May 20",
    icon,
    tempMax: "30°",
    tempMin: "18°",
    description: "Sunny",
    predict: "0%",
  },
  {
    day: "Tue",
    date: "May 21",
    icon,
    tempMax: "32°",
    tempMin: "20°",
    description: "Partly Cloudy",
    predict: "10%",
  },
  {
    day: "Wed",
    date: "May 22",
    icon,
    tempMax: "28°",
    tempMin: "17°",
    description: "Rain",
    predict: "60%",
  },
  {
    day: "Thu",
    date: "May 23",
    icon,
    tempMax: "29°",
    tempMin: "19°",
    description: "Windy",
    predict: "20%",
  },
  {
    day: "Fri",
    date: "May 24",
    icon,
    tempMax: "31°",
    tempMin: "21°",
    description: "Clear",
    predict: "0%",
  },
];

function App() {
  return (
    <>
      <Header />
      <Search />
      <Fav
        cities={[
          { id: 1, name: "New York", lat: 40.7128, lon: -74.006 },
          { id: 2, name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
          { id: 3, name: "Chicago", lat: 41.8781, lon: -87.6298 },
        ]}
      />
      <div className="weather-dashboard">
        <WeatherCard />
        <ForecastHourly Hours={Hours} />
        <ForecastDaily Days={Days} />
      </div>
    </>
  );
}

export default App;
