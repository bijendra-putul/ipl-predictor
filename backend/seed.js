const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  // Jerseys
  {
    name: 'IPL Official Jersey - Mumbai Indians',
    description: 'Official MI jersey with embroidered logo and player name',
    price: 3500,
    image: 'https://via.placeholder.com/300?text=MI+Jersey',
    category: 'Jerseys',
    stock: 50,
    rating: 4.8,
    reviews: 234
  },
  {
    name: 'IPL Official Jersey - Royal Challengers Bangalore',
    description: 'Official RCB jersey with embroidered logo and player name',
    price: 3500,
    image: 'https://via.placeholder.com/300?text=RCB+Jersey',
    category: 'Jerseys',
    stock: 50,
    rating: 4.7,
    reviews: 189
  },
  {
    name: 'IPL Official Jersey - Delhi Capitals',
    description: 'Official DC jersey with embroidered logo and player name',
    price: 3500,
    image: 'https://via.placeholder.com/300?text=DC+Jersey',
    category: 'Jerseys',
    stock: 50,
    rating: 4.6,
    reviews: 156
  },
  {
    name: 'IPL Official Jersey - Kolkata Knight Riders',
    description: 'Official KKR jersey with embroidered logo and player name',
    price: 3500,
    image: 'https://via.placeholder.com/300?text=KKR+Jersey',
    category: 'Jerseys',
    stock: 50,
    rating: 4.7,
    reviews: 198
  },
  // Caps
  {
    name: 'IPL Limited Edition Cap - MI',
    description: 'Premium limited edition Mumbai Indians cap',
    price: 899,
    image: 'https://via.placeholder.com/300?text=MI+Cap',
    category: 'Caps',
    stock: 100,
    rating: 4.5,
    reviews: 89
  },
  {
    name: 'IPL Limited Edition Cap - RCB',
    description: 'Premium limited edition Royal Challengers Bangalore cap',
    price: 899,
    image: 'https://via.placeholder.com/300?text=RCB+Cap',
    category: 'Caps',
    stock: 100,
    rating: 4.5,
    reviews: 76
  },
  // Bats
  {
    name: 'IPL Cricket Bat - Professional Grade',
    description: 'Professional grade cricket bat with willow finish',
    price: 5999,
    image: 'https://via.placeholder.com/300?text=Cricket+Bat',
    category: 'Bats',
    stock: 30,
    rating: 4.9,
    reviews: 456
  },
  // Balls
  {
    name: 'IPL Cricket Ball - Tournament Grade',
    description: 'Official tournament grade cricket ball set (6 pieces)',
    price: 2499,
    image: 'https://via.placeholder.com/300?text=Cricket+Balls',
    category: 'Balls',
    stock: 60,
    rating: 4.6,
    reviews: 234
  },
  // Merchandise
  {
    name: 'IPL Water Bottle - 1L',
    description: 'Insulated water bottle with IPL logo - keeps drinks cold for 24hrs',
    price: 599,
    image: 'https://via.placeholder.com/300?text=Water+Bottle',
    category: 'Merchandise',
    stock: 150,
    rating: 4.4,
    reviews: 123
  },
  {
    name: 'IPL Wristband Set - 5 Pieces',
    description: 'Colorful IPL team wristbands - one for each team',
    price: 399,
    image: 'https://via.placeholder.com/300?text=Wristbands',
    category: 'Merchandise',
    stock: 200,
    rating: 4.3,
    reviews: 98
  },
  {
    name: 'IPL Keychain Collection - Metal',
    description: 'Metal keychains with all 10 IPL team logos',
    price: 299,
    image: 'https://via.placeholder.com/300?text=Keychains',
    category: 'Merchandise',
    stock: 250,
    rating: 4.2,
    reviews: 67
  },
  {
    name: 'IPL Coffee Mug - Ceramic',
    description: 'Premium ceramic coffee mug with IPL team design',
    price: 349,
    image: 'https://via.placeholder.com/300?text=Coffee+Mug',
    category: 'Merchandise',
    stock: 180,
    rating: 4.5,
    reviews: 145
  },
  {
    name: 'IPL T-Shirt - Unisex',
    description: 'Comfortable cotton T-shirt with IPL branding',
    price: 549,
    image: 'https://via.placeholder.com/300?text=IPL+TShirt',
    category: 'Merchandise',
    stock: 120,
    rating: 4.4,
    reviews: 201
  },
  {
    name: 'IPL Phone Case - All Phones',
    description: 'Protective phone case with IPL team designs - available for all phones',
    price: 499,
    image: 'https://via.placeholder.com/300?text=Phone+Case',
    category: 'Merchandise',
    stock: 140,
    rating: 4.3,
    reviews: 87
  },
  {
    name: 'IPL Batting Gloves - Professional',
    description: 'Professional grade batting gloves with padded protection',
    price: 1899,
    image: 'https://via.placeholder.com/300?text=Batting+Gloves',
    category: 'Merchandise',
    stock: 40,
    rating: 4.7,
    reviews: 156
  },
  {
    name: 'IPL Trading Cards - Complete Set',
    description: 'Complete set of 200 official IPL trading cards with rare editions',
    price: 1299,
    image: 'https://via.placeholder.com/300?text=Trading+Cards',
    category: 'Merchandise',
    stock: 80,
    rating: 4.6,
    reviews: 234
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ipl-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

connectDB();
