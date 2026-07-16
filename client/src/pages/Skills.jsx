import { useEffect } from 'react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const SUMMARY = [
  { num: '3', label: 'Programming Languages' },
  { num: '2', label: 'Database Systems' },
  { num: '3', label: 'Web Technologies' },
  { num: '4', label: 'Tools & Editors' },
  { num: '5', label: 'CS Concepts' },
]

const LANGUAGES = [
  { emoji: '🐍', name: 'Python',  sub: 'Primary Language' },
  { emoji: '⚙️', name: 'C++',    sub: 'OOP & Algorithms' },
  { emoji: '🔵', name: 'C',      sub: 'Systems & Logic' },
]

const DATABASES = [
  { emoji: '🐬', name: 'MySQL', sub: 'RDBMS' },
  { emoji: '🗄️', name: 'SQL',   sub: 'Query Language' },
]

const WEB = [
  { emoji: '🌐', name: 'HTML',       sub: 'Structure' },
  { emoji: '🎨', name: 'CSS',        sub: 'Styling' },
  { emoji: '✨', name: 'JavaScript', sub: 'Interactivity' },
]

const TOOLS = [
  { emoji: '📝', name: 'VS Code',      sub: 'Primary Editor' },
  { emoji: '🐙', name: 'Git',          sub: 'Version Control' },
  { emoji: '🐱', name: 'GitHub',       sub: 'Code Hosting' },
  { emoji: '💻', name: 'Code::Blocks', sub: 'C/C++ IDE' },
]

const CONCEPTS = [
  'Object-Oriented Programming (OOP)',
  'Data Structures & Algorithms (DSA)',
  'Database Management Systems (DBMS)',
  'File Handling',
  'Problem Solving & Logical Thinking',
]

function SkillCard({ emoji, name, sub }) {
  return (
    <div className="skill-card">
      <span className="skill-emoji">{emoji}</span>
      <div className="skill-name">{name}</div>
      <div className="skill-sub">{sub}</div>
    </div>
  )
}

export default function Skills() {
  useIntersectionObserver()

  useEffect(() => {
    document.title = 'Skills — Sujal Bhargava'
    const el = document.getElementById('skills-summary')
    const t = setTimeout(() => el && el.classList.add('visible'), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <div className="page">
        <div className="section">
          <div className="section-header fade-up">
            <span className="section-tag">Tech Stack</span>
            <h1 className="section-title">Skills &amp; Technologies</h1>
            <p className="section-desc">
              A comprehensive look at the languages, tools, and concepts I work with and am continuously improving.
            </p>
          </div>

          {/* Summary */}
          <div className="skills-summary stagger" id="skills-summary">
            {SUMMARY.map(({ num, label }) => (
              <div className="summary-card" key={label}>
                <div className="summary-num">{num}</div>
                <div className="summary-label">{label}</div>
              </div>
            ))}
          </div>

          {/* Programming Languages */}
          <div className="skill-category cat-lang fade-up">
            <div className="cat-header">
              <div className="cat-icon"><i className="fa-solid fa-code" /></div>
              <div>
                <div className="cat-title">Programming Languages</div>
                <div className="cat-desc">Core languages I use to build software</div>
              </div>
            </div>
            <div className="skills-grid">
              {LANGUAGES.map(s => <SkillCard key={s.name} {...s} />)}
            </div>
          </div>

          {/* Database */}
          <div className="skill-category cat-db fade-up">
            <div className="cat-header">
              <div className="cat-icon"><i className="fa-solid fa-database" /></div>
              <div>
                <div className="cat-title">Database</div>
                <div className="cat-desc">Storing, querying, and managing data</div>
              </div>
            </div>
            <div className="skills-grid">
              {DATABASES.map(s => <SkillCard key={s.name} {...s} />)}
            </div>
          </div>

          {/* Web */}
          <div className="skill-category cat-web fade-up">
            <div className="cat-header">
              <div className="cat-icon"><i className="fa-solid fa-globe" /></div>
              <div>
                <div className="cat-title">Web Technologies</div>
                <div className="cat-desc">Front-end building blocks</div>
              </div>
            </div>
            <div className="skills-grid">
              {WEB.map(s => <SkillCard key={s.name} {...s} />)}
            </div>
          </div>

          {/* Tools */}
          <div className="skill-category cat-tools fade-up">
            <div className="cat-header">
              <div className="cat-icon"><i className="fa-solid fa-wrench" /></div>
              <div>
                <div className="cat-title">Tools &amp; Environment</div>
                <div className="cat-desc">My development toolkit</div>
              </div>
            </div>
            <div className="skills-grid">
              {TOOLS.map(s => <SkillCard key={s.name} {...s} />)}
            </div>
          </div>

          {/* Concepts */}
          <div className="skill-category cat-concepts fade-up">
            <div className="cat-header">
              <div className="cat-icon"><i className="fa-solid fa-brain" /></div>
              <div>
                <div className="cat-title">CS Concepts</div>
                <div className="cat-desc">Foundational knowledge and principles</div>
              </div>
            </div>
            <div className="concepts-grid">
              {CONCEPTS.map((text, i) => (
                <div className="concept-card" key={text}>
                  <span className="concept-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="concept-text">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .skill-category { margin-bottom: 52px; }
        .cat-header { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
        .cat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0; }
        .cat-title { font-size: 1.05rem; font-weight: 700; color: var(--text-primary); }
        .cat-desc { font-size: 0.82rem; color: var(--text-muted); margin-top: 2px; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
        .skill-card {
          background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm);
          padding: 20px 16px; text-align: center; box-shadow: var(--card-shadow);
          transition: var(--transition); cursor: default; position: relative; overflow: hidden;
        }
        .skill-card::before { content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s var(--ease); }
        .skill-card:hover { transform: translateY(-4px); box-shadow: var(--card-shadow-md); }
        .skill-card:hover::before { opacity: 1; }
        .cat-lang .skill-card:hover { border-color: #818cf8; }
        .cat-lang .skill-card::before { background: linear-gradient(135deg, rgba(79,70,229,0.04), rgba(129,140,248,0.06)); }
        .cat-lang .cat-icon { background: var(--accent-light); color: var(--accent); }
        .cat-db .skill-card:hover { border-color: #34d399; }
        .cat-db .skill-card::before { background: linear-gradient(135deg, rgba(16,185,129,0.04), rgba(52,211,153,0.06)); }
        .cat-db .cat-icon { background: #f0fdf4; color: #16a34a; }
        .cat-web .skill-card:hover { border-color: #f472b6; }
        .cat-web .skill-card::before { background: linear-gradient(135deg, rgba(244,114,182,0.04), rgba(236,72,153,0.06)); }
        .cat-web .cat-icon { background: #fdf2f8; color: #db2777; }
        .cat-tools .skill-card:hover { border-color: #fb923c; }
        .cat-tools .skill-card::before { background: linear-gradient(135deg, rgba(251,146,60,0.04), rgba(234,88,12,0.06)); }
        .cat-tools .cat-icon { background: #fff7ed; color: #ea580c; }
        .cat-concepts .skill-card:hover { border-color: #a78bfa; }
        .cat-concepts .skill-card::before { background: linear-gradient(135deg, rgba(167,139,250,0.04), rgba(124,58,237,0.06)); }
        .cat-concepts .cat-icon { background: #f5f3ff; color: #7c3aed; }
        .skill-emoji { font-size: 2rem; margin-bottom: 10px; display: block; transition: transform 0.3s var(--ease); }
        .skill-card:hover .skill-emoji { transform: scale(1.15); }
        .skill-name { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
        .skill-sub { font-size: 0.72rem; color: var(--text-muted); font-weight: 500; }
        .concepts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
        .concept-card {
          background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm);
          padding: 18px 20px; box-shadow: var(--card-shadow); transition: var(--transition);
          display: flex; align-items: center; gap: 14px;
        }
        .concept-card:hover { border-color: #a78bfa; background: #f5f3ff; transform: translateY(-3px); box-shadow: var(--card-shadow-md); }
        .concept-num {
          font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: var(--accent);
          font-weight: 600; background: var(--accent-light); padding: 4px 8px; border-radius: 6px; flex-shrink: 0;
        }
        .concept-text { font-size: 0.88rem; font-weight: 600; color: var(--text-primary); }
        .skills-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; margin-bottom: 56px; }
        .summary-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 20px 22px; box-shadow: var(--card-shadow); text-align: center; }
        .summary-num { font-size: 2rem; font-weight: 900; color: var(--accent); letter-spacing: -0.04em; }
        .summary-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
        @media (max-width: 600px) {
          .skills-grid { grid-template-columns: repeat(3, 1fr); }
          .concepts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
