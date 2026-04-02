require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ── MIDDLEWARE ──
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:5500', '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// ── DATABASE ──
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/maison')
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => console.error('✗ MongoDB error:', err));

// ── ROUTES ──
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// ── HEALTH CHECK ──
app.get('/', (req, res) => res.send('MAISON API is running!'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MAISON API running', timestamp: new Date() });
});

// ── START ──
app.listen(PORT, () => {
  console.log(`\n✦ MAISON Backend running on http://localhost:${PORT}`);
  console.log(`✦ Health check: http://localhost:${PORT}/api/health\n`);
});
