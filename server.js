const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;
const IS_VERCEL = process.env.VERCEL === '1';
const DB_FILE = IS_VERCEL
  ? path.join('/tmp', 'mumbra.json')
  : path.join(__dirname, 'database', 'mumbra.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure DB directory exists (skip on Vercel — uses /tmp)
if (!IS_VERCEL && !fs.existsSync(path.join(__dirname, 'database'))) {
  fs.mkdirSync(path.join(__dirname, 'database'));
}

// Initialize JSON DB
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    const init = { reservations: [], contacts: [], nextId: { reservation: 1, contact: 1 } };
    fs.writeFileSync(DB_FILE, JSON.stringify(init, null, 2));
    return init;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Static data
const deals = [
  { id: 1, title: 'Couple Special', description: 'Dinner for 2 with live grill & unlimited starters', discount: '20% OFF', price: '₹1,299', tag: 'Weekend Only' },
  { id: 2, title: 'Family Package', description: 'Lunch buffet for 4 with complimentary desserts', discount: '15% OFF', price: '₹2,199', tag: 'Mon–Fri' },
  { id: 3, title: 'Birthday Celebration', description: 'Special table decoration + complimentary cake', discount: 'Free Cake', price: '₹599/person', tag: 'Advance Booking' },
  { id: 4, title: 'Corporate Lunch', description: 'Group lunch for 10+ with dedicated service', discount: '25% OFF', price: '₹449/person', tag: 'Weekdays' }
];

const menuData = {
  starters: [
    { name: 'Paneer Tikka', description: 'Marinated cottage cheese grilled on charcoal', price: 249, veg: true },
    { name: 'Chicken Seekh Kebab', description: 'Minced chicken with herbs and spices, live grilled', price: 329, veg: false },
    { name: 'Veg Manchurian (Dry)', description: 'Crispy vegetable balls in ginger-soy glaze', price: 229, veg: true },
    { name: 'Drums of Heaven', description: 'Chicken lollipops in fiery Schezwan sauce', price: 349, veg: false },
    { name: 'Hara Bhara Kebab', description: 'Spinach & pea patty, pan-grilled', price: 209, veg: true },
    { name: 'Fish Tikka', description: 'Marinated fish fillet grilled with Ajwain', price: 379, veg: false }
  ],
  mains: [
    { name: 'Mumbra Mutton Biryani', description: 'Slow-cooked dum biryani with tender mutton', price: 449, veg: false },
    { name: 'Butter Chicken', description: 'Classic North Indian tomato-cream curry', price: 379, veg: false },
    { name: 'Dal Makhani', description: 'Black lentils slow-cooked overnight with cream', price: 269, veg: true },
    { name: 'Paneer Lababdar', description: 'Cottage cheese in tangy onion-tomato gravy', price: 299, veg: true },
    { name: 'Schezwan Fried Rice', description: 'Wok-tossed rice with Schezwan sauce', price: 249, veg: true },
    { name: 'Chicken Biryani', description: 'Aromatic rice with spiced chicken', price: 399, veg: false }
  ],
  desserts: [
    { name: 'Gulab Jamun', description: 'Milk-solid dumplings in rose syrup', price: 149, veg: true },
    { name: 'Shahi Tukda', description: 'Bread pudding with saffron rabri', price: 179, veg: true },
    { name: 'Kulfi Falooda', description: 'Indian ice cream with rose syrup', price: 199, veg: true },
    { name: 'Chocolate Brownie', description: 'Fudge brownie with vanilla ice cream', price: 219, veg: true }
  ],
  drinks: [
    { name: 'Masala Chai', description: 'Ginger-cardamom tea in clay kullhad', price: 30, veg: true },
    { name: 'Fresh Lime Soda', description: 'Sweet or salted, freshly prepared', price: 60, veg: true },
    { name: 'Mango Lassi', description: 'Yogurt-based mango smoothie', price: 99, veg: true },
    { name: 'Fresh Juices', description: 'Orange, Watermelon, Pomegranate', price: 79, veg: true }
  ]
};

// ========== API ROUTES ==========

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', restaurant: 'Mumbra Restaurant', time: new Date().toISOString() });
});

app.get('/api/deals', (req, res) => {
  res.json({ success: true, data: deals });
});

app.get('/api/menu', (req, res) => {
  res.json({ success: true, data: menuData });
});

app.post('/api/reservations', (req, res) => {
  const { name, phone, email, date, meal_type, time_slot, guests_veg, guests_non_veg, special_request } = req.body;

  if (!name || !phone || !date || !meal_type || !time_slot) {
    return res.status(400).json({ success: false, message: 'Name, phone, date, meal type and time slot are required.' });
  }
  const veg = parseInt(guests_veg) || 0;
  const nonVeg = parseInt(guests_non_veg) || 0;
  if (veg + nonVeg < 1) {
    return res.status(400).json({ success: false, message: 'Please add at least 1 guest.' });
  }

  const db = readDB();
  const reservation = {
    id: db.nextId.reservation++,
    name, phone, email: email || '',
    date, meal_type, time_slot,
    guests_veg: veg, guests_non_veg: nonVeg,
    special_request: special_request || '',
    created_at: new Date().toISOString()
  };
  db.reservations.push(reservation);
  writeDB(db);

  console.log(`✅ New reservation: ${name} (${phone}) — ${date} ${meal_type} ${time_slot} — ${veg}V ${nonVeg}NV`);
  res.json({ success: true, message: 'Table reserved successfully! We look forward to hosting you.', id: reservation.id });
});

app.get('/api/reservations', (req, res) => {
  const db = readDB();
  res.json({ success: true, total: db.reservations.length, data: db.reservations.slice().reverse() });
});

app.post('/api/contact', (req, res) => {
  const { name, phone, email, event_type, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required.' });
  }

  const db = readDB();
  const contact = {
    id: db.nextId.contact++,
    name, phone, email: email || '',
    event_type: event_type || '',
    message: message || '',
    created_at: new Date().toISOString()
  };
  db.contacts.push(contact);
  writeDB(db);

  console.log(`📩 New enquiry: ${name} (${phone}) — ${event_type}`);
  res.json({ success: true, message: 'Thank you! Our events team will contact you within 24 hours.' });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export for Vercel serverless
module.exports = app;

// Only listen locally
if (!IS_VERCEL) {
  app.listen(PORT, () => {
    console.log(`
🍽️  Mumbra Restaurant Server  →  http://localhost:${PORT}
📂  Database: ${DB_FILE}
📋  API:
    GET  /api/health
    GET  /api/deals
    GET  /api/menu
    POST /api/reservations
    GET  /api/reservations
    POST /api/contact
`);
  });
}
