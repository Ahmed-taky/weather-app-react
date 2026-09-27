import Row from "./ResultRow";
export default function SearchResults({ options }) {
  return (
    <div className="dropdown">
      {options.map((option) => (
        <Row key={option.id} result={option} />
      ))}
    </div>
  );
}
