const Cart = require('../Models/Cart');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const user = req.user._id; // Changed from userId to user

  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Product ID and quantity are required' });
  }

  try {
    let cart = await Cart.findOne({ user });
    if (!cart) {
      cart = new Cart({ user, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity }); // Changed productId to product
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const user = req.user._id;

  try {
    const cart = await Cart.findOne({ user });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const user = req.user._id;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: 'Valid quantity is required' });
  }

  try {
    const cart = await Cart.findOne({ user });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
