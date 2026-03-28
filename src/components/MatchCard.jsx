export default function MatchCard({ match, prediction }) {
  const scoreSummary = match.score
    ? match.score.map((s) => `${s.inning}: ${s.r}/${s.w} (${s.o})`).join(" | ")
    : "No score available";

  return (
    <div className="card">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {match.teamInfo?.map((team) => (
          <img key={team.shortname} src={team.img} alt={team.name} width={32} height={32} style={{ borderRadius: 4 }} />
        ))}
        <h3 style={{ margin: 0 }}>{match.name}</h3>
      </div>

      <p className="match-status">{match.status}</p>
      <p style={{ margin: "8px 0", fontSize: 14 }}>{scoreSummary}</p>
      <p style={{ fontWeight: "bold" }}>Prediction: {prediction || "Undecided"}</p>

      {match.matchStarted ? (
        <span style={{ color: "#22c55e" }}>Live Now</span>
      ) : (
        <span style={{ color: "#ef4444" }}>Not started</span>
      )}
    </div>
  );
}