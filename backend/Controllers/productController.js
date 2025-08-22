const Product = require('../Models/Product');

exports.createProduct = async (req, res) => {
  const { title, description, price, stock, category, image } = req.body;

  if (!title || !price || !stock) {
    return res.status(400).json({ error: 'Title, price, and stock are required' });
  }

  try {
    const product = new Product({ title, description, price, stock, category, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
