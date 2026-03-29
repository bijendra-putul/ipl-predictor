import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import axios from 'axios';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  const { cart, shippingInfo } = location.state || { cart: [], shippingInfo: {} };
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = (total * 0.05).toFixed(2);
  const shipping = total > 500 ? 0 : 100;
  const finalTotal = (parseFloat(total) + parseFloat(gst) + shipping).toFixed(2);

  useEffect(() => {
    if (!user || cart.length === 0) {
      navigate('/cart');
    }
  }, [user, cart, navigate]);

  const handlePayment = async () => {
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      alert('Please fill all shipping information');
      return;
    }

    setLoading(true);

    try {
      // Create order using backend
      const orderData = {
        items: cart.map(item => ({
          productId: item._id,
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: parseFloat(finalTotal),
        shippingAddress: shippingInfo
      };

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${apiUrl}/api/orders/create-order`,
        orderData,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      const { razorpayOrderId, razorpayKey: key } = response.data;
      setOrderCreated(true);

      // Razorpay payment initialization
      const options = {
        key: razorpayKey || key,
        amount: parseFloat(finalTotal) * 100,
        currency: 'INR',
        name: 'IPL Fan Shop',
        description: 'IPL Merchandise Purchase',
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // Verify payment
            await axios.post(
              `${apiUrl}/api/orders/verify-payment`,
              {
                razorpayOrderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              }
            );

            // Clear cart and redirect
            clearCart();
            alert('Payment successful! Your order has been placed.');
            navigate('/orders');
          } catch (error) {
            alert('Payment verification failed');
            console.error(error);
          }
        },
        prefill: {
          name: shippingInfo.name,
          email: user?.email,
          contact: shippingInfo.phone
        },
        theme: {
          color: '#3b82f6'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on('payment.failed', function (response) {
        alert('Payment failed: ' + response.error.description);
        setLoading(false);
      });
    } catch (error) {
      alert('Error creating order: ' + error.message);
      console.error(error);
      setLoading(false);
    }
  };

  if (!user || cart.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Review */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Review</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-300">
              {cart.map(item => (
                <div key={item._id} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-green-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
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

            <div className="flex justify-between text-2xl font-bold text-gray-800">
              <span>Total:</span>
              <span className="text-green-600">₹{finalTotal}</span>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="space-y-6">
            {/* Shipping Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping Address</h2>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Name:</span> {shippingInfo.name}</p>
                <p><span className="font-semibold">Phone:</span> {shippingInfo.phone}</p>
                <p><span className="font-semibold">Address:</span> {shippingInfo.address}</p>
                <p><span className="font-semibold">City:</span> {shippingInfo.city}</p>
                <p><span className="font-semibold">State:</span> {shippingInfo.state}</p>
                <p><span className="font-semibold">Pincode:</span> {shippingInfo.pincode}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Method</h2>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                <p className="text-blue-900 font-semibold">💳 Secure Payment with Razorpay</p>
                <p className="text-blue-800 text-sm mt-2">Your payment information is secure and encrypted</p>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition text-lg disabled:bg-gray-400"
              >
                {loading ? 'Processing...' : '💳 Pay ₹' + finalTotal}
              </button>

              <button
                onClick={() => navigate('/cart')}
                className="w-full bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition mt-4"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🔒 Security & Policies</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
            <li>✅ 100% Secure SSL Encrypted</li>
            <li>✅ Safe Payment Gateway</li>
            <li>✅ Money-back Guarantee</li>
            <li>✅ 30-day Return Policy</li>
            <li>✅ Authentic Products Only</li>
            <li>✅ Verified Seller</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
