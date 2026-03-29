import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Product added to cart!');
    navigate('/cart');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate('/shop')}
          className="mb-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          ← Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg">
                <span className="text-2xl">⭐</span>
                <span className="text-lg font-bold">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-300">
              <p className="text-gray-700 text-lg mb-4">{product.description}</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Category: <span className="font-semibold">{product.category}</span></li>
                <li>Stock Available: <span className="font-semibold text-green-600">{product.stock} units</span></li>
                <li>Premium Quality Material</li>
                <li>Easy Returns & Exchanges</li>
              </ul>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-800 mb-3">Select Quantity:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border border-gray-300 rounded-lg py-2 text-lg font-bold"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition text-lg"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition text-lg"
              >
                Continue Shopping
              </button>
            </div>

            {/* Shipping Info */}
            <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-2">🚚 Shipping Information</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ Free shipping on orders above ₹500</li>
                <li>✅ Delivery within 3-5 business days</li>
                <li>✅ Cash on Delivery available</li>
                <li>✅ 30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products / Product Specs */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Product Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">📦</div>
              <p className="font-semibold text-gray-800">Packed</p>
              <p className="text-gray-600">In secure box</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <p className="font-semibold text-gray-800">Authentic</p>
              <p className="text-gray-600">100% Original</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-semibold text-gray-800">Premium</p>
              <p className="text-gray-600">High Quality</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💯</div>
              <p className="font-semibold text-gray-800">Guaranteed</p>
              <p className="text-gray-600">Full warranty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
