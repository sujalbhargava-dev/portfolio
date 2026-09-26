import { useState, useEffect } from 'react'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        if (data.success) setMessages(data.messages || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <header className="dash-header">
        <h1 className="dash-welcome">Messages</h1>
      </header>

      <div className="dash-card">
        <div className="dash-card-header">
          <h3 className="dash-card-title">All Messages ({messages.length})</h3>
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        ) : messages.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No messages received yet.</p>
        ) : (
          <div className="dash-list">
            {messages.map(msg => (
              <div className="dash-list-item" key={msg.id} style={{ alignItems: 'flex-start', padding: 16 }}>
                <div className="dash-list-icon" style={{ flexShrink: 0 }}><i className="fa-regular fa-envelope"></i></div>
                <div className="dash-list-content" style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <h4 className="dash-list-title" style={{ margin: 0, fontSize: '0.95rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                      {msg.name}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0, paddingTop: 2 }}>
                      {msg.timestamp ? new Date(msg.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', hour: 'numeric', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    &lt;{msg.email}&gt;
                  </div>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', margin: '6px 0 2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.subject}</p>
                  <p className="dash-list-desc" style={{ color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, whiteSpace: 'normal', lineHeight: 1.4 }}>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
