export default function PlayerTable({ players }) {
  return (
    <div className="card">
      <h3>Top Players</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Tag</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.role}</td>
              <td className="hot">🔥</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}