
import { useEffect, useState } from "react";
import axios from "axios";


//import Navbar from "./components/Navbar";
import MatchCard from "./MatchCard";
import Insights from "./Insights";
import PlayerTable from "./PlayerTable";
import Picks from "./Picks";
import Subscription from "./Subscription";

const API_KEY = "1b72cff9-bce1-45a2-b948-852411bb143f";

const FALLBACK_MATCHES = [
  {
    id: "402f42b2-3760-4004-bcb6-3c63880cf05d",
    name: "Victoria vs South Australia, Final, Sheffield Shield 2025-26",
    teams: ["Victoria", "South Australia"],
    teamInfo: [
      {
        name: "South Australia",
        shortname: "SAUS",
        img: "https://g.cricapi.com/iapi/84-637993500332119314.webp?w=48",
      },
      {
        name: "Victoria",
        shortname: "VIC",
        img: "https://g.cricapi.com/iapi/96-637987557199223762.webp?w=48",
      },
    ],
    status: "Day 2: 3rd Session - Victoria trail by 194 runs",
    score: [
      { r: 198, w: 10, o: 76.4, inning: "South Australia Inning 1" },
      { r: 4, w: 0, o: 1, inning: "Victoria Inning 1" },
    ],
  },
];

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMatchData();
    fetchPlayerData();
  }, []);

  const fetchMatchData = async () => {
    try {
      const res = await axios.get(
        `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}`
      );
      const data = res?.data?.data || FALLBACK_MATCHES;
      setMatches(data.slice(0, 8));
    } catch (err) {
      console.warn("Match API failed, using fallback", err);
      setError("Unable to load live match data");
      setMatches(FALLBACK_MATCHES);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayerData = async () => {
    try {
      const res = await axios.get(`https://api.cricapi.com/v1/players?apikey=${API_KEY}`);
      const data = res?.data?.data || [];
      setPlayers(
        data
          .splice(0, 10)
          .map((p, i) => ({ name: p.name || `Player ${i + 1}`, role: p.position || "All-rounder" }))
      );
    } catch (err) {
      console.warn("Players API failed", err);
      setPlayers([
        { name: "Rohit Sharma", role: "Batsman" },
        { name: "Jasprit Bumrah", role: "Bowler" },
      ]);
    }
  };

  const computePrediction = (match) => {
    if (!match.status) return "TBD";
    const lower = match.status.toLowerCase();
    if (lower.includes("trail") || lower.includes("requires")) return "Coming soon";
    if (lower.includes("win") || lower.includes("won")) return "Winner: " + match.teams?.[0] || "Team 1";
    return "Balanced game";
  };

  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <h2>🏏 IPL Predictions & Exclusive Merchandise</h2>
          <p>Live insights, match stats, premium picks, and authentic IPL gear & clothing for true fans!</p>
          <p className="slogan">"Gear Up for Victory: Predict, Play, and Wear the Pride!"</p>
        </div>

        {loading && <div className="card">Loading matches...</div>}
        {error && <div className="card hot">{error}</div>}

        {matches.length > 0 && (
          <div className="grid">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} prediction={computePrediction(match)} />
            ))}
          </div>
        )}

        <Insights />
        <PlayerTable players={players} />
        <Picks />
        <Subscription />

        <div className="card" style={{ marginTop: 16 }}>
          <h3>💰 Monetization Advice</h3>
          <ul>
            <li>Affiliate links (gear and IPL merch in Shop component).</li>
            <li>Premium tips subscription for exclusive predictions and analytics.</li>
            <li>Display ads, sponsorship notices, or paid newsletter signups.</li>
            <li>Group coaching / prediction contests with entry fee and prizes.</li>
          </ul>
        </div>
      </div>

      {/* Affiliate Marketing Sidebar */}
      <div className="affiliate-sidebar">
        <a href="https://ajiio.in/hGDQovG" target="_blank" rel="noopener noreferrer" className="affiliate-item">
          <img src="https://assets.ajio.com/medias/sys_master/root/20200913/57Pt/5f5dcf16aeb269ef8ec0434c/-473Wx593H-461078563-multi-MODEL.jpg" alt="Affiliate 1" className="affiliate-img" />
        </a>
        <a href="https://myntr.it/X9o6kFE" target="_blank" rel="noopener noreferrer" className="affiliate-item">
          <img src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2275352/2018/2/24/11519444618271-Roadster-Men-Black-Solid-Round-Neck-T-shirt-1771519444618074-1.jpg" alt="Affiliate 2" className="affiliate-img" />
        </a>
        <a href="https://myntr.it/XDOLeq7" target="_blank" rel="noopener noreferrer" className="affiliate-item">
          <img src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11545036/2020/5/27/eff37738-807c-4a3e-8b37-d909f3298b1b1590563500250HRXbyHrithikRoshanMenBlackSolidRunningRapidDryAntimicrobialS1.jpg" alt="Affiliate 3" className="affiliate-img" />
        </a>
        <a href="https://ajiio.in/in1XpFk" target="_blank" rel="noopener noreferrer" className="affiliate-item">
          <img src="https://assets.ajio.com/medias/sys_master/root/ha8/h64/12683912937502/-473Wx593H-460323474-turquoise-MODEL.jpg" alt="Affiliate 4" className="affiliate-img" />
        </a>
      </div>
    </div>
  );
}