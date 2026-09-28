import Row from "./ResultRow";
export default function SearchResults({ options, setCurrentCity }) {
  if (options === "" || options === null) return;
  return (
    <div className="dropdown">
      {options.map((option) => (
        <Row key={option.id} result={option} setCurrentCity={setCurrentCity} />
      ))}
    </div>
  );
}
