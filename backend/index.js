const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const wishlistRoutes = require('./Routes/wishlistRoutes');

dotenv.config();

const app = express();

// ✅ CORS FIX (IMPORTANT)
app.use(cors({
  origin: [
    "http://localhost:5173", // local frontend (Vite)
    'https://e-commerce-psi-rose-61.vercel.app'
  ],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);

// ✅ Health check route (for Render)
app.get('/ping', (req, res) => {
  res.send('✅ Server is running');
});

// ✅ ENV variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ MongoDB connection + server start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({
    error: 'Server error',
    details: err.message
  });
});