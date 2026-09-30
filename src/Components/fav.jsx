export default function Fav({ cities, handleClick }) {
  return (
    <div className="fav-container">
      {cities.map((city) => (
        <div
          key={`${city.name + city.lon + city.lat}`}
          className="fav-item"
          value={`${city.lon},${city.lat}`}
          onClick={() => {
            handleClick(city);
          }}
          style={{
            cursor: "pointer",
          }}
        >
          {city.name}
        </div>
      ))}
    </div>
  );
}
