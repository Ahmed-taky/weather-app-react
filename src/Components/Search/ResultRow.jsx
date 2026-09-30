import WeatherIcon from "../icons/WeatherIcon";
import { PinIcon } from "../icons/UiIcons";
import getWeatherIcon from "../../utils/getWeatherIcon";
export default function ResultRow({ result, handleResultSelection, unit }) {
  const name = getWeatherIcon(result.code, result.isDay);
  return (
    <button
      className="result-row"
      onClick={() => {
        handleResultSelection({
          name: result.name,
          lat: result.lat,
          lon: result.lon,
          fetchIn: new Date(),
        });
      }}
    >
      <PinIcon />
      <p className="search-city-name">
        {result.name + " , " + result.region + " , " + result.country}
      </p>
      <div className="search-city-weather">
        <WeatherIcon name={name} size={24} title="name" />
        <p>
          {unit === "C" ? result.temp_c : result.temp_f}°{unit}
        </p>
      </div>
    </button>
  );
}
