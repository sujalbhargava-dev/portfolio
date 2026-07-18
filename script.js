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
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;

    const originalHtml = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent!';
    submitButton.style.background = '#10b981';
    submitButton.disabled = true;

    setTimeout(() => {
      submitButton.innerHTML = originalHtml;
      submitButton.style.background = '';
      submitButton.disabled = false;
      form.reset();
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
