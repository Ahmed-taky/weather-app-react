import WeatherIcon from "../icons/WeatherIcon";
import { DropIcon } from "../icons/UiIcons";
export default function ForecastHours({ Hours }) {
  return (
    <div className="Hourly-Forcast">
      <p className="Forcast-title">Today - Hourly Forecast</p>
      <div className="forcast-cards">
        {Hours.map((hour, index) => {
          return (
            <div className="forcast-card" key={index}>
              <p className="card-title">{hour.time}</p>
              <WeatherIcon name={hour.icon} size={36} title={hour.time} />
              <p className="temp">{hour.temp}</p>
              <div className="rain-prediction">
                <DropIcon size={12} />

                <p className="predict">{hour.predict}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
