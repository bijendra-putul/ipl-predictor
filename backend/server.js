const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const subscriptionRoutes = require('./routes/subscription');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ipl-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');
  // Create admin user if not exists
  const adminExists = await User.findOne({ email: 'admin@ipl.com' });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({ name: 'Admin', email: 'admin@ipl.com', password: hashedPassword, role: 'admin' });
    await admin.save();
    console.log('Admin user created: email: admin@ipl.com, password: admin123');
  }

  // Create demo user for IPL Prediction
  const demoExists = await User.findOne({ email: 'iplpredictor@demo.com' });
  if (!demoExists) {
    const hashedPassword = await bcrypt.hash('demo123', 10);
    const demo = new User({
      name: 'IPL Predictor Demo',
      email: 'iplpredictor@demo.com',
      password: hashedPassword,
      isSubscribed: true,
      subscriptionDate: new Date()
    });
    await demo.save();
    console.log('Demo user created: email: iplpredictor@demo.com, password: demo123');
  }
})
.catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));