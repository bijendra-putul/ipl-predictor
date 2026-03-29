import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to continue');
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    // Pass cart and shipping info to checkout
    navigate('/checkout', { state: { cart, shippingInfo } });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <Link to="/shop" className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition text-lg font-semibold">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const total = getTotal();
  const gst = (total * 0.05).toFixed(2);
  const shipping = total > 500 ? 0 : 100;
  const finalTotal = (parseFloat(total) + parseFloat(gst) + shipping).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">🛒 Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="cart-page bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Product</th>
                    <th className="px-6 py-4 text-center">Price</th>
                    <th className="px-6 py-4 text-center">Quantity</th>
                    <th className="px-6 py-4 text-center">Total</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <span className="font-semibold text-gray-800">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-green-600">₹{item.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                            className="w-12 text-center border border-gray-300 rounded py-1"
                          />
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold">₹{(item.price * item.quantity).toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          🗑️ Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Shipping Information */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={shippingInfo.name}
                  onChange={handleShippingChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={shippingInfo.phone}
                  onChange={handleShippingChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 md:col-span-2"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={shippingInfo.state}
                  onChange={handleShippingChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={shippingInfo.pincode}
                  onChange={handleShippingChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-300">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-bold">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>GST (5%):</span>
                  <span className="font-bold">₹{gst}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping:</span>
                  <span className="font-bold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-gray-800 mb-6 pb-6 border-b border-gray-300">
                <span>Total:</span>
                <span className="text-green-600">₹{finalTotal}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition mb-4 text-lg"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/shop')}
                className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition mb-4 text-lg"
              >
                Continue Shopping
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition text-lg"
              >
                Clear Cart
              </button>

              <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200 text-sm text-gray-700">
                <p className="mb-2">✅ Free shipping on orders above ₹500</p>
                <p className="mb-2">✅ Secure payment with Razorpay</p>
                <p>✅ 30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
