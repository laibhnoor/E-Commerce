const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
  total: { type: Number, default: 0 },
}, { timestamps: true });

// =======================================================
// UNCOMMENT THIS ENTIRE BLOCK. This is the smart code.
cartSchema.pre('save', async function (next) {
  const cart = this;
  // It needs the 'Product' model to look up prices
  const Product = mongoose.model('Product'); 

  try {
    const productIds = cart.items.map(item => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    cart.total = cart.items.reduce((acc, cartItem) => {
      const product = products.find(p => p._id.equals(cartItem.product));
      // If the product is found, add its price to the total
      if (product) {
        return acc + (product.price * cartItem.quantity);
      }
      return acc;
    }, 0);

    next();
  } catch (error) {
    next(error);
  }
});
// =======================================================

module.exports = mongoose.model('Cart', cartSchema);