import WeatherIcon from "../icons/WeatherIcon";
import { PinIcon } from "../icons/UiIcons";
export default function ResultRow({ result, setCurrentCity }) {
  return (
    <div
      className="result-row"
      onClick={() => {
        setCurrentCity({
          name: result.name,
          lat: result.lat,
          lon: result.lon,
          fetchIn: new Date(),
        });
        console.log(
          `Selected city: ${result.name}, Lat: ${result.lat}, Lon: ${result.lon}`,
        );
        //delete the query field
      }}
    >
      <PinIcon />
      <p className="search-city-name">
        {result.name + " , " + result.region + " , " + result.country}
      </p>
      <div className="search-city-weather">
        <WeatherIcon name="clouds" size={24} title="clouds" />
        <p>{result.description ?? 30}°C</p>
      </div>
    </div>
  );
}
