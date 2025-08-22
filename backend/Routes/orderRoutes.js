const express = require('express');
const { createOrder, getOrders } = require('../Controllers/orderController');
const auth = require('../Middleware/auth');
const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getOrders);

module.exports = router;