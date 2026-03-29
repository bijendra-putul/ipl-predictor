const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

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

// Create order and generate Razorpay order
router.post('/create-order', verifyToken, async (req, res) => {
  const { items, shippingAddress, totalAmount } = req.body;
  
  try {
    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`
    });

    const order = new Order({
      userId: req.userId,
      items,
      totalAmount,
      shippingAddress,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: 'pending',
      orderStatus: 'pending'
    });

    await order.save();
    res.status(201).json({ 
      message: 'Order created',
      order,
      razorpayOrderId: razorpayOrder.id,
      razorpayKey: process.env.RAZORPAY_KEY
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Verify payment and update order
router.post('/verify-payment', async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  try {
    // Verify signature
    const crypto = require('crypto');
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpaySignature) {
      // Update order status
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId },
        { 
          paymentStatus: 'completed',
          orderStatus: 'processing',
          razorpayPaymentId,
          updatedAt: Date.now()
        },
        { new: true }
      );

      res.json({ message: 'Payment verified', order });
    } else {
      await Order.findOneAndUpdate(
        { razorpayOrderId },
        { paymentStatus: 'failed' }
      );
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's orders
router.get('/user/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders (admin only)
router.get('/admin/all-orders', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('items.productId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (admin only)
router.put('/admin/update-status/:orderId', verifyToken, verifyAdmin, async (req, res) => {
  const { orderStatus } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { orderStatus, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single order details
router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items.productId');
    
    // Verify user owns this order or is admin
    const user = await User.findById(req.userId);
    if (order.userId.toString() !== req.userId && user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
