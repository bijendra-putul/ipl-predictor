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
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPanel from "./components/AdminPanel";
import UserProfile from "./components/UserProfile";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </>
  );
}