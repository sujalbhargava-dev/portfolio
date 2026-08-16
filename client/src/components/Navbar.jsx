import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useFeatureFlags } from '../hooks/useFeatureFlags'
import SearchBar from './SearchBar'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const { isFeatureEnabled } = useFeatureFlags()

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)
      // Hide navbar on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`${scrolled ? 'scrolled' : ''} ${hidden ? 'nav-hidden' : ''}`}>
      <div className="nav-container">
        <NavLink to="/login" className="nav-logo">
          SB<span>.</span>
        </NavLink>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          id="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="nav-links">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu} end>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/skills" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>Skills</NavLink></li>
          <li><NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>Projects</NavLink></li>
          <li><NavLink to="/education" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>Education</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>Contact</NavLink></li>
        </ul>

        {isFeatureEnabled('global-search') && (
          <SearchBar />
        )}
      </div>
    </nav>
  )
}

