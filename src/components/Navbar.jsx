import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <div className="navbar">
//       <h1 className="logo">🏏 IPL Predictor</h1>
//       <a href="https://inr.deals/3ikJLT" target="_blank">
//       <button className="btn btn-primary">Go Premium</button>
//     </a>
//     </div>
//   );
// }

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="logo">🏏 IPL Predictor</h1>

      <div className="right-navBar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/shop" className="nav-link">Shop 🛒</Link>
      </div>
    </div>
  );
}