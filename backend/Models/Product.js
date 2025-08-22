const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product title required"]
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: [true, "Product price required"],
    min: [0, "Price cannot be negative"]
  },
  image: {
    type: String
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, "Stock cannot be negative"]
  },
  category: {
    type: String
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);