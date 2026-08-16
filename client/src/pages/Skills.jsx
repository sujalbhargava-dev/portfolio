import { useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import '../styles/Skills.css'

export default function Skills() {
  const animateRef = useScrollAnimation()

  useEffect(() => {
    const el = document.getElementById('skills-summary')
    if (el) setTimeout(() => el.classList.add('visible'), 300)
  }, [])

  return (
    <div className="page">
      <div className="section">
        <div className="section-header fade-up" ref={animateRef}>
          <span className="section-tag">Tech Stack</span>
          <h1 className="section-title">Skills &amp; Technologies</h1>
          <p className="section-desc">A comprehensive look at the languages, tools, and concepts I work with and am continuously improving.</p>
        </div>

        <div className="skills-summary stagger" id="skills-summary">
          <div className="summary-card"><div className="summary-num">3</div><div className="summary-label">Programming Languages</div></div>
          <div className="summary-card"><div className="summary-num">2</div><div className="summary-label">Database Systems</div></div>
          <div className="summary-card"><div className="summary-num">3</div><div className="summary-label">Web Technologies</div></div>
          <div className="summary-card"><div className="summary-num">4</div><div className="summary-label">Tools &amp; Editors</div></div>
          <div className="summary-card"><div className="summary-num">5</div><div className="summary-label">CS Concepts</div></div>
        </div>

        <div className="skill-category cat-lang fade-up" ref={animateRef}>
          <div className="cat-header"><div className="cat-icon"><i className="fa-solid fa-code"></i></div><div><div className="cat-title">Programming Languages</div><div className="cat-desc">Core languages I use to build software</div></div></div>
          <div className="skills-grid">
            <div className="skill-card"><span className="skill-emoji">🐍</span><div className="skill-name">Python</div><div className="skill-sub">Primary Language</div></div>
            <div className="skill-card"><span className="skill-emoji">⚙️</span><div className="skill-name">C++</div><div className="skill-sub">OOP &amp; Algorithms</div></div>
            <div className="skill-card"><span className="skill-emoji">🔵</span><div className="skill-name">C</div><div className="skill-sub">Systems &amp; Logic</div></div>
          </div>
        </div>

        <div className="skill-category cat-db fade-up" ref={animateRef}>
          <div className="cat-header"><div className="cat-icon"><i className="fa-solid fa-database"></i></div><div><div className="cat-title">Database</div><div className="cat-desc">Storing, querying, and managing data</div></div></div>
          <div className="skills-grid">
            <div className="skill-card"><span className="skill-emoji">🐬</span><div className="skill-name">MySQL</div><div className="skill-sub">RDBMS</div></div>
            <div className="skill-card"><span className="skill-emoji">🗄️</span><div className="skill-name">SQL</div><div className="skill-sub">Query Language</div></div>
          </div>
        </div>

        <div className="skill-category cat-web fade-up" ref={animateRef}>
          <div className="cat-header"><div className="cat-icon"><i className="fa-solid fa-globe"></i></div><div><div className="cat-title">Web Technologies</div><div className="cat-desc">Front-end building blocks</div></div></div>
          <div className="skills-grid">
            <div className="skill-card"><span className="skill-emoji">🌐</span><div className="skill-name">HTML</div><div className="skill-sub">Structure</div></div>
            <div className="skill-card"><span className="skill-emoji">🎨</span><div className="skill-name">CSS</div><div className="skill-sub">Styling</div></div>
            <div className="skill-card"><span className="skill-emoji">✨</span><div className="skill-name">JavaScript</div><div className="skill-sub">Interactivity</div></div>
          </div>
        </div>

        <div className="skill-category cat-tools fade-up" ref={animateRef}>
          <div className="cat-header"><div className="cat-icon"><i className="fa-solid fa-wrench"></i></div><div><div className="cat-title">Tools &amp; Environment</div><div className="cat-desc">My development toolkit</div></div></div>
          <div className="skills-grid">
            <div className="skill-card"><span className="skill-emoji">📝</span><div className="skill-name">VS Code</div><div className="skill-sub">Primary Editor</div></div>
            <div className="skill-card"><span className="skill-emoji">🐙</span><div className="skill-name">Git</div><div className="skill-sub">Version Control</div></div>
            <div className="skill-card"><span className="skill-emoji">🐱</span><div className="skill-name">GitHub</div><div className="skill-sub">Code Hosting</div></div>
            <div className="skill-card"><span className="skill-emoji">💻</span><div className="skill-name">Code::Blocks</div><div className="skill-sub">C/C++ IDE</div></div>
          </div>
        </div>

        <div className="skill-category cat-concepts fade-up" ref={animateRef}>
          <div className="cat-header"><div className="cat-icon"><i className="fa-solid fa-brain"></i></div><div><div className="cat-title">CS Concepts</div><div className="cat-desc">Foundational knowledge and principles</div></div></div>
          <div className="concepts-grid">
            <div className="concept-card"><span className="concept-num">01</span><span className="concept-text">Object-Oriented Programming (OOP)</span></div>
            <div className="concept-card"><span className="concept-num">02</span><span className="concept-text">Data Structures &amp; Algorithms (DSA)</span></div>
            <div className="concept-card"><span className="concept-num">03</span><span className="concept-text">Database Management Systems (DBMS)</span></div>
            <div className="concept-card"><span className="concept-num">04</span><span className="concept-text">File Handling</span></div>
            <div className="concept-card"><span className="concept-num">05</span><span className="concept-text">Problem Solving &amp; Logical Thinking</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
