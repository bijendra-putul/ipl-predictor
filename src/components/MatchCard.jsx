  export default function MatchCard({ match, prediction }) {
  const scoreSummary = match.score
    ? match.score.map((s) => `${s.inning}: ${s.r}/${s.w} (${s.o})`).join(" | ")
    : "No score available";

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
      <header className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 logo-image-right">
          {match.teamInfo?.map((team) => (
            <img key={team.shortname} src={team.img} alt={team.name} className="h-10 w-10 rounded-md border border-gray-200" />
          ))}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-slate-800">{match.name}</h3>
      </header>

      <div className="space-y-2 mb-4">
        <p className="text-sm md:text-base font-medium text-indigo-700">{match.status || 'Status not available'}</p>
        <p className="text-xs md:text-sm text-gray-500">{scoreSummary}</p>
        <p className="text-sm md:text-base font-semibold text-green-700">Prediction: {prediction || 'Undecided'}</p>
      </div>

      <div className="flex items-center justify-between">
        <span className={match.matchStarted ? 'px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-green-100 text-green-600' : 'px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-red-100 text-red-600'}>
          {match.matchStarted ? 'Live Now' : 'Not started'}
        </span>
        <a href="#" className="text-xs md:text-sm text-blue-600 font-semibold hover:text-blue-800">View details →</a>
      </div>
    </div>
  );
}