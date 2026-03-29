import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = ['Jerseys', 'Caps', 'Bats', 'Balls', 'Merchandise'];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src="/ipl-pr-logo.jpg" alt="IPL Predictor" className="h-10 w-10 rounded-full ring-2 ring-green-500" />
            <span className="text-2xl font-black text-slate-800">🔥 IPL Predictor</span>
          </Link>

          <nav className="flex items-center gap-2 md:gap-4 flex-wrap">
            <Link to="/" className="text-sm md:text-base text-slate-700 hover:text-green-600 font-semibold px-3 py-2 rounded-lg hover:bg-slate-100">Home</Link>
            <Link to="/shop" className="text-sm md:text-base text-slate-700 hover:text-green-600 font-semibold px-3 py-2 rounded-lg hover:bg-slate-100">Shop 🛒</Link>
            
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="text-sm md:text-base text-slate-700 hover:text-green-600 font-semibold px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center"
              >
                📦 Categories ▼
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/shop?category=${category}`}
                      onClick={() => setShowCategoryDropdown(false)}
                      className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-semibold text-sm"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/cart" className="text-sm md:text-base text-blue-600 hover:text-blue-700 font-semibold px-3 py-2 rounded-lg hover:bg-blue-50 border border-blue-200">
              🛒 Cart ({getCartCount()})
            </Link>
            {user ? (
              <>
                <Link to="/orders" className="text-sm md:text-base text-slate-700 hover:text-green-600 font-semibold px-3 py-2 rounded-lg hover:bg-slate-100">📦 Orders</Link>
                {user.role === 'admin' && <Link to="/admin" className="text-sm md:text-base text-slate-700 hover:text-green-600 font-semibold px-3 py-2 rounded-lg hover:bg-slate-100">Admin</Link>}
                <Link to="/profile" className="text-sm md:text-base text-slate-700 hover:text-green-600 font-semibold px-3 py-2 rounded-lg hover:bg-slate-100">👤 Profile</Link>
                <button onClick={logout} className="text-sm md:text-base text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg font-semibold transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm md:text-base text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg font-semibold transition">Login</Link>
                <Link to="/register" className="text-sm md:text-base text-green-600 hover:text-green-700 border border-green-200 px-3 py-2 rounded-lg font-semibold transition">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}