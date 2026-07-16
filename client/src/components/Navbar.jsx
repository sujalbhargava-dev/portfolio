import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/about',     label: 'About' },
  { to: '/skills',    label: 'Skills' },
  { to: '/projects',  label: 'Projects' },
  { to: '/education', label: 'Education' },
  { to: '/contact',   label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <NavLink to="/" className="nav-logo" onClick={close}>
          SB<span>.</span>
        </NavLink>

        <button
          className={`hamburger${open ? ' open' : ''}`}
          id="hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>

        <ul className={`nav-links${open ? ' open' : ''}`} id="nav-links">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={close}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
