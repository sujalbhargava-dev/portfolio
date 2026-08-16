import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const searchIndex = [
  { title: 'Home', url: '/', keywords: 'home portfolio sujal bhargava developer start index main' },
  { title: 'About Me', url: '/about', keywords: 'about bio background history personal who am i' },
  { title: 'Skills & Tech Stack', url: '/skills', keywords: 'skills technologies tools languages frameworks react node javascript frontend backend html css' },
  { title: 'Projects', url: '/projects', keywords: 'projects portfolio work applications websites github' },
  { title: 'Education', url: '/education', keywords: 'education university college degree school academic' },
  { title: 'Contact', url: '/contact', keywords: 'contact email message reach out connect hire' },
  { title: 'Admin Dashboard', url: '/dashboard', keywords: 'admin dashboard manage settings' },
  { title: 'Admin Login', url: '/login', keywords: 'login admin authenticate sign in' }
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [focused, setFocused] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const q = query.toLowerCase().trim()
    if (q.length === 0) {
      setResults([])
      return
    }
    const matches = searchIndex.filter(item => 
      item.title.toLowerCase().includes(q) || item.keywords.includes(q)
    )
    setResults(matches)
  }, [query])

  const showDropdown = focused && query.trim().length > 0

  return (
    <div className="dash-search nav-search" style={{ position: 'relative' }} ref={containerRef}>
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        placeholder="Search portfolio..." 
        autoComplete="off" 
        style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'inherit' }}
      />
      
      {showDropdown && (
        <div className="search-dropdown" style={{ display: 'block', position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 8, boxShadow: 'var(--card-shadow)' }}>
          {results.length === 0 ? (
            <div className="search-empty" style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
              No results found for "{query}"
            </div>
          ) : (
            results.map((match) => (
              <Link 
                key={match.url} 
                to={match.url} 
                className="search-result-item" 
                onClick={() => setFocused(false)}
                style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', textDecoration: 'none', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}
              >
                <div className="search-result-icon" style={{ marginRight: 12, color: 'var(--text-muted)' }}><i className="fa-solid fa-magnifying-glass"></i></div>
                <div className="search-result-text" style={{ flex: 1 }}>{match.title}</div>
                <div className="search-result-arrow" style={{ color: 'var(--text-muted)' }}><i className="fa-solid fa-arrow-right"></i></div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}
