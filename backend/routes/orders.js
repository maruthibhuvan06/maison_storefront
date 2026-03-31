const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST create order (checkout)
router.post('/', async (req, res) => {
  try {
    const { items, customerEmail } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in order' });
    }
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shipping = subtotal > 50000 ? 0 : 599;
    const order = new Order({
      items,
      subtotal,
      shipping,
      total: subtotal + shipping,
      customerEmail: customerEmail || ''
    });
    await order.save();
    res.status(201).json({ success: true, orderId: order._id, order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
