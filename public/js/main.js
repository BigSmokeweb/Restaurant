/* main.js — Mumbra Restaurant Frontend */

// =====================
// Navigation & Scroll
// =====================
window.addEventListener('scroll', () => {
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    if (window.scrollY > 400) scrollTop.classList.add('visible');
    else scrollTop.classList.remove('visible');
  }
});

document.querySelector('.scroll-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =====================
// Hero Carousel
// =====================
function initCarousel() {
  const track = document.getElementById('heroTrack');
  if (!track) return;
  const slides = track.children;
  const dots = document.querySelectorAll('.hero-dot');
  let current = 0;
  let timer;

  function go(n) {
    current = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { go(current + 1); }
  function start() { timer = setInterval(next, 5000); }
  function stop() { clearInterval(timer); }

  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); stop(); start(); }));

  track.parentElement?.addEventListener('mouseenter', stop);
  track.parentElement?.addEventListener('mouseleave', start);
  start();
  go(0);
}

// =====================
// Deals Slider
// =====================
function initDealsSlider() {
  const track = document.getElementById('dealsTrack');
  if (!track) return;
  let pos = 0;
  const card = track.querySelector('.deal-card');
  if (!card) return;
  const step = card.offsetWidth + 20;

  document.getElementById('dealsPrev')?.addEventListener('click', () => {
    pos = Math.max(pos - step, 0);
    track.style.transform = `translateX(-${pos}px)`;
  });
  document.getElementById('dealsNext')?.addEventListener('click', () => {
    const max = track.scrollWidth - track.parentElement.offsetWidth;
    pos = Math.min(pos + step, max);
    track.style.transform = `translateX(-${pos}px)`;
  });
}

// =====================
// Load Deals (from API)
// =====================
async function loadDeals() {
  const container = document.getElementById('dealsTrack');
  if (!container) return;
  try {
    const res = await fetch('/api/deals');
    const data = await res.json();
    if (!data.success) return;
    container.innerHTML = data.data.map(d => `
      <div class="deal-card">
        <span class="deal-tag">${d.tag}</span>
        <h3>${d.title}</h3>
        <p>${d.description}</p>
        <div class="deal-footer">
          <span class="deal-discount">${d.discount}</span>
          <span class="deal-price">From ${d.price}</span>
        </div>
      </div>
    `).join('');
    initDealsSlider();
  } catch (e) {
    console.log('Deals API unavailable, using static content');
  }
}

// =====================
// Reservation Modal
// =====================
function initReservation() {
  const overlay = document.getElementById('reserveOverlay');
  if (!overlay) return;

  // Open
  document.querySelectorAll('[data-reserve]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.getElementById('closePanel')?.addEventListener('click', closeModal);

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Meal type toggle
  document.querySelectorAll('.meal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.meal-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('mealType').value = btn.dataset.meal;
      loadTimeSlots(btn.dataset.meal);
    });
  });

  // Set default date
  const dateInput = document.getElementById('resDate');
  if (dateInput) {
    const today = new Date();
    dateInput.min = today.toISOString().split('T')[0];
    dateInput.value = today.toISOString().split('T')[0];
  }

  loadTimeSlots('lunch');
}

function loadTimeSlots(meal) {
  const container = document.getElementById('timeSlots');
  if (!container) return;
  const slots = meal === 'lunch'
    ? [['12:00 PM', '₹599'], ['12:30 PM', '₹599'], ['1:00 PM', '₹599'], ['1:30 PM', '₹599']]
    : [['7:00 PM', '₹799'], ['7:30 PM', '₹799'], ['8:00 PM', '₹799'], ['8:30 PM', '₹799']];

  container.innerHTML = slots.map(([time, price]) => `
    <div class="time-slot" data-time="${time}" onclick="selectSlot(this, '${time}')">
      <div class="time">${time}</div>
      <div class="price">${price}/person</div>
    </div>
  `).join('');
}

function selectSlot(el, time) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('timeSlot').value = time;
}

// Guest counter
function initCounters() {
  document.querySelectorAll('[data-counter]').forEach(wrap => {
    const type = wrap.dataset.counter;
    const valEl = wrap.querySelector('.counter-val');
    const hiddenInput = document.getElementById(`guests${type}`);
    let val = 0;
    wrap.querySelector('.counter-minus')?.addEventListener('click', () => {
      val = Math.max(0, val - 1);
      valEl.textContent = val;
      if (hiddenInput) hiddenInput.value = val;
    });
    wrap.querySelector('.counter-plus')?.addEventListener('click', () => {
      val = Math.min(20, val + 1);
      valEl.textContent = val;
      if (hiddenInput) hiddenInput.value = val;
    });
  });
}

// =====================
// Shopping Cart Logic
// =====================
let cart = JSON.parse(localStorage.getItem('mumbra_cart') || '[]');

function saveCart() {
  localStorage.setItem('mumbra_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(id, name, price, type) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price: parseInt(price), type, qty: 1 });
  }
  saveCart();
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart();
}

function updateCartUI() {
  // Update badges
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = totalItems);

  // Update Drawer
  const body = document.getElementById('cartBody');
  const totalEl = document.getElementById('cartTotalVal');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-basket"></i>
        <h3>Your cart is empty</h3>
        <p style="font-size:13px;color:var(--text-muted);margin-top:8px">Add some delicious items from our menu!</p>
      </div>
    `;
    if (totalEl) totalEl.textContent = '₹0';
    return;
  }

  let total = 0;
  body.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    const isVeg = item.type === 'veg';
    const iconClass = isVeg ? 'veg-icon' : 'non-veg-icon';
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name"><div class="${iconClass}" style="margin-bottom:0;margin-right:6px"></div>${item.name}</div>
          <div class="cart-item-price">₹${item.price}</div>
        </div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">−</button>
          <span style="font-weight:600;font-size:14px;min-width:16px;text-align:center">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
        </div>
      </div>
    `;
  }).join('');
  
  if (totalEl) totalEl.textContent = `₹${total}`;
}

function initCart() {
  updateCartUI();
  
  const overlay = document.getElementById('cartOverlay');
  if (!overlay) return;

  document.querySelectorAll('.btn-cart-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCart();
  });
  document.getElementById('cartClose')?.addEventListener('click', closeCart);

  function closeCart() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Global expose for inline onclick attributes
window.addToCart = addToCart;
window.updateCartQty = updateCartQty;

// =====================
// Checkout Logic
// =====================
function initCheckout() {
  const summaryEl = document.getElementById('checkoutItems');
  const formEl = document.getElementById('checkoutForm');
  
  if (summaryEl) {
    if (cart.length === 0) {
      summaryEl.innerHTML = '<p style="color:var(--text-muted)">Your cart is empty.</p>';
      document.getElementById('checkoutTotalVal').textContent = '₹0';
      if(formEl) formEl.querySelector('button').disabled = true;
    } else {
      let total = 0;
      summaryEl.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
          <div class="checkout-item">
            <span>${item.qty}x ${item.name}</span>
            <span>₹${item.price * item.qty}</span>
          </div>
        `;
      }).join('');
      document.getElementById('checkoutTotalVal').textContent = `₹${total}`;
    }
  }

  if (formEl) {
    formEl.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const alertBox = document.getElementById('checkoutAlert');
      const btn = document.getElementById('checkoutBtn');
      btn.disabled = true;
      btn.textContent = 'Processing...';

      let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

      const customer = {
        name: document.getElementById('coName').value,
        phone: document.getElementById('coPhone').value,
        address: document.getElementById('coAddress').value,
        instructions: document.getElementById('coInstructions').value
      };

      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customer, cart, total })
        });
        const data = await res.json();
        
        if (data.success) {
          alertBox.className = 'alert alert-success';
          alertBox.textContent = `Order Confirmed! Your Order ID is #${data.orderId}. We are preparing your food.`;
          formEl.reset();
          cart = [];
          saveCart();
          summaryEl.innerHTML = '<p style="color:var(--text-muted)">Your cart is empty.</p>';
          document.getElementById('checkoutTotalVal').textContent = '₹0';
          btn.style.display = 'none';
        } else {
          alertBox.className = 'alert alert-error';
          alertBox.textContent = data.message || 'Failed to place order.';
          btn.disabled = false;
          btn.textContent = 'Place Order';
        }
      } catch (err) {
        alertBox.className = 'alert alert-error';
        alertBox.textContent = 'Network error. Please try again.';
        btn.disabled = false;
        btn.textContent = 'Place Order';
      }
    });
  }
}

// =====================
// Init
// =====================
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  loadDeals();
  initReservation();
  initCounters();
  initCart();
  initCheckout();

  // WhatsApp
  document.querySelector('.whatsapp-float')?.addEventListener('click', () => {
    window.open('https://wa.me/919876543210?text=Hi%20Mumbra%20Restaurant!%20I%27d%20like%20to%20make%20an%20enquiry.', '_blank');
  });
});
