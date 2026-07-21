const fs = require('fs');
const html = fs.readFileSync('dashboard.html', 'utf8');

// Find the sidebar overlay and sidebar
const overlayMatch = html.match(/<div class=\"sidebar-overlay\".*?<\/div>/s);
const mobileHeaderMatch = html.match(/<!-- Mobile Header \(Only visible on mobile\) -->\s*(<div class=\"mobile-header\".*?<\/div>)/s);
const sidebarMatch = html.match(/<aside class=\"dash-sidebar\".*?<\/aside>/s);

fs.writeFileSync('sidebar_snippet.html', (overlayMatch ? overlayMatch[0] : '') + '\n\n' + (mobileHeaderMatch ? mobileHeaderMatch[1] : '') + '\n\n' + (sidebarMatch ? sidebarMatch[0] : ''));
console.log('Sidebar extracted');
