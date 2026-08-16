import { useState, useEffect } from 'react'

export default function ManageSkills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    emoji: '⚡',
    category: 'lang',
    subtitle: '',
    sort_order: 0
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/skills')
      const data = await res.json()
      if (data.success) {
        setSkills(data.skills)
      } else {
        setError('Failed to load skills')
      }
    } catch (err) {
      setError('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (skill) => {
    setFormData(skill)
    setIsFormOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return

    try {
      const res = await fetch(`http://localhost:3000/api/skills/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setSkills(skills.filter(s => s.id !== id))
      }
    } catch (err) {
      console.error('Delete error', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const isEditing = !!formData.id
    const url = isEditing ? `http://localhost:3000/api/skills/${formData.id}` : 'http://localhost:3000/api/skills'
    const method = isEditing ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      
      if (data.success) {
        fetchSkills()
        setIsFormOpen(false)
        setFormData({ id: null, name: '', emoji: '⚡', category: 'lang', subtitle: '', sort_order: 0 })
      }
    } catch (err) {
      console.error('Submit error', err)
    }
  }

  return (
    <div>
      <div className="dash-header" style={{ marginBottom: 24, padding: 0, border: 'none', background: 'transparent' }}>
        <h1 className="dash-welcome">Manage Skills</h1>
        <button className="btn btn-primary" onClick={() => {
          setFormData({ id: null, name: '', emoji: '⚡', category: 'lang', subtitle: '', sort_order: 0 })
          setIsFormOpen(!isFormOpen)
        }}>
          {isFormOpen ? 'Cancel' : '+ Add New Skill'}
        </button>
      </div>

      {error && <div style={{ color: 'var(--success)', marginBottom: 16 }}>{error}</div>}

      {isFormOpen && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 16 }}>{formData.id ? 'Edit Skill' : 'Add New Skill'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6 }}>Skill Name</label>
                <input required type="text" className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. React" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6 }}>Emoji / Icon</label>
                <input type="text" className="form-input" value={formData.emoji} onChange={e => setFormData({...formData, emoji: e.target.value})} placeholder="e.g. ⚛️" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6 }}>Category</label>
                <select className="form-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="lang">Programming Languages</option>
                  <option value="db">Database</option>
                  <option value="web">Web Technologies</option>
                  <option value="tools">Tools & Env</option>
                  <option value="concepts">CS Concepts</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6 }}>Subtitle</label>
                <input type="text" className="form-input" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="e.g. Framework" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6 }}>Sort Order</label>
                <input type="number" className="form-input" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} />
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-primary">{formData.id ? 'Save Changes' : 'Add Skill'}</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading skills...</p>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border)' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: '0.85rem' }}>Icon & Name</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: '0.85rem' }}>Category</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: '0.85rem' }}>Subtitle</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: '0.85rem', width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map(skill => (
                <tr key={skill.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ marginRight: 8 }}>{skill.emoji}</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{skill.name}</strong>
                  </td>
                  <td style={{ padding: '12px 16px' }}><span className="badge badge-purple">{skill.category}</span></td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{skill.subtitle}</td>
                  <td style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEdit(skill)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}><i className="fa-solid fa-pen"></i></button>
                    <button onClick={() => handleDelete(skill.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))}
              {skills.length === 0 && (
                <tr><td colSpan="4" style={{ padding: 24, textAlign: 'center' }}>No skills found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
