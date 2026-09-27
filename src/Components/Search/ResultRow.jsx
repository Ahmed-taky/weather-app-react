import icon from "../../assets/icons/clouds.svg";
export default function ResultRow({ result }) {
  return (
    <div
      className="result-row"
      onClick={() => {
        console.log(
          `Selected city: ${result.name}, Lat: ${result.lat}, Lon: ${result.lon}`,
        );
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="search-pin-icon"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
          fill="#3B82F6"
        />
        <circle cx="12" cy="9" r="3" fill="white" />
      </svg>

      <p className="search-city-name">{result.name}</p>

      <div className="search-city-weather">
        <img src={icon} alt="clouds" />
        <p>{result.description ?? 30}°C</p>
      </div>
    </div>
  );
}
