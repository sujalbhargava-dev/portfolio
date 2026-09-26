import { useState, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import '../styles/Skills.css'

const CATEGORY_CONFIG = {
  lang: { icon: 'fa-code', title: 'Programming Languages', desc: 'Core languages I use to build software' },
  db: { icon: 'fa-database', title: 'Database', desc: 'Storing, querying, and managing data' },
  web: { icon: 'fa-globe', title: 'Web Technologies', desc: 'Front-end building blocks' },
  tools: { icon: 'fa-wrench', title: 'Tools & Environment', desc: 'My development toolkit' },
  concepts: { icon: 'fa-brain', title: 'CS Concepts', desc: 'Foundational knowledge and principles' }
}

export default function Skills() {
  const animateRef = useScrollAnimation()
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        if (data.success) setSkills(data.skills)
        setLoading(false)
        
        // Trigger summary animation after load
        setTimeout(() => {
          const el = document.getElementById('skills-summary')
          if (el) el.classList.add('visible')
        }, 100)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  if (loading) return <div className="page" style={{ padding: 100, textAlign: 'center' }}>Loading skills...</div>

  return (
    <div className="page">
      <div className="section">
        <div className="section-header fade-up" ref={animateRef}>
          <span className="section-tag">Tech Stack</span>
          <h1 className="section-title text-gradient">Skills &amp; Technologies</h1>
          <p className="section-desc">A comprehensive look at the languages, tools, and concepts I work with and am continuously improving.</p>
        </div>

        <div className="skills-summary stagger" id="skills-summary">
          <div className="summary-card"><div className="summary-num">{groupedSkills.lang?.length || 0}</div><div className="summary-label">Programming Languages</div></div>
          <div className="summary-card"><div className="summary-num">{groupedSkills.db?.length || 0}</div><div className="summary-label">Database Systems</div></div>
          <div className="summary-card"><div className="summary-num">{groupedSkills.web?.length || 0}</div><div className="summary-label">Web Technologies</div></div>
          <div className="summary-card"><div className="summary-num">{groupedSkills.tools?.length || 0}</div><div className="summary-label">Tools &amp; Editors</div></div>
          <div className="summary-card"><div className="summary-num">{groupedSkills.concepts?.length || 0}</div><div className="summary-label">CS Concepts</div></div>
        </div>

        {['lang', 'db', 'web', 'tools', 'concepts'].map(cat => {
          if (!groupedSkills[cat] || groupedSkills[cat].length === 0) return null
          
          const config = CATEGORY_CONFIG[cat]
          
          return (
            <div key={cat} className={`skill-category cat-${cat} fade-up`} ref={animateRef}>
              <div className="cat-header">
                <div className="cat-icon"><i className={`fa-solid ${config.icon}`}></i></div>
                <div>
                  <div className="cat-title">{config.title}</div>
                  <div className="cat-desc">{config.desc}</div>
                </div>
              </div>
              
              {cat === 'concepts' ? (
                <div className="concepts-grid">
                  {groupedSkills[cat].map(skill => (
                    <div key={skill.id} className="concept-card">
                      <span className="concept-num">{skill.emoji}</span>
                      <span className="concept-text">{skill.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="skills-grid">
                  {groupedSkills[cat].map(skill => (
                    <div key={skill.id} className="skill-card">
                      <span className="skill-emoji">{skill.emoji}</span>
                      <div className="skill-name">{skill.name}</div>
                      <div className="skill-sub">{skill.subtitle}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

