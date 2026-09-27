import { useState } from "react";
import icon from "../assets/icons/clouds.svg";
import "./weatherCard.css";
import MatricesInfo from "../utils/formater";

export default function WeatherCard({
  current = "Cairo, Egypt",
  date = "Tuesday, May 20, 2025 10:30 AM",
  temp = 28,
  feels = 30,
  description = "Cloudy",
  humidity = 45,
  wind = 18,
  clouds = 25,
  pressure = 1012,
  visibility = 10,
  lastUpdate = "30 Minutes",
}) {
  const [isFav, setIsFav] = useState(false);
  const metrics = MatricesInfo({
    humidity,
    windSpeed: wind,
    clouds,
    pressure,
    visibility,
  });

  return (
    <div className="weather-card">
      <div className="card-top">
        <div className="location-details">
          <h2 className="current-location">{current}</h2>
          <p className="current-date">{date}</p>
        </div>

        <button
          className={`fav-btn ${isFav ? "active" : ""}`}
          onClick={() => setIsFav((prev) => !prev)}
          aria-label="Toggle Favorite"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="20" className="fav-bg" />
            <circle cx="20" cy="20" r="19.5" className="fav-border" />
            <path
              d="M20 10L22.9389 15.9549L29.5106 16.9098L24.7553 21.5451L25.8779 28.0902L20 25L14.1221 28.0902L15.2447 21.5451L10.4894 16.9098L17.0611 15.9549L20 10Z"
              fill={isFav ? "#FBBF24" : "rgba(255, 255, 255, 0.4)"}
            />
          </svg>
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
          <img src={icon} alt={description} className="weather-illustration" />
          <p className="condition-text">{description}</p>
        </div>

        <div className="metrics-column">
          {metrics.map((item) => (
            <div key={item.id} className="metric-item">
              <div className="metric-label">
                <img src={item.icon} alt={item.label} className="metric-icon" />
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
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 11A8.1 8.1 0 0 0 5.3 6.3L3 9M3 9V4M3 9H8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M4 13A8.1 8.1 0 0 0 18.7 17.7L21 15M21 15V20M21 15H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
