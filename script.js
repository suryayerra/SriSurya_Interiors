// Sri Surya Interiors — site scripts
// Portfolio filtering
  function filterPortfolio(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('#portfolio-grid .portfolio-item').forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Form submit
  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxPqJjFnq8yDCBBUZvn2esiMdVMp-v1nBdBTOLBr1K17h9Ur51YrgMhpP789YI9zltBXA/exec';

  function submitForm() {
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const property = document.getElementById('property').value;
    const budgetEl = document.querySelector('input[name="budget"]:checked');
    const area = document.getElementById('area').value.trim();
    const rooms = document.getElementById('rooms').value;
    const message = document.getElementById('message').value.trim();

    if (!fname || !phone || !property || !budgetEl) {
      alert('Please fill in all required fields: Name, Phone, Property Type and Budget.');
      return;
    }

    const budget = budgetEl.value;
    const fullName = fname + (lname ? ' ' + lname : '');

    // ── 1. Save to Google Sheets (silent, no-wait) ──
    const leadData = {
      name: fullName,
      phone: phone,
      email: email,
      property: property,
      budget: budget,
      area: area,
      rooms: rooms,
      message: message
    };
    fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    }).catch(function() { /* silently ignore network errors */ });

    // ── 2. Open WhatsApp with pre-filled message ──
    let waMsg = '🏠 *New Consultation Request*%0A';
    waMsg += '━━━━━━━━━━━━━━━━━━━━%0A';
    waMsg += '*Name:* ' + fullName + '%0A';
    waMsg += '*Phone:* ' + phone + '%0A';
    if (email) waMsg += '*Email:* ' + email + '%0A';
    waMsg += '%0A*Property Type:* ' + property + '%0A';
    waMsg += '*Budget:* ' + budget + '%0A';
    if (area) waMsg += '*Area:* ' + area + ' sq ft%0A';
    if (rooms) waMsg += '*Rooms:* ' + rooms + '%0A';
    if (message) waMsg += '%0A*Message:* ' + message + '%0A';
    waMsg += '━━━━━━━━━━━━━━━━━━━━%0A';
    waMsg += '_Sent via Sri Surya Website_';

    const waNumber = '917799799927';
    const waURL = 'https://wa.me/' + waNumber + '?text=' + waMsg;
    window.open(waURL, '_blank');

    // ── 3. Show success message ──
    document.getElementById('consult-form').style.display = 'none';
    document.getElementById('success-msg').style.display = 'block';
  }

  // Smooth nav active state on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });

  // ===== Video lightbox =====
  function openVideo(id) {
    var holder = document.getElementById('videoFrameHolder');
    holder.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id +
      '?autoplay=1&rel=0" title="Project video" frameborder="0" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
      'allowfullscreen></iframe>';
    document.getElementById('videoLightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeVideo(e) {
    if (e && e.target.closest('.video-lightbox-inner') && !e.target.closest('.video-lightbox-close')) return;
    document.getElementById('videoLightbox').classList.remove('open');
    document.getElementById('videoFrameHolder').innerHTML = '';
    document.body.style.overflow = '';
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeVideo();
  });
