export default function MatchCard({ match }) {
  return (
    <div>
      {/* Banner */}
      <div className="banner">
        <h2 className="banner-title">
          🔥 Today's Winning Team Prediction Inside
        </h2>
        <p className="banner-sub">Only available before toss ⏳</p>
      </div>

      <div className="card">
        <h2>{match.name}</h2>
        <p className="match-status">{match.status}</p>

        <div className="match-row">
          <span>{match.teams?.[0]}</span>
          <span>vs</span>
          <span>{match.teams?.[1]}</span>
        </div>
      </div>
    </div>
  );
}