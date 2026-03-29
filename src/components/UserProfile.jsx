import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function UserProfile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">Not Logged In</h2>
          <p className="text-gray-600">Please log in to view your profile</p>
          <Link to="/login" className="text-blue-600 hover:underline mt-4 inline-block font-semibold">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">👤 Profile</h2>
          
          {/* User Avatar */}
          <div className="bg-blue-700 rounded-lg p-6 mb-6 text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <p className="font-semibold text-lg">{user?.name}</p>
            <p className="text-sm opacity-80">{user?.email}</p>
          </div>

          <hr className="opacity-30 mb-6" />

          {/* Subscription Status */}
          <div className="bg-blue-700 rounded-lg p-4 mb-6">
            <p className="text-xs opacity-70 uppercase">Membership</p>
            <p className="text-xl font-bold mt-2">
              {user?.isSubscribed ? '⭐ Premium' : 'Free User'}
            </p>
            {user?.isSubscribed && (
              <p className="text-xs opacity-70 mt-2">Active & Valid</p>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-6">
            <Link to="/" className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition">🏠 Home</Link>
            <Link to="/shop" className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition">🛒 Shop</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="block px-4 py-2 rounded-lg hover:bg-blue-700 transition">🔧 Admin</Link>
            )}
          </nav>

          <hr className="opacity-30 mb-6" />

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Account Information</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {isEditing ? 'Cancel' : '✏️ Edit'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={user?.name} 
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 disabled:opacity-60"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={user?.email} 
                  disabled={true}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 disabled:opacity-60"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Account Type</label>
                <input 
                  type="text" 
                  value={user?.role === 'admin' ? 'Administrator' : 'User'} 
                  disabled={true}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 disabled:opacity-60"
                />
              </div>

              {/* Subscription Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subscription Status</label>
                <input 
                  type="text" 
                  value={user?.isSubscribed ? 'Premium (Active)' : 'Free'} 
                  disabled={true}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 disabled:opacity-60"
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex gap-4">
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                  ✓ Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  ✕ Discard
                </button>
              </div>
            )}
          </div>

          {/* Subscription Card */}
          <div className={`rounded-lg shadow-lg p-8 ${user?.isSubscribed ? 'bg-gradient-to-r from-green-100 to-emerald-100' : 'bg-gradient-to-r from-yellow-100 to-orange-100'}`}>
            <h2 className="text-2xl font-bold mb-4">
              {user?.isSubscribed ? '⭐ Premium Membership' : '📢 Upgrade to Premium'}
            </h2>
            
            {user?.isSubscribed ? (
              <div>
                <p className="text-gray-700 mb-4">Thank you for being a premium member! You have access to:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Exclusive match predictions</li>
                  <li>✓ AI-based player analysis</li>
                  <li>✓ Weekly trends & insights</li>
                  <li>✓ Priority customer support</li>
                </ul>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 mb-4">Unlock premium features for just ₹499:</p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>✓ Exclusive match predictions</li>
                  <li>✓ AI-based player analysis</li>
                  <li>✓ Weekly trends & insights</li>
                  <li>✓ Priority customer support</li>
                </ul>
                <Link to="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                  Subscribe Now →
                </Link>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions or need assistance, please contact our support team.
            </p>
            <a href="mailto:support@iplpredictor.com" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold inline-block">
              📧 Contact Support
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}