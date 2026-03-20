    export default function Insights() {
  const items = [
    "Pitch: Batting",
    "Avg Score: 180",
    "Chasing: 60%",
    "Dew: High",
  ];

  return (
    <div className="grid">
      {items.map((item, i) => (
        <div key={i} className="grid-item">
          {item}
        </div>
      ))}
    </div>
  );
}