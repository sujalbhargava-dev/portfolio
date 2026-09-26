import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useFeatureFlags } from '../hooks/useFeatureFlags'
import '../styles/dashboard.css'

export default function DashboardLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { isFeatureEnabled } = useFeatureFlags()
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed')
    return saved === null ? true : saved === 'true'
  })
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileImgSrc, setProfileImgSrc] = useState('/profile.jpg')

  useEffect(() => {
    const handleUpdate = () => setProfileImgSrc(`/profile.jpg?t=${Date.now()}`);
    window.addEventListener('profileUpdated', handleUpdate);
    return () => window.removeEventListener('profileUpdated', handleUpdate);
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('profilePhoto', file)
    try {
      const res = await fetch('/api/upload-profile', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) {
        setProfileImgSrc(`/profile.jpg?t=${Date.now()}`)
        window.dispatchEvent(new Event('profileUpdated'))
      } else {
        alert(data.error)
      }
    } catch {
      alert('Upload failed')
    }
  }

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', collapsed)
  }, [collapsed])

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate('/login')
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <div className="dashboard-layout">
      {/* Mobile Header */}
      <div className="mobile-header">
        <i className="fa-solid fa-bars mobile-hamburger" onClick={() => setMobileOpen(true)}></i>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <NavLink to="/messages" style={{ color: 'var(--text-primary)', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <i className="fa-regular fa-bell" style={{ fontSize: '1.2rem' }}></i>
            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%' }}></span>
          </NavLink>
          <label htmlFor="mobileHeaderProfilePhoto" style={{ cursor: 'pointer', display: 'block' }} title="Upload new profile picture">
            <img 
              src={profileImgSrc} 
              alt="Sujal" 
              style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} 
              onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=SB&background=4f46e5&color=fff&size=40' }} 
            />
          </label>
          <input type="file" id="mobileHeaderProfilePhoto" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={closeMobile}
      ></div>

      {/* Sidebar */}
      <aside className={`dash-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`} id="dash-sidebar">
        <a
          className="dash-logo"
          style={{ display: 'flex', textDecoration: 'none', cursor: 'pointer' }}
          onClick={(e) => {
            e.preventDefault()
            if (window.innerWidth > 900) {
              setCollapsed(!collapsed)
            }
          }}
        >
          <span>
            <i className="fa-solid fa-code"></i>{' '}
            <span className="logo-text">Sujal.</span>
          </span>
          <i
            className="fa-solid fa-xmark mobile-hamburger"
            style={{ display: 'none' }}
            onClick={(e) => {
              e.stopPropagation()
              closeMobile()
            }}
          ></i>
        </a>

        <div className="dash-nav">
          <div className="nav-section-title" style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, paddingLeft: 16 }}>Core</div>
          <NavLink to="/dashboard" className={({ isActive }) => `dash-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobile} end>
            <i className="fa-solid fa-border-all"></i> <span className="nav-text">Dashboard</span>
          </NavLink>
          <NavLink to="/messages" className={({ isActive }) => `dash-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobile}>
            <i className="fa-solid fa-inbox"></i> <span className="nav-text">Messages</span>
          </NavLink>

          <div className="nav-section-title" style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', margin: '20px 0 8px', paddingLeft: 16 }}>Management</div>
          <NavLink to="/manage-skills" className={({ isActive }) => `dash-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobile}>
            <i className="fa-solid fa-wand-magic-sparkles"></i> <span className="nav-text">Manage Skills</span>
          </NavLink>
          <NavLink to="/manage-projects" className={({ isActive }) => `dash-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobile}>
            <i className="fa-solid fa-briefcase"></i> <span className="nav-text">Manage Projects</span>
          </NavLink>

          <div className="nav-section-title" style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', margin: '20px 0 8px', paddingLeft: 16 }}>Portfolio Pages</div>
          <NavLink to="/" className={({ isActive }) => `dash-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobile} end>
            <i className="fa-solid fa-house"></i> <span className="nav-text">Home</span>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `dash-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobile}>
            <i className="fa-regular fa-address-card"></i> <span className="nav-text">About</span>
          </NavLink>
          <NavLink to="/education" className={({ isActive }) => `dash-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobile}>
            <i className="fa-solid fa-graduation-cap"></i> <span className="nav-text">Education</span>
          </NavLink>
          <NavLink to="/skills" className={({ isActive }) => `dash-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobile}>
            <i className="fa-solid fa-wand-magic-sparkles"></i> <span className="nav-text">Skills</span>
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => `dash-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobile}>
            <i className="fa-solid fa-briefcase"></i> <span className="nav-text">Projects</span>
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `dash-nav-item ${isActive ? 'active' : ''}`} onClick={closeMobile}>
            <i className="fa-regular fa-envelope"></i> <span className="nav-text">Contact</span>
          </NavLink>

          <a
            href="#"
            className="dash-nav-item"
            style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', borderRadius: 0, paddingTop: 20 }}
            onClick={handleLogout}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i> <span className="nav-text">Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dash-main">
        <Outlet />
      </main>
    </div>
  )
}
