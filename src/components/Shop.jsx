import { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import axios from 'axios';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchParams] = useSearchParams();
  const { addToCart, getCartCount } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Check if category is in URL params
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
    fetchCategories();
  }, [searchParams]);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/products/categories/all`);
      setCategories(['All', ...response.data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async (category = null) => {
    try {
      setLoading(true);
      const url = category && category !== 'All' 
        ? `${apiUrl}/api/products?category=${category}` 
        : `${apiUrl}/api/products`;
      const response = await axios.get(url);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-3">🛒 IPL Fan Shop</h1>
          <p className="text-xl">Authentic IPL Jerseys, Caps & Merchandise | Premium Quality | Best Prices</p>
          <div className="mt-6 flex justify-center">
            <Link to="/cart" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
              🛒 Cart ({getCartCount()})
            </Link>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🏷️ Shop by Category:</h3>
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-800 border-2 border-blue-600 hover:bg-blue-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center text-2xl font-bold text-gray-600">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-2xl font-bold text-gray-600">No products found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105">
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100 h-64">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ {product.rating}
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.category}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-2xl font-bold text-green-600 mb-2">₹{product.price}</p>
                  <p className="text-sm text-gray-500 mb-4">Stock: {product.stock} | Reviews: {product.reviews}</p>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Link to={`/product/${product._id}`} className="flex-1">
                      <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">100% Authentic</h3>
            <p className="text-gray-600">Genuine IPL merchandise from official partners</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Fast Delivery</h3>
            <p className="text-gray-600">Quick shipping to your doorstep</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Best Prices</h3>
            <p className="text-gray-600">Competitive rates with exclusive discounts</p>
          </div>
        </div>

        {/* Info Notice */}
        <div className="mt-12 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-6 text-center">
          <p className="text-gray-700">
            <strong>💡 Tip:</strong> Enjoy direct shopping with secure payment options. Your orders are tracked and delivered efficiently!
          </p>
        </div>
      </div>
    </div>
  );
}
