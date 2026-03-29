import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('subscribers');
  const [subscribers, setSubscribers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, premiumUsers: 0, freeUsers: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '', image: '', category: 'Jerseys' });
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const categories = ['Jerseys', 'Caps', 'Bats', 'Balls', 'Merchandise'];

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchSubscribers();
      fetchProducts();
      fetchOrders();
    }
  }, [user]);

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/admin/subscribers`);
      setSubscribers(res.data);
      const active = res.data.filter(s => s.isSubscribed).length;
      setStats(prev => ({...prev, totalUsers: res.data.length, premiumUsers: active, freeUsers: res.data.length - active}));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/products`);
      setProducts(res.data);
      setStats(prev => ({...prev, totalProducts: res.data.length}));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `${apiUrl}/api/orders/admin/all-orders`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setOrders(res.data);
      const revenue = res.data.filter(o => o.paymentStatus === 'completed').reduce((sum, o) => sum + o.totalAmount, 0);
      setStats(prev => ({...prev, totalOrders: res.data.length, totalRevenue: revenue}));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${apiUrl}/api/products`,
        newProduct,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      alert('Product added successfully');
      setNewProduct({ name: '', description: '', price: '', stock: '', image: '', category: 'IPL' });
      setShowAddProduct(false);
      fetchProducts();
    } catch (err) {
      alert('Error adding product: ' + err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `${apiUrl}/api/products/${id}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        alert('Product deleted');
        fetchProducts();
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${apiUrl}/api/orders/admin/update-status/${orderId}`,
        { orderStatus: status },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      alert('Order status updated');
      fetchOrders();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  if (user?.role !== 'admin') return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-2">Access Denied</h2>
        <p className="text-gray-600">Only admins can view this page</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Go Home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">🔧 Admin Panel</h2>
          
          <div className="space-y-4 mb-8">
            <div className="bg-blue-600 rounded-lg p-4">
              <p className="text-xs opacity-80">TOTAL USERS</p>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="bg-green-600 rounded-lg p-4">
              <p className="text-xs opacity-80">PREMIUM</p>
              <p className="text-2xl font-bold">{stats.premiumUsers}</p>
            </div>
            <div className="bg-purple-600 rounded-lg p-4">
              <p className="text-xs opacity-80">PRODUCTS</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="bg-orange-600 rounded-lg p-4">
              <p className="text-xs opacity-80">ORDERS</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
            <div className="bg-yellow-600 rounded-lg p-4">
              <p className="text-xs opacity-80">REVENUE</p>
              <p className="text-2xl font-bold">₹{stats.totalRevenue.toFixed(0)}</p>
            </div>
          </div>

          <hr className="my-6 opacity-30" />

          <div className="bg-slate-700 rounded-lg p-4 mb-6">
            <p className="text-xs opacity-70">LOGGED IN AS</p>
            <p className="text-lg font-semibold mt-2">{user?.name}</p>
            <p className="text-sm opacity-70">{user?.email}</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'subscribers' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
            >
              👥 Subscribers
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'products' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
            >
              📦 Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'orders' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
            >
              🛒 Orders
            </button>
            <hr className="my-4 opacity-30" />
            <Link to="/profile" className="block px-4 py-3 rounded-lg hover:bg-slate-700 transition">👤 Profile</Link>
            <Link to="/" className="block px-4 py-3 rounded-lg hover:bg-slate-700 transition">🏠 Home</Link>
            <button onClick={logout} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-600 transition">🚪 Logout</button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl">
          {activeTab === 'subscribers' && (
            <>
              <h1 className="text-4xl font-bold text-gray-800 mb-8">👥 Subscribers</h1>
              <div className="adminpage bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left">#</th>
                        <th className="px-6 py-4 text-left">Name</th>
                        <th className="px-6 py-4 text-left">Email</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-left">Joined</th>
                        <th className="px-6 py-4 text-left">Premium</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {subscribers.map((sub, i) => (
                        <tr key={sub._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">{i + 1}</td>
                          <td className="px-6 py-4 font-semibold">{sub.name}</td>
                          <td className="px-6 py-4">{sub.email}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${sub.isSubscribed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                              {sub.isSubscribed ? '✓ Premium' : 'Free'}
                            </span>
                          </td>
                          <td className="px-6 py-4">{new Date(sub.createdAt).toLocaleDateString('en-IN')}</td>
                          <td className="px-6 py-4">{sub.subscriptionDate ? new Date(sub.subscriptionDate).toLocaleDateString('en-IN') : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">📦 Products</h1>
                <button
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-bold"
                >
                  {showAddProduct ? '✕ Cancel' : '+ Add'}
                </button>
              </div>

              {showAddProduct && (
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} required className="px-4 py-2 border rounded-lg" />
                    <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required className="px-4 py-2 border rounded-lg" />
                    <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} required rows="2" className="px-4 py-2 border rounded-lg col-span-2" />
                    <input type="number" placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} required className="px-4 py-2 border rounded-lg" />
                    <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} required className="px-4 py-2 border rounded-lg">
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <input type="text" placeholder="Image URL" value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} required className="px-4 py-2 border rounded-lg col-span-2" />
                    <button type="submit" className="col-span-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 font-bold">Add Product</button>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold mb-2">{product.name}</h3>
                      <p className="text-green-600 font-bold mb-2">₹{product.price}</p>
                      <button onClick={() => handleDeleteProduct(product._id)} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <>
              <h1 className="text-4xl font-bold text-gray-800 mb-8">🛒 Orders</h1>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left">#</th>
                        <th className="px-6 py-4 text-left">Customer</th>
                        <th className="px-6 py-4 text-left">Amount</th>
                        <th className="px-6 py-4 text-left">Payment</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order, i) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">{i + 1}</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold">{order.userId?.name}</div>
                            <div className="text-xs text-gray-600">{order.userId?.email}</div>
                          </td>
                          <td className="px-6 py-4 font-bold">₹{order.totalAmount.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${order.paymentStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {order.paymentStatus.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <select value={order.orderStatus} onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)} className="px-2 py-1 border rounded text-sm">
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
