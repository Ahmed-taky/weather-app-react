import MatricesInfo from "../utils/formater";
import WeatherIcon from "./icons/WeatherIcon";
import { ErrorIcon, FavStarIcon, RefreshIcon } from "./icons/UiIcons";

export default function WeatherCard({
  Data: {
    currentLocation,
    date,
    temp_c,
    feels_c,
    feels_f,
    description,
    icon = "clouds",
    humidity,
    wind,
    clouds,
    pressure,
    visibility,
    lastUpdate,
    wind_dir,
    temp_f,
  },
  setFavouritesList,
  isFav,
  isCurrentSet,
  unit,
  refresh,
  status,
  retry,
}) {
  const metrics = MatricesInfo({
    humidity,
    windSpeed: wind,
    clouds,
    pressure,
    visibility,
    wind_dir,
  });
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
            if (isCurrentSet) setFavouritesList();
          }}
          aria-label="Toggle Favorite"
        >
          <FavStarIcon active={isFav} />
        </button>
      </div>

      <div className="card-middle">
        <div className="temp-column">
          <div className="temp-value">
            {unit === "C" ? temp_c : temp_f}
            <span className="unit">°{unit === "C" ? "C" : "F"}</span>
          </div>
          <p className="feels-like">
            Feels like {(unit === "C" ? feels_c : feels_f) + " °" + unit}
          </p>
        </div>
        {status === "error" ? (
          <div className="state-box">
            <ErrorIcon className="state-icon" />
            <p className="state-title">Failed to load weather data</p>
            <p className="state-text">
              Failed to load weather data bad internet
            </p>
            <button className="btn-retry" onClick={retry}>
              <RefreshIcon /> Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="condition-column">
              <WeatherIcon
                name={icon}
                size={140}
                className="weather-illustration"
                title={description}
              />
              <p className="condition-text">{description}</p>
            </div>
          </>
        )}
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
        <button aria-label="Refresh" onClick={refresh}>
          <RefreshIcon />
        </button>
      </div>
    </div>
  );
}
