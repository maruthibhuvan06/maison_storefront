const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Sets', 'Accessories']
  },
  emoji: {
    type: String,
    default: '👕'
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    default: null
  },
  colors: [{
    type: String  // Hex color values e.g. '#c4a882'
  }],
  colorNames: [{
    type: String  // e.g. 'Ivory', 'Caramel'
  }],
  sizes: [{
    type: String  // e.g. 'XS', 'S', 'M', 'L', 'XL', 'ONE SIZE'
  }],
  badge: {
    type: String,
    enum: ['new', 'sale', 'bestseller', null],
    default: null
  },
  description: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 100
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
