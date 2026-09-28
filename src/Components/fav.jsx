export default function Fav({ cities, handleClick }) {
  return (
    <div className="fav-container">
      {console.log(cities)}
      {cities.map((city) => (
        <div
          key={city.id}
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
