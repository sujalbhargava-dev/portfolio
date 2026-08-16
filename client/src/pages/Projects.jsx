import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import '../styles/Projects.css'

export default function Projects() {
  const animateRef = useScrollAnimation()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProjects(data.projects)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="page" style={{ padding: 100, textAlign: 'center' }}>Loading projects...</div>

  return (
    <div className="page">
      <div className="section">
        <div className="section-header fade-up" ref={animateRef}>
          <span className="section-tag">My Work</span>
          <h1 className="section-title text-gradient">Featured Projects</h1>
          <p className="section-desc">Real-world applications I have built, applying programming concepts to solve practical problems.</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={project.id} className={`project-card p${(index % 2) + 1} fade-up`} ref={animateRef}>
              <div className="project-inner">
                <div className="project-meta">
                  <span className="project-number">Project {String(index + 1).padStart(2, '0')}</span>
                  <span className={`project-type type-${project.project_type?.toLowerCase().includes('database') ? 'database' : 'desktop'}`}>
                    <i className={`fa-solid ${project.project_type?.toLowerCase().includes('database') ? 'fa-database' : 'fa-desktop'}`}></i> &nbsp;{project.project_type}
                  </span>
                </div>
                <h2 className="project-title">{project.title}</h2>
                <p className="project-desc">{project.description}</p>
                
                {project.features && project.features.length > 0 && (
                  <div className="feature-list">
                    {project.features.map((f, i) => (
                      <div className="feature-item" key={i}><div className="feature-dot"><i className="fa-solid fa-check"></i></div><span>{f}</span></div>
                    ))}
                  </div>
                )}
                
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="tech-section">
                    <div className="tech-label">Tech Stack</div>
                    <div className="tech-tags">
                      {project.tech_stack.map(t => <span className="tech-tag" key={t}>{t}</span>)}
                    </div>
                  </div>
                )}
                
                {project.github_url && (
                  <div style={{ marginTop: 24 }}>
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                      <i className="fa-brands fa-github"></i> View Source
                    </a>
                  </div>
                )}
              </div>
              
              <div className="project-visual">
                <div className="visual-label"><i className="fa-solid fa-terminal"></i> &nbsp;Preview Overview</div>
                <div className="visual-mockup">
                  <div><span className="vm-g">===== {project.title} =====</span></div>
                  <div><span className="vm-b">Type:</span> {project.project_type}</div>
                  <div>-------------------------------</div>
                  {project.tech_stack && project.tech_stack.map((t, i) => (
                    <div key={i}><span className="vm-y">&gt; Loading module:</span> {t}... <span className="vm-g">[OK]</span></div>
                  ))}
                  <div>-------------------------------</div>
                  <div><span className="vm-p">System ready.</span></div>
                  <div><span className="vm-b">Awaiting input...</span> <span style={{ animation: 'blink 1s step-end infinite' }}>_</span></div>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No projects found.</div>
          )}
        </div>

        {/* CTA */}
        <div className="projects-cta fade-up" ref={animateRef}>
          <div className="cta-title">🚀 More Projects Coming Soon</div>
          <p className="cta-desc">I am continuously working on new projects. Check back often or connect with me to see what I am building next.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://github.com/sujalbhargava-dev" target="_blank" rel="noopener noreferrer" className="btn btn-primary" id="github-projects-btn">
              <i className="fa-brands fa-github"></i> View GitHub
            </a>
            <Link to="/contact" className="btn btn-outline" id="collaborate-btn">
              <i className="fa-solid fa-handshake"></i> Let's Collaborate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
