export default function Fav({ cities, handleClick }) {
  return (
    <div className="fav-container">
      {cities.map((city, index) => (
        <div
          key={index}
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
