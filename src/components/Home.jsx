
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../contexts/AuthContext';


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
  const { user } = useContext(AuthContext);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">🏏 IPL Predictions & Exclusive Merchandise</h1>
          <p className="text-xl mb-2">Live insights, match stats, premium picks, and authentic IPL gear & clothing for true fans!</p>
          <p className="text-lg italic">"Gear Up for Victory: Predict, Play, and Wear the Pride!"</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="bg-blue-100 border-l-4 border-blue-600 text-blue-700 p-4 mb-6 rounded">
            <p className="font-semibold">⏳ Loading matches...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-600 text-red-700 p-4 mb-6 rounded">
            <p className="font-semibold">⚠️ {error}</p>
          </div>
        )}

        {/* Matches Grid */}
        {matches.length > 0 && (
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">🎯 Live Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} prediction={computePrediction(match)} />
              ))}
            </div>
          </div>
        )}

        {/* Insights Section */}
        <div className="mb-12">
          <Insights />
        </div>

        {/* Players Table Section */}
        <div className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">⭐ Top Players</h2>
          <PlayerTable players={players} />
        </div>

        {/* Picks Section */}
        <div className="mb-12">
          <Picks />
        </div>

        {/* Subscription Section */}
        <div className="mb-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg shadow-lg p-8">
          <Subscription />
        </div>

        {/* Premium Content */}
        {user && user.isSubscribed && (
          <div className="mb-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg shadow-lg p-8 border-2 border-purple-300">
            <h3 className="text-3xl font-bold mb-4 text-purple-800">🎁 Premium API Integration</h3>
            <p className="text-gray-700 text-lg">Welcome, Premium Member! Here you can access all API integrations for subscribed users.</p>
            <p className="text-gray-700 mt-2">Enjoy exclusive predictions, detailed analytics, and priority support!</p>
          </div>
        )}

        {/* Monetization Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">💰 How We Monetize</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start bg-blue-50 p-4 rounded-lg">
              <span className="text-2xl mr-3">🔗</span>
              <span className="text-gray-700"><strong>Affiliate Links:</strong> Gear and IPL merchandise</span>
            </li>
            <li className="flex items-start bg-green-50 p-4 rounded-lg">
              <span className="text-2xl mr-3">⭐</span>
              <span className="text-gray-700"><strong>Premium Subscription:</strong> Exclusive predictions & analytics</span>
            </li>
            <li className="flex items-start bg-yellow-50 p-4 rounded-lg">
              <span className="text-2xl mr-3">📢</span>
              <span className="text-gray-700"><strong>Ads & Sponsorships:</strong> Partner brands</span>
            </li>
            <li className="flex items-start bg-purple-50 p-4 rounded-lg">
              <span className="text-2xl mr-3">🏆</span>
              <span className="text-gray-700"><strong>Contests:</strong> Entry fee & prizes</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Affiliate Sidebar */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">🛍️ Exclusive Deals</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            <a href="https://ajiio.in/hGDQovG" target="_blank" rel="noopener noreferrer" className="group">
              <img src="https://assets.ajio.com/medias/sys_master/root/20200913/57Pt/5f5dcf16aeb269ef8ec0434c/-473Wx593H-461078563-multi-MODEL.jpg" alt="Affiliate 1" className="w-full h-40 object-cover rounded-lg hover:shadow-lg transition transform hover:scale-105" />
            </a>
            <a href="https://myntr.it/X9o6kFE" target="_blank" rel="noopener noreferrer" className="group">
              <img src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2275352/2018/2/24/11519444618271-Roadster-Men-Black-Solid-Round-Neck-T-shirt-1771519444618074-1.jpg" alt="Affiliate 2" className="w-full h-40 object-cover rounded-lg hover:shadow-lg transition transform hover:scale-105" />
            </a>
            <a href="https://myntr.it/XDOLeq7" target="_blank" rel="noopener noreferrer" className="group">
              <img src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11545036/2020/5/27/eff37738-807c-4a3e-8b37-d909f3298b1b1590563500250HRXbyHrithikRoshanMenBlackSolidRunningRapidDryAntimicrobialS1.jpg" alt="Affiliate 3" className="w-full h-40 object-cover rounded-lg hover:shadow-lg transition transform hover:scale-105" />
            </a>
            <a href="https://ajiio.in/in1XpFk" target="_blank" rel="noopener noreferrer" className="group">
              <img src="https://assets.ajio.com/medias/sys_master/root/ha8/h64/12683912937502/-473Wx593H-460323474-turquoise-MODEL.jpg" alt="Affiliate 4" className="w-full h-40 object-cover rounded-lg hover:shadow-lg transition transform hover:scale-105" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">🏏 IPL Predictor</h3>
              <p className="text-gray-300 mb-4">
                Your ultimate destination for IPL predictions, live insights, premium picks, and authentic IPL merchandise.
                Join thousands of cricket fans making smarter predictions!
              </p>
              {/* <div className="flex space-x-4">
                <a href="https://facebook.com/iplpredictor" target="_blank" rel="noopener noreferrer"
                   className="text-blue-400 hover:text-blue-300 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/iplpredictor" target="_blank" rel="noopener noreferrer"
                   className="text-blue-400 hover:text-blue-300 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/iplpredictor" target="_blank" rel="noopener noreferrer"
                   className="text-pink-400 hover:text-pink-300 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.996.014 6.797.067 5.609.12 4.835.267 4.196.5c-.674.24-1.246.562-1.816.998C1.81 1.934 1.438 2.506.998 3.18c-.238.67-.385 1.444-.438 2.632C.48 7.011.466 7.411.466 11.032s.014 4.021.067 5.22c.053 1.199.207 1.973.44 2.612.24.674.562 1.246.998 1.816.562.57 1.134.942 1.808 1.382.67.238 1.444.385 2.632.438 1.199.053 1.599.067 5.22.067s4.021-.014 5.22-.067c1.199-.053 1.973-.207 2.612-.44.674-.24 1.246-.562 1.816-.998.57-.562.942-1.134 1.382-1.808.238-.67.385-1.444.438-2.632.053-1.199.067-1.599.067-5.22s-.014-4.021-.067-5.22c-.053-1.199-.207-1.973-.44-2.612-.24-.674-.562-1.246-.998-1.816C21.19 1.066 20.618.694 19.944.254c-.67-.238-1.444-.385-2.632-.438C16.113.014 15.713 0 12.092 0h-.075zM11.982 2.297c3.581 0 4.006.014 5.42.078 1.302.061 2.019.28 2.496.467.526.204.896.448 1.29.842.394.394.638.764.842 1.29.187.477.406 1.194.467 2.496.064 1.414.078 1.839.078 5.42s-.014 4.006-.078 5.42c-.061 1.302-.28 2.019-.467 2.496-.204.526-.448.896-.842 1.29-.394.394-.764.638-1.29.842-.477.187-1.194.406-2.496.467-1.414.064-1.839.078-5.42.078s-4.006-.014-5.42-.078c-1.302-.061-2.019-.28-2.496-.467-.526-.204-.896-.448-1.29-.842-.394-.394-.638-.764-.842-1.29-.187-.477-.406-1.194-.467-2.496C2.361 8.413 2.342 7.988 2.342 4.407s.019-4.006.078-5.42c.061-1.302.28-2.019.467-2.496.204-.526.448-.896.842-1.29.394-.394.764-.638 1.29-.842.477-.187 1.194-.406 2.496-.467 1.414-.064 1.839-.078 5.42-.078zM12.017 5.926c-3.583 0-6.491 2.908-6.491 6.491s2.908 6.491 6.491 6.491 6.491-2.908 6.491-6.491-2.908-6.491-6.491-6.491zm0 10.716c-2.33 0-4.225-1.895-4.225-4.225s1.895-4.225 4.225-4.225 4.225 1.895 4.225 4.225-1.895 4.225-4.225 4.225zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/@iplpredictor" target="_blank" rel="noopener noreferrer"
                   className="text-red-400 hover:text-red-300 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/iplpredictor" target="_blank" rel="noopener noreferrer"
                   className="text-blue-500 hover:text-blue-400 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div> */}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
                <li><a href="/shop" className="text-gray-300 hover:text-white transition">Shop</a></li>
                <li><a href="/login" className="text-gray-300 hover:text-white transition">Login</a></li>
                <li><a href="/register" className="text-gray-300 hover:text-white transition">Register</a></li>
                <li><a href="/admin" className="text-gray-300 hover:text-white transition">Admin</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/terms" className="text-gray-300 hover:text-white transition">Terms & Conditions</a></li>
                <li><a href="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/sitemap.xml" className="text-gray-300 hover:text-white transition">Sitemap</a></li>
                <li><a href="mailto:support@iplpredictor.com" className="text-gray-300 hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2026 IPL Predictor. All rights reserved. |
              {/* <span className="ml-2">Demo Account: iplpredictor@demo.com / demo123</span> */}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}