export default function Picks() {
  const isPremium = localStorage.getItem("premium");

  if (!isPremium) {
    return (
      <div className="picks">
        <h3>🔒 Premium Content</h3>
        <p>Subscribe to unlock predictions</p>
      </div>
    );
  }

  return (
    <div className="picks">
      <h3>Top Picks</h3>
      <p>🏏 Captain: Player A</p>
      <p>🎯 Vice-Captain: Player B</p>
    </div>
  );
}