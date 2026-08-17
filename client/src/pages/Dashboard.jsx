import { useState, useEffect } from 'react'
import { useFeatureFlags } from '../hooks/useFeatureFlags'
import SearchBar from '../components/SearchBar'
import ThemeToggle from '../components/ThemeToggle'
import LoginActivityChart from '../components/LoginActivityChart'
import CalendarWidget from '../components/CalendarWidget'

export default function Dashboard() {
  const [messages, setMessages] = useState([])
  const { features, isFeatureEnabled } = useFeatureFlags()
  const [profileImgSrc, setProfileImgSrc] = useState('/profile.jpg')

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => { if (data.success) setMessages(data.messages || []) })
      .catch(() => {})
  }, [])

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
      } else {
        alert(data.error)
      }
    } catch {
      alert('Upload failed')
    }
  }

  const updateFeature = async (featureId, status) => {
    try {
      await fetch('/api/features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featureId, status }),
      })
      window.location.reload()
    } catch {
      alert('Failed to update feature')
    }
  }

  return (
    <>
      <header className="dash-header">
        <h1 className="dash-welcome">Welcome back, Sujal 👋</h1>
        <div className="dash-header-right">
          {isFeatureEnabled('global-search') && <SearchBar />}
          {isFeatureEnabled('dark-mode') && <ThemeToggle />}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <label htmlFor="headerProfilePhoto" style={{ cursor: 'pointer', display: 'block', position: 'relative' }} title="Upload new profile picture">
              <img src={profileImgSrc} alt="Profile" className="dash-profile" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=SB&background=4f46e5&color=fff&size=40' }} />
            </label>
            <input type="file" id="headerProfilePhoto" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
          </div>
        </div>
      </header>

      <div className="dash-grid">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Mini cards */}
          <div className="mini-cards-row">
        <div className="mini-card">
          <div className="mini-card-icon icon-bg-orange"><i className="fa-solid fa-pen-nib"></i></div>
          <h3 className="mini-card-title">UI/UX Design</h3>
          <p className="mini-card-subtitle">Portfolio V2</p>
          <div className="mini-card-footer">
            <span>Status</span>
            <span className="badge badge-green">Live</span>
          </div>
        </div>
        <div className="mini-card">
          <div className="mini-card-icon icon-bg-green"><i className="fa-solid fa-code"></i></div>
          <h3 className="mini-card-title">Backend API</h3>
          <p className="mini-card-subtitle">Node.js Auth</p>
          <div className="mini-card-footer">
            <span>Status</span>
            <span className="badge badge-green">Live</span>
          </div>
        </div>
        <div className="mini-card">
          <div className="mini-card-icon icon-bg-purple"><i className="fa-solid fa-mobile-screen"></i></div>
          <h3 className="mini-card-title">Mobile App</h3>
          <p className="mini-card-subtitle">React Native</p>
          <div className="mini-card-footer">
            <span>Status</span>
            <span className="badge badge-purple">Planning</span>
          </div>
        </div>
      </div>

      <div className="grid-col-2" style={{ marginBottom: 24 }}>
        <div className="dash-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Login Activity</h2>
            <span className="badge badge-green">Tracking <i className="fa-solid fa-clock"></i></span>
          </div>
          <LoginActivityChart />
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Daily Schedule</h2>
          </div>
          <div className="dash-list">
            <div className="dash-list-item" style={{ border: 'none', padding: 0, background: 'transparent' }}>
              <div className="dash-list-icon icon-bg-orange"><i className="fa-solid fa-layer-group"></i></div>
              <div className="dash-list-content">
                <h4 className="dash-list-title">Design System</h4>
                <p className="dash-list-desc">UI Polish</p>
              </div>
              <i className="fa-solid fa-chevron-right" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}></i>
            </div>
            <div className="dash-list-item" style={{ border: 'none', padding: 0, background: 'transparent' }}>
              <div className="dash-list-icon icon-bg-purple"><i className="fa-solid fa-font"></i></div>
              <div className="dash-list-content">
                <h4 className="dash-list-title">Typography</h4>
                <p className="dash-list-desc">Font updates</p>
              </div>
              <i className="fa-solid fa-chevron-right" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}></i>
            </div>
            <div className="dash-list-item" style={{ border: 'none', padding: 0, background: 'transparent' }}>
              <div className="dash-list-icon icon-bg-green"><i className="fa-solid fa-palette"></i></div>
              <div className="dash-list-content">
                <h4 className="dash-list-title">Color Style</h4>
                <p className="dash-list-desc">Theme tweaks</p>
              </div>
              <i className="fa-solid fa-chevron-right" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Right Column */}
        <div className="dash-calendar-container">
          <CalendarWidget />
        </div>
      </div>

      <div className="dash-grid layout-1-2">
        <div className="dash-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Projects You're Building</h2>
            <a href="#" className="dash-card-action">Active <i className="fa-solid fa-chevron-down"></i></a>
          </div>
          
          <div className="progress-item">
            <div className="mini-card-icon icon-bg-purple" style={{ margin: 0 }}><i className="fa-solid fa-desktop"></i></div>
            <div className="progress-info">
              <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem' }}>Portfolio Dashboard</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}><img src={profileImgSrc} style={{ width: 16, height: 16, borderRadius: '50%', verticalAlign: 'middle', marginRight: 4 }} onError={(e) => e.target.style.display='none'} />Sujal Bhargava</p>
            </div>
            <div style={{ textAlign: 'right', width: 100 }}>
              <div className="progress-header"><span style={{ color: 'var(--text-muted)' }}>Completion</span></div>
            </div>
            <div className="circular-progress" style={{ background: 'conic-gradient(var(--accent) 0% 90%, var(--border) 90% 100%)' }}><span>90%</span></div>
          </div>

          <div className="progress-item" style={{ border: 'none', padding: 0 }}>
            <div className="mini-card-icon icon-bg-orange" style={{ margin: 0 }}><i className="fa-solid fa-server"></i></div>
            <div className="progress-info">
              <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem' }}>Node.js API</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}><img src={profileImgSrc} style={{ width: 16, height: 16, borderRadius: '50%', verticalAlign: 'middle', marginRight: 4 }} onError={(e) => e.target.style.display='none'} />Sujal Bhargava</p>
            </div>
            <div style={{ textAlign: 'right', width: 100 }}>
              <div className="progress-header"><span style={{ color: 'var(--text-muted)' }}>Completion</span></div>
            </div>
            <div className="circular-progress" style={{ background: 'conic-gradient(var(--success) 0% 100%, var(--border) 100% 100%)' }}><span>100%</span></div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Recent Messages</h2>
            <i className="fa-solid fa-plus" style={{ color: 'var(--accent)', background: 'var(--accent-light)', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', cursor: 'pointer' }}></i>
          </div>
          <div className="dash-list">
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 20, color: 'var(--text-muted)' }}>No recent messages.</div>
            ) : (
              messages.slice(0, 4).map((msg, index) => {
                const colors = ['badge-purple', 'badge-green', 'badge-orange', 'badge-blue']
                const badgeColor = colors[index % colors.length]
                const date = new Date(msg.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', hour: 'numeric', minute: '2-digit' })
                return (
                  <div key={msg.id} className="dash-list-item" style={{ alignItems: 'flex-start', padding: 16 }}>
                    <div className="dash-list-icon" style={{ flexShrink: 0 }}><i className="fa-regular fa-envelope"></i></div>
                    <div className="dash-list-content" style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                        <h4 className="dash-list-title" style={{ margin: 0, fontSize: '1rem' }}>{msg.name} <span style={{ fontWeight: 400, fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 8 }}>&lt;{msg.email}&gt;</span></h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: 12 }}>{date}</span>
                      </div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0 0 6px 0' }}>{msg.subject}</p>
                      <p className="dash-list-desc" style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>{msg.message}</p>
                    </div>
                    <span className={`badge ${badgeColor}`} style={{ marginLeft: 12, flexShrink: 0 }}>New</span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
      
      <div className="dash-card" style={{ marginTop: 30 }}>
        <div className="dash-card-header">
          <h2 className="dash-card-title">Feature Management</h2>
          <span className="badge badge-purple">Admin Only</span>
        </div>
        <div className="dash-list">
          {Object.entries(features).length === 0 ? (
            <p style={{ padding: 20 }}>No feature flags configured yet.</p>
          ) : (
            Object.entries(features).map(([id, status]) => (
              <div key={id} className="dash-list-item" style={{ justifyContent: 'space-between' }}>
                <div className="dash-list-content">
                  <h4 className="dash-list-title" style={{ marginBottom: 4 }}>Feature: <code>{id}</code></h4>
                  <p className="dash-list-desc">Current Status: <strong>{status}</strong></p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <button onClick={() => updateFeature(id, 'testing')} className={`badge ${status === 'testing' ? 'badge-purple' : ''}`} style={{ cursor: 'pointer', border: '1px solid var(--border)', background: status === 'testing' ? 'var(--accent)' : 'transparent', color: status === 'testing' ? 'white' : 'var(--text-muted)' }}>Testing</button>
                  <button onClick={() => updateFeature(id, 'admin')} className={`badge ${status === 'admin' ? 'badge-orange' : ''}`} style={{ cursor: 'pointer', border: '1px solid var(--border)', background: status === 'admin' ? 'var(--warning)' : 'transparent', color: status === 'admin' ? 'white' : 'var(--text-muted)' }}>Admin</button>
                  <button onClick={() => updateFeature(id, 'public')} className={`badge ${status === 'public' ? 'badge-green' : ''}`} style={{ cursor: 'pointer', border: '1px solid var(--border)', background: status === 'public' ? 'var(--success)' : 'transparent', color: status === 'public' ? 'white' : 'var(--text-muted)' }}>Public</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
    </>
  )
}
