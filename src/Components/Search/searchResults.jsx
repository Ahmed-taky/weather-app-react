import Row from "./ResultRow";
export default function SearchResults({ options, handleResultSelection }) {
  if (options === "" || options === null) return;
  return (
    <div className="dropdown">
      {options.map((option) => (
        <Row
          key={option.id}
          result={option}
          handleResultSelection={handleResultSelection}
        />
      ))}
    </div>
  );
}
