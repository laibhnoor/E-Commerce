const Wishlist = require('../Models/Wishlist');

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user._id;

    console.log('Adding to wishlist, productId:', productId, 'user:', user); // Debug

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    let wishlist = await Wishlist.findOne({ user });
    if (!wishlist) {
      wishlist = new Wishlist({ user, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error('Wishlist error:', error.message); // Debug
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }
    res.json(wishlist);
  } catch (error) {
    console.error('Wishlist error:', error.message); // Debug
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user._id;

    console.log('Removing from wishlist, productId:', productId, 'user:', user); // Debug

    const wishlist = await Wishlist.findOne({ user });
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    console.error('Wishlist error:', error.message); // Debug
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
