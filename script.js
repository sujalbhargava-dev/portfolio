// === HAMBURGER MENU ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// === SCROLL: NAV SHADOW ===
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
}, { passive: true });

// === SCROLL ANIMATIONS ===
const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .stagger');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animatedElements.forEach(el => observer.observe(el));
} else {
  animatedElements.forEach(el => el.classList.add('visible'));
}

// === CONTACT FORM ===
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;

    const originalHtml = submitButton.innerHTML;

    // Collect form data
    const formData = {
      name: form.querySelector('#form-name')?.value || '',
      email: form.querySelector('#form-email')?.value || '',
      subject: form.querySelector('#form-subject')?.value || '',
      message: form.querySelector('#form-message')?.value || ''
    };

    // Show sending state
    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        submitButton.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent!';
        submitButton.style.background = '#10b981';
        form.reset();
      } else {
        submitButton.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Failed to Send';
        submitButton.style.background = '#ef4444';
      }
    } catch (err) {
      submitButton.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Connection Error';
      submitButton.style.background = '#ef4444';
    }

    setTimeout(() => {
      submitButton.innerHTML = originalHtml;
      submitButton.style.background = '';
      submitButton.disabled = false;
    }, 3000);
  });
}

// === SKILL CARD HOVER EFFECT ===
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
