// ── CONFIG ──
const API_BASE = 'http://localhost:5000/api';

// ── BASKET STATE ──
let basket = JSON.parse(localStorage.getItem('maison_basket') || '[]');

function saveBasket() {
  localStorage.setItem('maison_basket', JSON.stringify(basket));
  updateBasketCount();
}

function updateBasketCount() {
  const total = basket.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.basket-count').forEach(el => {
    el.textContent = total;
    el.classList.toggle('visible', total > 0);
  });
}

// ── ADD TO BASKET ──
function addToBasket(product, size, color, qty = 1) {
  const key = `${product._id || product.id}-${size}-${color}`;
  const existing = basket.find(i => i.key === key);
  if (existing) {
    existing.qty += qty;
  } else {
    basket.push({ key, product, size, color, qty });
  }
  saveBasket();
  showToast(`${product.name} added to basket`);
}

function removeFromBasket(key) {
  basket = basket.filter(i => i.key !== key);
  saveBasket();
}

function updateQty(key, delta) {
  const item = basket.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromBasket(key);
  else saveBasket();
}

// ── TOAST ──
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── API CALLS ──
async function fetchProducts(query = '') {
  try {
    const url = query ? `${API_BASE}/products?${query}` : `${API_BASE}/products`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (e) {
    console.warn('API not available, using demo data');
    return getDemoProducts();
  }
}

async function fetchProduct(id) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Not found');
    return await res.json();
  } catch (e) {
    return getDemoProducts().find(p => p._id === id) || getDemoProducts()[0];
  }
}

// ── DEMO DATA (when backend is offline) ──
function getDemoProducts() {
  return [
    { _id: '1', name: 'Dusk Slip Dress', category: 'Dresses', emoji: '👗', price: 26880, originalPrice: 33480, colors: ['#c4a882','#2c3e50','#8b6355'], sizes: ['XS','S','M','L','XL'], badge: null },
    { _id: '2', name: 'Noir Overcoat', category: 'Outerwear', emoji: '🧥', price: 60480, originalPrice: null, colors: ['#1a1a1a','#4a3728','#5c6e6a'], sizes: ['S','M','L','XL'], badge: null },
    { _id: '3', name: 'Sand Linen Set', category: 'Sets', emoji: '👔', price: 26040, originalPrice: null, colors: ['#c8b89a','#9aac94','#d4c4b4'], sizes: ['XS','S','M','L'], badge: null },
    { _id: '4', name: 'Ceramic Tote', category: 'Accessories', emoji: '👜', price: 13540, originalPrice: null, colors: ['#9b8ec4','#c4a882','#2c3e50'], sizes: ['ONE SIZE'], badge: null },
    { _id: '5', name: 'Alabaster Shirt', category: 'Tops', emoji: '👕', price: 14280, originalPrice: null, colors: ['#f0ebe0','#c8b89a','#4a3728'], sizes: ['XS','S','M','L','XL'], badge: 'new' },
    { _id: '6', name: 'Slate Wide Trousers', category: 'Bottoms', emoji: '👖', price: 22680, originalPrice: 28350, colors: ['#5c6e6a','#1a1a1a','#4a3728'], sizes: ['XS','S','M','L','XL'], badge: 'sale' },
    { _id: '7', name: 'Ivory Knit', category: 'Tops', emoji: '🧶', price: 18900, originalPrice: null, colors: ['#f0ebe0','#c4a882','#9aac94'], sizes: ['S','M','L'], badge: 'bestseller' },
    { _id: '8', name: 'Obsidian Jacket', category: 'Outerwear', emoji: '🧥', price: 48600, originalPrice: null, colors: ['#1a1a1a','#2c3e50'], sizes: ['S','M','L','XL'], badge: null },
  ];
}

// ── RENDER PRODUCT CARD ──
function renderProductCard(p, linkToDetail = true) {
  const url = `product.html?id=${p._id}`;
  const badge = p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge}</span>` : '';
  const originalPrice = p.originalPrice ? `<span class="price-original">₹${p.originalPrice.toLocaleString()}</span>` : '';
  const colorDots = (p.colors || []).map((c, i) =>
    `<div class="color-dot${i===0?' active':''}" style="background:${c}" data-color="${c}"></div>`
  ).join('');

  return `
    <a class="product-card" href="${linkToDetail ? url : '#'}" data-id="${p._id}">
      <div class="product-image">
        ${badge}
        <span>${p.emoji}</span>
        <div class="product-actions">
          <button class="quick-add" onclick="quickAdd(event, '${p._id}')">Add to Basket</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">
          <span class="price-current">₹${p.price.toLocaleString()}</span>
          ${originalPrice}
        </div>
        <div class="color-dots">${colorDots}</div>
      </div>
    </a>
  `;
}

async function quickAdd(e, id) {
  e.preventDefault();
  e.stopPropagation();
  const products = getDemoProducts();
  const p = products.find(x => x._id === id);
  if (!p) return;
  addToBasket(p, p.sizes[0], p.colors[0]);
}

// ── NAV SCROLL EFFECT ──
function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
  updateBasketCount();
}

// ── FORMAT PRICE ──
function formatPrice(p) {
  return `₹${Number(p).toLocaleString()}`;
}

// Init on every page load
document.addEventListener('DOMContentLoaded', () => {
  initNav();
});
