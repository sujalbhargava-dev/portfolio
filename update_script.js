const fs = require('fs');
const sidebarHtml = fs.readFileSync('sidebar_snippet.html', 'utf8');
let scriptJs = fs.readFileSync('script.js', 'utf8');

const newLogic = `
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
  layout.innerHTML = \`
${sidebarHtml.replace(/`/g, '\\`')}
  \`;

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
`;

// Replace the old admin navigation code
scriptJs = scriptJs.replace(/\/\/ === ADMIN NAVIGATION ===[\s\S]*?\/\/ === HAMBURGER MENU ===/, newLogic + '\n\n// === HAMBURGER MENU ===');

fs.writeFileSync('script.js', scriptJs);
console.log('script.js updated');
