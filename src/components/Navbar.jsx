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

import logo from "../assets/ipl-pr-logo.jpg";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo lipl-pr-logo">
        <img src={logo} alt="IPL Predictor" className="navbar-logo" />
      </div>

      {/* <div className="ad-section">
        {/* Affiliate Marketing / Advertisement Space */}
        {/* <div className="ad-banner"> */}
        {/* <div className="paddsize">
           <a href="" target="_blank" rel="noopener noreferrer" className="affiliate-item">
          <img src="https://assets.ajio.com/medias/sys_master/root/20200913/57Pt/5f5dcf16aeb269ef8ec0434c/-473Wx593H-461078563-multi-MODEL.jpg" alt="Affiliate 1" className="affiliate-img" />
        </a>
        </div>
        <div className="paddsize">
           <a href="https://ajiio.in/hGDQovG" target="_blank" rel="noopener noreferrer" className="affiliate-item">
          <img src="https://assets.ajio.com/medias/sys_master/root/20200913/57Pt/5f5dcf16aeb269ef8ec0434c/-473Wx593H-461078563-multi-MODEL.jpg" alt="Affiliate 1" className="affiliate-img" />
        </a>
        </div>
        <div className="paddsize">
           <a href="https://ajiio.in/hGDQovG" target="_blank" rel="noopener noreferrer" className="affiliate-item">
          <img src="https://assets.ajio.com/medias/sys_master/root/20200913/57Pt/5f5dcf16aeb269ef8ec0434c/-473Wx593H-461078563-multi-MODEL.jpg" alt="Affiliate 1" className="affiliate-img" />
        </a>
        </div>
        <div className="paddsize">
           <a href="https://ajiio.in/hGDQovG" target="_blank" rel="noopener noreferrer" className="affiliate-item">
          <img src="https://assets.ajio.com/medias/sys_master/root/20200913/57Pt/5f5dcf16aeb269ef8ec0434c/-473Wx593H-461078563-multi-MODEL.jpg" alt="Affiliate 1" className="affiliate-img" />
        </a>
        </div>
      </div> */} 

      <div className="right-navBar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/shop" className="nav-link">Shop 🛒</Link>
      </div>
    </div>
  );
}