/* reservation.js — Handles form submission to backend API */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const alertSuccess = document.getElementById('alertSuccess');
    const alertError = document.getElementById('alertError');

    // Reset alerts
    alertSuccess.style.display = 'none';
    alertError.style.display = 'none';

    // Validate guests
    const veg = parseInt(document.getElementById('guestsVeg')?.value) || 0;
    const nonVeg = parseInt(document.getElementById('guestsNonVeg')?.value) || 0;
    if (veg + nonVeg < 1) {
      alertError.textContent = 'Please select at least 1 guest.';
      alertError.style.display = 'block';
      return;
    }

    const timeSlot = document.getElementById('timeSlot')?.value;
    if (!timeSlot) {
      alertError.textContent = 'Please select a time slot.';
      alertError.style.display = 'block';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Booking...';

    const payload = {
      name: document.getElementById('resName').value,
      phone: document.getElementById('resPhone').value,
      email: document.getElementById('resEmail')?.value || '',
      date: document.getElementById('resDate').value,
      meal_type: document.getElementById('mealType').value,
      time_slot: timeSlot,
      guests_veg: veg,
      guests_non_veg: nonVeg,
      special_request: document.getElementById('specialRequest')?.value || ''
    };

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        alertSuccess.textContent = `🎉 ${data.message}`;
        alertSuccess.style.display = 'block';
        form.reset();
        document.querySelectorAll('.counter-val').forEach(el => el.textContent = '0');
        document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('active'));
        document.getElementById('timeSlot').value = '';
      } else {
        alertError.textContent = data.message || 'Something went wrong. Please try again.';
        alertError.style.display = 'block';
      }
    } catch (err) {
      alertError.textContent = 'Network error. Please check your connection and try again.';
      alertError.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Confirm Reservation';
    }
  });
});
