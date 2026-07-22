// search.js
document.addEventListener('DOMContentLoaded', () => {
    // Search Index
    const searchIndex = [
        { title: 'Home', url: 'index.html', keywords: 'home portfolio sujal bhargava developer start index main' },
        { title: 'About Me', url: 'about.html', keywords: 'about bio background history personal who am i' },
        { title: 'Skills & Tech Stack', url: 'skills.html', keywords: 'skills technologies tools languages frameworks react node javascript frontend backend html css' },
        { title: 'Projects', url: 'projects.html', keywords: 'projects portfolio work applications websites github' },
        { title: 'Education', url: 'education.html', keywords: 'education university college degree school academic' },
        { title: 'Contact', url: 'contact.html', keywords: 'contact email message reach out connect hire' },
        { title: 'Admin Dashboard', url: 'dashboard.html', keywords: 'admin dashboard manage settings' },
        { title: 'Admin Login', url: 'login.html', keywords: 'login admin authenticate sign in' }
    ];

    
    const searchContainer = document.querySelector('.nav-search') || document.querySelector('.dash-search');
    const searchInput = document.getElementById('global-search-input');
    const searchResults = document.getElementById('global-search-results');

    if (!searchContainer || !searchInput || !searchResults) return;

    // Show/Hide Dropdown
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length > 0) {
            searchResults.style.display = 'block';
        }
    });

    // Search Logic

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (query.length === 0) {
            searchResults.style.display = 'none';
            return;
        } else {
            searchResults.style.display = 'block';
        }

        const matches = searchIndex.filter(item => {
            return item.title.toLowerCase().includes(query) || item.keywords.includes(query);
        });

        if (matches.length === 0) {
            searchResults.innerHTML = '<div class="search-empty">No results found for "'+ escapeHTML(query) +'"</div>';
            return;
        }

        matches.forEach(match => {
            const el = document.createElement('a');
            el.href = match.url;
            el.className = 'search-result-item';
            el.innerHTML = `
                <div class="search-result-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
                <div class="search-result-text">${match.title}</div>
                <div class="search-result-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            `;
            searchResults.appendChild(el);
        });
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    }
});
