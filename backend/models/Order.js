const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  emoji: String,
  price: Number,
  size: String,
  color: String,
  qty: { type: Number, default: 1 }
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  subtotal: Number,
  shipping: { type: Number, default: 599 },
  total: Number,
  customerEmail: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
