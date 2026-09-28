import MatricesInfo from "../utils/formater";
import WeatherIcon from "./icons/WeatherIcon";
import { FavStarIcon, RefreshIcon } from "./icons/UiIcons";

export default function WeatherCard({
  Data: {
    currentLocation,
    date,
    temp,
    feels,
    description,
    icon = "clouds",
    humidity,
    wind,
    clouds,
    pressure,
    visibility,
    lastUpdate,
    wind_dir,
  },
  setFavouritesList,
  isFav,
  isCurrentSet,
}) {
  const metrics = MatricesInfo({
    humidity,
    windSpeed: wind,
    clouds,
    pressure,
    visibility,
    wind_dir,
  });
  console.log("vds", isCurrentSet);
  return (
    <div className="weather-card">
      <div className="card-top">
        <div className="location-details">
          <h2 className="current-location">{currentLocation}</h2>
          <p className="current-date">{date}</p>
        </div>

        <button
          disabled={!isCurrentSet}
          className={`fav-btn ${isFav ? "active" : ""}`}
          onClick={() => {
            console.log(isCurrentSet);
            if (Math.abs(isCurrentSet)) setFavouritesList();
          }}
          aria-label="Toggle Favorite"
        >
          <FavStarIcon active={isFav} />
        </button>
      </div>

      <div className="card-middle">
        <div className="temp-column">
          <div className="temp-value">
            {temp}
            <span className="unit">°C</span>
          </div>
          <p className="feels-like">Feels like {feels}°C</p>
        </div>

        <div className="condition-column">
          <WeatherIcon
            name={icon}
            size={140}
            className="weather-illustration"
            title={description}
          />
          <p className="condition-text">{description}</p>
        </div>

        <div className="metrics-column">
          {metrics.map((item) => (
            <div key={item.id} className="metric-item">
              <div className="metric-label">
                <WeatherIcon
                  name={item.iconName}
                  size={24}
                  className="metric-icon"
                  title={item.label}
                />
                <span>{item.label}</span>
              </div>

              <div className="metric-value-group">
                <span className="metric-value">{item.value}</span>
                {item.badge && (
                  <span className="badge-direction">{item.badge}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card-bottom">
        <p> Last Update At {lastUpdate}</p>
        <button aria-label="Refresh">
          <RefreshIcon />
        </button>
      </div>
    </div>
  );
}
