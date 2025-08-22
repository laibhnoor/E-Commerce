const express = require('express');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../Controllers/wishlistController');
const auth = require('../Middleware/auth');
const router = express.Router();

router.post('/', auth, addToWishlist);
router.get('/', auth, getWishlist);
router.delete('/', auth, removeFromWishlist);

module.exports = router;