const mongoose = require('mongoose');
const Product = require('./Models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    title: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 89.99,
    stock: 50,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
  },
  {
    title: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.",
    price: 199.99,
    stock: 30,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
  },
  {
    title: "Organic Cotton T-Shirt",
    description: "Comfortable and eco-friendly cotton t-shirt available in multiple colors and sizes.",
    price: 24.99,
    stock: 100,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"
  },
  {
    title: "Stainless Steel Water Bottle",
    description: "Keep your drinks cold for 24 hours with this durable stainless steel water bottle.",
    price: 19.99,
    stock: 75,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop"
  },
  {
    title: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 39.99,
    stock: 40,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop"
  },
  {
    title: "Leather Wallet",
    description: "Premium leather wallet with multiple card slots and RFID protection.",
    price: 49.99,
    stock: 60,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop"
  },
  {
    title: "Portable Bluetooth Speaker",
    description: "Waterproof portable speaker with 360-degree sound and 12-hour battery life.",
    price: 79.99,
    stock: 35,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop"
  },
  {
    title: "Yoga Mat",
    description: "Non-slip yoga mat made from eco-friendly materials, perfect for home workouts.",
    price: 29.99,
    stock: 80,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Added ${products.length} sample products`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedProducts(); 