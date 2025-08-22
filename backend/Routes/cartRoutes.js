const express = require('express');
const { addToCart, getCart, removeFromCart, updateQuantity } = require('../Controllers/cartController');
const auth = require('../Middleware/auth');

const router = express.Router();

router.post('/', auth, addToCart);
router.get('/', auth, getCart);
router.delete('/:productId', auth, removeFromCart);
router.put('/:productId', auth, updateQuantity);
 
module.exports = router;