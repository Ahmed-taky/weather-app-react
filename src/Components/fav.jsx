export default function Fav({ cities }) {
  return (
    <div className="fav-container">
      {cities.map((city) => (
        <div
          key={city.id}
          className="fav-item"
          value={`${city.lon},${city.lat}`}
          onClick={() => {
            console.log(
              `Selected city: ${city.name}, Lat: ${city.lat}, Lon: ${city.lon}`,
            );
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
