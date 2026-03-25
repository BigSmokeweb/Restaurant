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
// Init
// =====================
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  loadDeals();
  initReservation();
  initCounters();

  // WhatsApp
  document.querySelector('.whatsapp-float')?.addEventListener('click', () => {
    window.open('https://wa.me/919876543210?text=Hi%20Mumbra%20Restaurant!%20I%27d%20like%20to%20make%20an%20enquiry.', '_blank');
  });
});
