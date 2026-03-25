
import { useEffect, useState } from "react";
import axios from "axios";


//import Navbar from "./components/Navbar";
import MatchCard from "./MatchCard";
import Insights from "./Insights";
import PlayerTable from "./PlayerTable";
import Picks from "./Picks";
import Subscription from "./Subscription";

const API_KEY = "1b72cff9-bce1-45a2-b948-852411bb143f";

export default function Home() {
  const [match, setMatch] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchMatch();
    fetchPlayers();
  }, []);

  const fetchMatch = async () => {
    const res = await axios.get(
      `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}`
    );
    setMatch(res.data.data[0]);
  };

  const fetchPlayers = async () => {
    const res = await axios.get(
      `https://api.cricapi.com/v1/players?apikey=${API_KEY}`
    );
    setPlayers(res.data.data.slice(0, 5));
  };

  return (
    <div className="app">
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