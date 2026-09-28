import WeatherIcon from "../icons/WeatherIcon";
import { DropIcon } from "../icons/UiIcons";
export default function ForecastDays({ Days = [] }) {
  return (
    <div className="Hourly-Forcast">
      <p className="Forcast-title"> 5-Day Forecast </p>
      <div className="forcast-cards">
        {Days.map((day, index) => {
          return (
            <div className="forcast-card" key={index}>
              <p className="card-title">{day.day}</p>
              <span>{day.date}</span>
              <WeatherIcon
                name={day.icon}
                size={48}
                title={day.description}
                className="day-weather"
              />
              <p className="temp">
                <span className="max">{day.tempMax}</span>
                <span className="min">{day.tempMin}</span>
              </p>
              <p className="description">{day.description}</p>
              <div className="rain-prediction">
                <DropIcon size={12} />

                <p className="predict">{day.predict}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
