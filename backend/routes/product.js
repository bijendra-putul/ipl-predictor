const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'your_secret_key', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// Middleware to verify admin role
const verifyAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};

// Get all products (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (admin only)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  const { name, description, price, image, category, stock, rating, reviews } = req.body;
  
  try {
    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      stock,
      rating,
      reviews
    });
    
    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product (admin only)
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ message: 'Product updated', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product (admin only)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
