// // Full React SPA (Vite + Tailwind assumed)
// // Install: npm create vite@latest ipl-app -- --template react
// // cd ipl-app && npm install && npm install axios

// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./styles.css" ;

// // const API_KEY = "1b72cff9-bce1-45a2-b948-852411bb143f"; // Use RapidAPI / CricAPI


// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./styles.css";

// import Navbar from "./components/Navbar";
// import MatchCard from "./components/MatchCard";
// import Insights from "./components/Insights";
// import PlayerTable from "./components/PlayerTable";
// import Picks from "./components/Picks";
// import Subscription from "./components/Subscription";

// const API_KEY = "1b72cff9-bce1-45a2-b948-852411bb143f";

// export default function App() {
//   const [match, setMatch] = useState(null);
//   const [players, setPlayers] = useState([]);

//   useEffect(() => {
//     fetchMatch();
//     fetchPlayers();
//   }, []);

//   const fetchMatch = async () => {
//     const res = await axios.get(
//       `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}`
//     );
//     setMatch(res.data.data[0]);
//   };

//   const fetchPlayers = async () => {
//     const res = await axios.get(
//       `https://api.cricapi.com/v1/players?apikey=${API_KEY}`
//     );
//     setPlayers(res.data.data.slice(0, 5));
//   };

//   return (
//     <div className="app">
//       <Navbar />

//       <div className="container">
//         {match && <MatchCard match={match} />}
//         <Insights />
//         <PlayerTable players={players} />
//         <Picks />
//         <Subscription />
//       </div>
//     </div>
//   );
// }
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./components/Shop";
import Home from "./components/Home"; // or your main content

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}