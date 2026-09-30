import WeatherIcon from "../icons/WeatherIcon";
import { DropIcon } from "../icons/UiIcons";
export default function ForecastDays({ Days = [], unit }) {
  return (
    <div className="Hourly-Forcast">
      <p className="Forcast-title"> 3-Day Forecast </p>
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
                <span className="max">
                  {unit === "C" ? day.tempMax_c : day.tempMax_f}
                </span>
                <span className="min">
                  {unit === "C" ? day.tempMin_c : day.tempMin_f}
                </span>
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
