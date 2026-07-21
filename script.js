// === AUTHENTICATION CHECK ===
const pathname = window.location.pathname;
const isLoginPage = pathname.endsWith('login.html');
const isRegisterPage = pathname.endsWith('register.html');
const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

if (!isLoggedIn && !isLoginPage && !isRegisterPage) {
  window.location.href = 'login.html';
}


// === DASHBOARD LAYOUT TRANSFORMATION ===
if (sessionStorage.getItem('isAdmin') === 'true' && !window.location.pathname.endsWith('dashboard.html')) {
  // Add dashboard class to body
  document.body.classList.add('dashboard-body');

  // Hide the standard top nav
  const topNav = document.querySelector('nav');
  if (topNav) topNav.style.display = 'none';

  // Inject dashboard.css if not already present
  if (!document.querySelector('link[href="dashboard.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'dashboard.css';
    document.head.appendChild(link);
  }

  // Create layout wrapper
  const layout = document.createElement('div');
  layout.className = 'dashboard-layout';

  // Inject sidebar HTML
  layout.innerHTML = `
<div class="sidebar-overlay" id="sidebar-overlay"></div>

<div class="mobile-header" style="display: none;">
            <a href="index.html" class="dash-logo" style="text-decoration: none;">
                <span><i class="fa-solid fa-code" style="color: var(--accent);"></i> <span
                        style="color: var(--text-primary); font-weight: 800;">Sujal.</span></span>
            </a>
            <i class="fa-solid fa-bars mobile-hamburger" id="mobile-menu-toggle"></i>
        </div>

<aside class="dash-sidebar" id="dash-sidebar">
            <a class="dash-logo" id="desktop-menu-toggle" style="display: flex; text-decoration: none; cursor: pointer;">
                <span><i class="fa-solid fa-code"></i> <span class="logo-text">Sujal.</span></span>
                <i class="fa-solid fa-xmark mobile-hamburger" style="display: none;" id="mobile-menu-close"></i>
            </a>

            <div class="dash-nav">
                <div class="nav-section-title" style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; padding-left: 16px;">Core</div>
                <a href="dashboard.html" class="dash-nav-item active">
                    <i class="fa-solid fa-border-all"></i> <span class="nav-text">Dashboard</span>
                </a>

                <a href="messages.html" class="dash-nav-item">
                    <i class="fa-solid fa-inbox"></i> <span class="nav-text">Messages</span>
                </a>

                <div class="nav-section-title" style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); margin: 20px 0 8px; padding-left: 16px;">Portfolio Pages</div>
                <a href="index.html" class="dash-nav-item">
                    <i class="fa-solid fa-house"></i> <span class="nav-text">Home</span>
                </a>
                <a href="about.html" class="dash-nav-item">
                    <i class="fa-regular fa-address-card"></i> <span class="nav-text">About</span>
                </a>
                <a href="education.html" class="dash-nav-item">
                    <i class="fa-solid fa-graduation-cap"></i> <span class="nav-text">Education</span>
                </a>
                <a href="skills.html" class="dash-nav-item">
                    <i class="fa-solid fa-wand-magic-sparkles"></i> <span class="nav-text">Skills</span>
                </a>
                <a href="projects.html" class="dash-nav-item">
                    <i class="fa-solid fa-briefcase"></i> <span class="nav-text">Projects</span>
                </a>
                <a href="contact.html" class="dash-nav-item">
                    <i class="fa-regular fa-envelope"></i> <span class="nav-text">Contact</span>
                </a>

                <a href="#" id="logout-btn" class="dash-nav-item"
                    style="margin-top: auto; border-top: 1px solid var(--border); border-radius: 0; padding-top: 20px;">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> <span class="nav-text">Logout</span>
                </a>
            </div>
        </aside>
  `;

  // Create main content area
  const mainArea = document.createElement('main');
  mainArea.className = 'dash-main';
  mainArea.style.padding = '0'; // Keep original page padding

  // Move existing body children (except scripts) into mainArea
  const children = Array.from(document.body.childNodes);
  for (const node of children) {
    if (node.tagName !== 'SCRIPT') {
      mainArea.appendChild(node);
    }
  }

  layout.appendChild(mainArea);
  document.body.prepend(layout);

  // Set active link in sidebar dynamically
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  layout.querySelectorAll('.dash-nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === currentPath) {
      item.classList.add('active');
    }
  });

  // Attach Sidebar event listeners
  const sidebar = document.getElementById('dash-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const dashMenuToggle = document.getElementById('mobile-menu-toggle');
  const dashMenuClose = document.getElementById('mobile-menu-close');
  const desktopToggle = document.getElementById('desktop-menu-toggle');
  const logoutBtn = document.getElementById('logout-btn');

  if (desktopToggle) {
    desktopToggle.addEventListener('click', (e) => {
      if (window.innerWidth > 900) {
        e.preventDefault();
        if (sidebar) sidebar.classList.toggle('collapsed');
      }
    });
  }

  function openSidebar() {
    if (sidebar) sidebar.classList.add('mobile-open');
    if (overlay) overlay.classList.add('active');
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
  }

  if (dashMenuToggle) {
    dashMenuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      openSidebar();
    });
  }

  if (dashMenuClose) {
    dashMenuClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebar();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.clear();
      window.location.href = 'login.html';
    });
  }
} else if (sessionStorage.getItem('isAdmin') === 'true') {
  // If we are ON dashboard.html, we just dynamically highlight the active link
  const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.dash-nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === currentPath) {
      item.classList.add('active');
    }
  });
}


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
      const response = await fetch('http://localhost:3000/api/contact', {
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
