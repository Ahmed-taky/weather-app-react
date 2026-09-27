import "./Forcast.css";
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
              <img src={day.icon} alt="" />
              <p className="temp">
                <span className="max">{day.tempMax}</span>
                <span className="min">{day.tempMin}</span>
              </p>
              <p className="description">{day.description}</p>
              <div className="rain-prediction">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.69L17.66 8.35C20.78 11.47 20.78 16.53 17.66 19.65C14.54 22.77 9.48 22.77 6.36 19.65C3.24 16.53 3.24 11.47 6.36 8.35L12 2.69Z"
                    fill="#3B82F6"
                  />
                </svg>

                <p className="predict">{day.predict}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
