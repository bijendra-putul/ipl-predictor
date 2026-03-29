const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Create order
router.post('/create-order', verifyToken, async (req, res) => {
  try {
    const options = {
      amount: 49900, // ₹499
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify payment and subscribe
router.post('/verify-payment', verifyToken, async (req, res) => {
  const { paymentId, orderId, signature } = req.body;
  try {
    // Verify signature (in production, implement proper verification)
    // For now, assume success
    const user = await User.findById(req.user.id);
    user.isSubscribed = true;
    user.subscriptionDate = new Date();
    await user.save();

    res.json({ message: 'Subscription successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;