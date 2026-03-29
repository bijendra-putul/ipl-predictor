import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

export default function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${apiUrl}/api/orders/user/my-orders`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusBadge = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">No Orders Yet</h1>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping now!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">📦 My Orders</h1>

        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm opacity-90">Order ID</p>
                    <p className="font-bold text-lg">{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Date</p>
                    <p className="font-bold text-lg">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Total Amount</p>
                    <p className="font-bold text-lg">₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Status</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getOrderStatusBadge(order.orderStatus)}`}>
                        {order.orderStatus.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPaymentStatusBadge(order.paymentStatus)}`}>
                        {order.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Items in Order</h3>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{item.productName}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">₹{item.price}</p>
                        <p className="text-sm text-gray-600">₹{(item.price * item.quantity).toFixed(2)} total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="p-6 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Shipping Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{order.shippingAddress.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{order.shippingAddress.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-semibold">
                      {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Track */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Order Track</h3>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">✓</div>
                    <p className="text-sm font-semibold">Order Placed</p>
                    <p className="text-xs text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex-1 border-t-2 border-gray-300 mx-2"></div>
                  <div className={`text-center ${order.paymentStatus === 'completed' ? '' : 'opacity-50'}`}>
                    <div className={`w-10 h-10 ${order.paymentStatus === 'completed' ? 'bg-green-500' : 'bg-gray-300'} text-white rounded-full flex items-center justify-center mx-auto mb-2`}>
                      {order.paymentStatus === 'completed' ? '✓' : '○'}
                    </div>
                    <p className="text-sm font-semibold">Payment Done</p>
                  </div>
                  <div className={`flex-1 border-t-2 ${order.orderStatus !== 'pending' ? 'border-gray-300' : 'border-gray-200'} mx-2`}></div>
                  <div className={`text-center ${order.orderStatus !== 'pending' ? '' : 'opacity-50'}`}>
                    <div className={`w-10 h-10 ${order.orderStatus !== 'pending' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-full flex items-center justify-center mx-auto mb-2`}>
                      {order.orderStatus !== 'pending' ? '📦' : '○'}
                    </div>
                    <p className="text-sm font-semibold">In Transit</p>
                  </div>
                  <div className={`flex-1 border-t-2 ${order.orderStatus === 'delivered' ? 'border-gray-300' : 'border-gray-200'} mx-2`}></div>
                  <div className={`text-center ${order.orderStatus === 'delivered' ? '' : 'opacity-50'}`}>
                    <div className={`w-10 h-10 ${order.orderStatus === 'delivered' ? 'bg-green-500' : 'bg-gray-300'} text-white rounded-full flex items-center justify-center mx-auto mb-2`}>
                      {order.orderStatus === 'delivered' ? '✓' : '○'}
                    </div>
                    <p className="text-sm font-semibold">Delivered</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const getOrderStatusBadge = (status) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

const getPaymentStatusBadge = (status) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800'
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};
