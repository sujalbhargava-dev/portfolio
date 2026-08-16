import { useState, useEffect } from 'react'

export default function ManageProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    project_type: 'Desktop App',
    features: '', // Will handle as comma separated string in form
    tech_stack: '', // Will handle as comma separated string in form
    github_url: '',
    sort_order: 0
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/projects')
      const data = await res.json()
      if (data.success) {
        setProjects(data.projects)
      } else {
        setError('Failed to load projects')
      }
    } catch (err) {
      setError('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project) => {
    setFormData({
      ...project,
      features: project.features ? project.features.join(', ') : '',
      tech_stack: project.tech_stack ? project.tech_stack.join(', ') : ''
    })
    setIsFormOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`http://localhost:3000/api/projects/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setProjects(projects.filter(p => p.id !== id))
      }
    } catch (err) {
      console.error('Delete error', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Convert comma separated strings back to arrays
    const payload = {
      ...formData,
      features: formData.features.split(',').map(s => s.trim()).filter(s => s),
      tech_stack: formData.tech_stack.split(',').map(s => s.trim()).filter(s => s)
    }

    const isEditing = !!formData.id
    const url = isEditing ? `http://localhost:3000/api/projects/${formData.id}` : 'http://localhost:3000/api/projects'
    const method = isEditing ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      
      if (data.success) {
        fetchProjects()
        setIsFormOpen(false)
        resetForm()
      }
    } catch (err) {
      console.error('Submit error', err)
    }
  }

  const resetForm = () => {
    setFormData({
      id: null, title: '', description: '', project_type: 'Desktop App',
      features: '', tech_stack: '', github_url: '', sort_order: 0
    })
  }

  return (
    <div>
      <div className="dash-header" style={{ marginBottom: 24, padding: 0, border: 'none', background: 'transparent' }}>
        <h1 className="dash-welcome">Manage Projects</h1>
        <button className="btn btn-primary" onClick={() => {
          resetForm()
          setIsFormOpen(!isFormOpen)
        }}>
          {isFormOpen ? 'Cancel' : '+ Add New Project'}
        </button>
      </div>

      {error && <div style={{ color: 'var(--success)', marginBottom: 16 }}>{error}</div>}

      {isFormOpen && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 16 }}>{formData.id ? 'Edit Project' : 'Add New Project'}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6 }}>Project Title</label>
              <input required type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Portfolio Website" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6 }}>Description</label>
              <textarea required className="form-input" style={{ minHeight: 80, resize: 'vertical' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Project description..."></textarea>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6 }}>Project Type</label>
                <input type="text" className="form-input" value={formData.project_type} onChange={e => setFormData({...formData, project_type: e.target.value})} placeholder="e.g. Web App" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6 }}>GitHub URL (optional)</label>
                <input type="text" className="form-input" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} placeholder="https://github.com/..." />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6 }}>Sort Order</label>
                <input type="number" className="form-input" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6 }}>Features (comma separated)</label>
              <input type="text" className="form-input" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} placeholder="Feature 1, Feature 2, Feature 3" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: 6 }}>Tech Stack (comma separated)</label>
              <input type="text" className="form-input" value={formData.tech_stack} onChange={e => setFormData({...formData, tech_stack: e.target.value})} placeholder="React, Node.js, SQLite" />
            </div>

            <div>
              <button type="submit" className="btn btn-primary">{formData.id ? 'Save Changes' : 'Add Project'}</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {projects.map(project => (
            <div key={project.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{project.title}</h3>
                  <span className="badge badge-blue">{project.project_type}</span>
                </div>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{project.description}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {project.tech_stack && project.tech_stack.map(tech => (
                    <span key={tech} className="badge badge-slate">{tech}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => handleEdit(project)} className="btn btn-outline" style={{ padding: '8px 12px' }}><i className="fa-solid fa-pen"></i></button>
                <button onClick={() => handleDelete(project.id)} className="btn btn-outline" style={{ padding: '8px 12px', color: '#ef4444', borderColor: '#ef4444' }}><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: 32 }}>No projects found.</div>
          )}
        </div>
      )}
    </div>
  )
}
