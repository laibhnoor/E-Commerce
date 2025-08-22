const Cart = require('../Models/Cart');
const Order = require('../Models/Order');
const Product = require('../Models/Product');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const orderItems = cart.items.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const total = cart.total;

    // Update product stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product?.title || 'product'}` });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      userId,
      items: orderItems,
      total,
      status: 'pending',
    });

    await order.save();
    await Cart.findOneAndUpdate({ user: userId }, { items: [], total: 0 });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
