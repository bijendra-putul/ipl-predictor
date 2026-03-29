import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-600 mb-2">🏏 IPL Predictor</h1>
            <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
            <p className="text-gray-600 mt-2">Access your premium predictions</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <p className="text-center text-gray-600">
            Don't have an account?
            <Link to="/register" className="ml-1 text-green-600 font-semibold hover:text-green-700">
              Register here
            </Link>
          </p>

          <p className="text-center text-gray-600 mt-4">
            <Link to="/" className="text-blue-600 hover:text-blue-700 text-sm">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}