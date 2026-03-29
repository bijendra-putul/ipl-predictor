const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    if (verified.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Get all subscribers
router.get('/subscribers', verifyAdmin, async (req, res) => {
  try {
    const subscribers = await User.find({ isSubscribed: true }).select('-password');
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;