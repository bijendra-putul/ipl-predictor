// Full React SPA (Vite + Tailwind assumed)
// Install: npm create vite@latest ipl-app -- --template react
// cd ipl-app && npm install && npm install axios

import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css" ;

const API_KEY = "1b72cff9-bce1-45a2-b948-852411bb143f"; // Use RapidAPI / CricAPI

export default function App() {
  const [match, setMatch] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchMatch();
    fetchPlayers();
  }, []);

  const fetchMatch = async () => {
    try {
      const res = await axios.get(
        `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
      );
      setMatch(res.data.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPlayers = async () => {
    try {
      const res = await axios.get(
        `https://api.cricapi.com/v1/players?apikey=${API_KEY}&offset=0`
      );
      setPlayers(res.data.data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <div className="container">
        {match && <MatchCard match={match} />}
        <Insights />
        <PlayerTable players={players} />
        <Picks />
        <Subscription />
      </div>
    </div>
  );
}

/* ---------- Navbar ---------- */
function Navbar() {
  return (
    <div className="navbar">
      <h1 className="logo">🏏 IPL Predictor</h1>
      <button className="btn btn-primary">Go Premium</button>
    </div>
  );
}

/* ---------- Match Card ---------- */
function MatchCard({ match }) {
  return (
    <div className="card">
      <h2 className="match-title">{match.name}</h2>
      <p className="match-status">{match.status}</p>

      <div className="match-row">
        <span>{match.teams?.[0]}</span>
        <span className="vs">vs</span>
        <span>{match.teams?.[1]}</span>
      </div>

      <div className="probability">
        <p>Win Probability</p>

        <div className="bar">
          <div className="fill" style={{ width: "55%" }}></div>
        </div>

        <div className="match-row">
          <span>Team A 55%</span>
          <span>Team B 45%</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Insights ---------- */
function Insights() {
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

/* ---------- Player Table ---------- */
function PlayerTable({ players }) {
  return (
    <div className="card">
      <h3 className="section-title">Top Players</h3>

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

/* ---------- Picks ---------- */
function Picks() {
  return (
    <div className="picks">
      <h3>Top Picks</h3>
      <p>🏏 Captain: Player A</p>
      <p>🎯 Vice-Captain: Player B</p>
    </div>
  );
}

/* ---------- Subscription ---------- */
function Subscription() {
  return (
    <div className="subscription">
      <h2>🔥 Premium Access</h2>
      <p>Winning teams, captain picks & predictions</p>
      <button className="btn btn-primary">
        Subscribe ₹499
      </button>
    </div>
  );
}
