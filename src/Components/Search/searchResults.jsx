import Row from "./ResultRow";
export default function SearchResults({
  options,
  handleResultSelection,
  unit,
  query,
}) {
  if (options === "" || options === null || query.trim() === "") return;
  return (
    <div className="dropdown">
      {options.map((option) => (
        <Row
          unit={unit}
          key={option.id}
          result={option}
          handleResultSelection={handleResultSelection}
        />
      ))}
    </div>
  );
}
