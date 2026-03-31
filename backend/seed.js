require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Dusk Slip Dress',
    category: 'Dresses',
    emoji: '👗',
    price: 26880,
    originalPrice: 33480,
    colors: ['#c4a882', '#2c3e50', '#8b6355'],
    colorNames: ['Ivory', 'Navy', 'Cognac'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: null,
    featured: true,
    description: 'A fluid slip cut in our signature bias-washed fabric. The draped neckline and subtle side slit make this piece a quiet statement.',
  },
  {
    name: 'Noir Overcoat',
    category: 'Outerwear',
    emoji: '🧥',
    price: 60480,
    originalPrice: null,
    colors: ['#1a1a1a', '#4a3728', '#5c6e6a'],
    colorNames: ['Noir', 'Tobacco', 'Slate'],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: null,
    featured: true,
    description: 'Tailored in our structured bouclé blend. The minimal lapel and concealed closure reflect our belief that restraint is the ultimate luxury.',
  },
  {
    name: 'Sand Linen Set',
    category: 'Sets',
    emoji: '👔',
    price: 26040,
    originalPrice: null,
    colors: ['#c8b89a', '#9aac94', '#d4c4b4'],
    colorNames: ['Sand', 'Sage', 'Stone'],
    sizes: ['XS', 'S', 'M', 'L'],
    badge: null,
    featured: true,
    description: 'A coordinated set designed to be worn together or apart. Each piece proportioned to complement the other.',
  },
  {
    name: 'Ceramic Tote',
    category: 'Accessories',
    emoji: '👜',
    price: 13540,
    originalPrice: null,
    colors: ['#9b8ec4', '#c4a882', '#2c3e50'],
    colorNames: ['Lavender', 'Caramel', 'Navy'],
    sizes: ['ONE SIZE'],
    badge: null,
    featured: true,
    description: 'A sculptural tote in structured leather. The minimal hardware and clean lines make this piece both functional and quietly beautiful.',
  },
  {
    name: 'Alabaster Shirt',
    category: 'Tops',
    emoji: '👕',
    price: 14280,
    originalPrice: null,
    colors: ['#f0ebe0', '#c8b89a', '#4a3728'],
    colorNames: ['Alabaster', 'Ecru', 'Tobacco'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'new',
    featured: false,
    description: 'Cut from our signature garment-washed cotton. The relaxed silhouette and dropped shoulder give a studied nonchalance.',
  },
  {
    name: 'Slate Wide Trousers',
    category: 'Bottoms',
    emoji: '👖',
    price: 22680,
    originalPrice: 28350,
    colors: ['#5c6e6a', '#1a1a1a', '#4a3728'],
    colorNames: ['Slate', 'Noir', 'Tobacco'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'sale',
    featured: false,
    description: 'Wide-leg trousers in a crisp linen-cotton blend. The high rise and flat front create an elongating line.',
  },
  {
    name: 'Ivory Knit',
    category: 'Tops',
    emoji: '🧶',
    price: 18900,
    originalPrice: null,
    colors: ['#f0ebe0', '#c4a882', '#9aac94'],
    colorNames: ['Ivory', 'Oat', 'Sage'],
    sizes: ['S', 'M', 'L'],
    badge: 'bestseller',
    featured: false,
    description: 'A relaxed knit in our signature Italian merino blend. Minimal and considered — a wardrobe anchor.',
  },
  {
    name: 'Obsidian Jacket',
    category: 'Outerwear',
    emoji: '🧥',
    price: 48600,
    originalPrice: null,
    colors: ['#1a1a1a', '#2c3e50'],
    colorNames: ['Obsidian', 'Midnight'],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: null,
    featured: false,
    description: 'A structured jacket in our signature wool-blend. Clean lines, considered detail.',
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/maison');
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const inserted = await Product.insertMany(products);
    console.log(`✓ Seeded ${inserted.length} products`);

    mongoose.disconnect();
    console.log('Done. Database disconnected.');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
