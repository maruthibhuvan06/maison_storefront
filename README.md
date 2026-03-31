# MAISON Storefront — Setup Guide

## Project Structure
```
maison/
├── frontend/         ← Open these HTML files in browser
│   ├── index.html    ← Homepage
│   ├── shop.html     ← All products + filters
│   ├── collections.html
│   ├── product.html  ← Product detail (size/colour/basket)
│   ├── basket.html   ← Your basket
│   ├── about.html
│   ├── css/style.css
│   └── js/main.js
└── backend/          ← Node.js + MongoDB API
    ├── server.js
    ├── seed.js
    ├── models/
    │   ├── Product.js
    │   └── Order.js
    ├── routes/
    │   ├── products.js
    │   └── orders.js
    └── .env
```

---

## STEP 1 — Install Prerequisites

1. **Node.js** — https://nodejs.org (download LTS version)
2. **MongoDB** — https://www.mongodb.com/try/download/community (Community Edition)
   - Install and start MongoDB service
3. **VS Code** — https://code.visualstudio.com (recommended editor)
4. **Git** — https://git-scm.com

---

## STEP 2 — Run the Frontend (Quick Start)

The frontend works **without** the backend (uses built-in demo data).

1. Open VS Code
2. Install extension: **Live Server** (by Ritwick Dey)
3. Right-click `frontend/index.html` → "Open with Live Server"
4. Your site opens at `http://127.0.0.1:5500`

---

## STEP 3 — Run the Backend

```bash
# 1. Go to backend folder
cd maison/backend

# 2. Install packages
npm install

# 3. Start MongoDB (if not already running)
# On Windows: net start MongoDB
# On Mac:     brew services start mongodb-community

# 4. Seed the database with sample products
npm run seed

# 5. Start the backend server
npm run dev
# → Backend runs at http://localhost:5000
```

---

## STEP 4 — Connect Frontend to Backend

In `frontend/js/main.js`, the API base is already set:
```js
const API_BASE = 'http://localhost:5000/api';
```
When the backend is running, product data loads from MongoDB automatically.

---

## STEP 5 — Push to GitHub

```bash
# In the maison/ folder:
git init
git add .
git commit -m "Initial MAISON storefront"

# Create a repo on github.com, then:
git remote add origin https://github.com/YOURUSERNAME/maison.git
git push -u origin main
```

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/products | All products |
| GET | /api/products?category=Dresses | Filter by category |
| GET | /api/products?badge=sale | Filter by badge |
| GET | /api/products/:id | Single product |
| POST | /api/products | Create product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |
| POST | /api/orders | Place order |
| GET | /api/orders | All orders |

---

## Features Included

- ✅ Homepage with hero + featured products
- ✅ Shop page with category/price filters
- ✅ Product detail page with size selector
- ✅ Colour swatches (click to select)
- ✅ Add to Basket button
- ✅ Basket page with qty controls + remove
- ✅ Basket persists via localStorage
- ✅ Collections page
- ✅ About page
- ✅ MongoDB product & order models
- ✅ REST API with filtering & sorting
- ✅ Works offline with demo data

---

## MongoDB Atlas (Cloud, Free)

Instead of local MongoDB:
1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Get connection string
4. Paste into `.env`:
   ```
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/maison
   ```
