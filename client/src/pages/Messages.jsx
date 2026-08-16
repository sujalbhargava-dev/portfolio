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
              <div className="dash-list-item" key={msg.id} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <p className="dash-list-title" style={{ margin: 0 }}>{msg.name}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
                    {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ''}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, margin: 0 }}>{msg.subject}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>{msg.email}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0, marginTop: 4 }}>{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
