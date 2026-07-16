import { useEffect } from 'react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const TIMELINE = [
  {
    type: 'current',
    icon: 'fa-solid fa-graduation-cap',
    year: '2023 — Present',
    badge: 'Currently Pursuing',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'ITM University, Gwalior',
    desc: 'Pursuing a 3-year undergraduate degree in Computer Applications, focusing on programming fundamentals, database management, object-oriented development, web technologies, and applied software projects.',
    subjects: ['Programming in Python', 'C / C++', 'DBMS', 'DSA', 'Web Development', 'OOP', 'Computer Networks', 'Operating Systems'],
  },
  {
    type: 'past',
    icon: 'fa-solid fa-school',
    year: '2022 — 2023',
    degree: 'Higher Secondary (12th Standard)',
    institution: 'Science Stream — Gwalior, MP',
    desc: 'Completed 12th standard with a focus on science and mathematics, laying the analytical foundation for computer science studies.',
  },
  {
    type: 'past',
    icon: 'fa-solid fa-book',
    year: '2020 — 2021',
    degree: 'Secondary (10th Standard)',
    institution: 'Gwalior, Madhya Pradesh',
    desc: 'Completed secondary education with strong fundamentals in mathematics and science, sparking an interest in computing and technology.',
  },
]

const HIGHLIGHTS = [
  { icon: 'fa-solid fa-university',    text: <><strong>ITM University</strong> — Recognized institution in Gwalior, MP</> },
  { icon: 'fa-solid fa-calendar',      text: <><strong>3-Year Program</strong> — Full BCA curriculum</> },
  { icon: 'fa-solid fa-laptop-code',   text: <><strong>Hands-on Projects</strong> — Built 2+ real applications</> },
  { icon: 'fa-solid fa-code',          text: <><strong>Self-Learning</strong> — Continuously expanding skills</> },
]

const COURSES = [
  { name: 'Programming in Python',          sem: 'Sem 1–2' },
  { name: 'C Programming & C++',            sem: 'Sem 1–3' },
  { name: 'Database Management Systems',    sem: 'Sem 2–3' },
  { name: 'Data Structures & Algorithms',   sem: 'Sem 3' },
  { name: 'Web Technologies (HTML/CSS/JS)', sem: 'Sem 4' },
  { name: 'Object-Oriented Programming',    sem: 'Sem 2–4' },
]

const GOALS = [
  { num: '01', text: <>Master <strong>Data Structures &amp; Algorithms</strong> for competitive programming</> },
  { num: '02', text: <>Deepen expertise in <strong>Database Design</strong> and advanced SQL</> },
  { num: '03', text: <>Explore <strong>Web Development</strong> with modern frameworks</> },
  { num: '04', text: <>Land a <strong>Software Internship</strong> to gain real-world experience</> },
]

export default function Education() {
  useIntersectionObserver()
  useEffect(() => { document.title = 'Education — Sujal Bhargava' }, [])

  return (
    <>
      <div className="page">
        <div className="section">
          <div className="section-header fade-up">
            <span className="section-tag">Education</span>
            <h1 className="section-title">Academic Background</h1>
            <p className="section-desc">
              My educational journey — building a strong foundation in computer science and software development.
            </p>
          </div>

          <div className="edu-layout">
            {/* Timeline */}
            <div className="fade-up">
              <div className="timeline">
                {TIMELINE.map(({ type, icon, year, badge, degree, institution, desc, subjects }) => (
                  <div className="timeline-item" key={degree}>
                    <div className="tl-dot-wrap">
                      <div className={`tl-dot ${type}`}><i className={icon} /></div>
                    </div>
                    <div className="tl-content">
                      <div className="tl-year">
                        {year}
                        {badge && <span className="current-badge">{badge}</span>}
                      </div>
                      <div className="tl-degree">{degree}</div>
                      <div className="tl-institution">{institution}</div>
                      <p className="tl-desc">{desc}</p>
                      {subjects && (
                        <div className="tl-subjects">
                          {subjects.map((s) => <span className="tl-subject" key={s}>{s}</span>)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="edu-sidebar">
              <div className="edu-highlight fade-up">
                <div className="edu-hl-title"><i className="fa-solid fa-star" /> &nbsp;Key Highlights</div>
                <div className="hl-list">
                  {HIGHLIGHTS.map(({ icon, text }, i) => (
                    <div className="hl-item" key={i}>
                      <div className="hl-icon"><i className={icon} /></div>
                      <div className="hl-text">{text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="courses-card fade-up">
                <div className="courses-title"><i className="fa-solid fa-list-check" /> &nbsp;Key Courses</div>
                {COURSES.map(({ name, sem }) => (
                  <div className="course-row" key={name}>
                    <span className="course-name">{name}</span>
                    <span className="course-sem">{sem}</span>
                  </div>
                ))}
              </div>

              <div className="goals-card fade-up">
                <div className="courses-title"><i className="fa-solid fa-rocket" /> &nbsp;Learning Goals</div>
                {GOALS.map(({ num, text }) => (
                  <div className="goal-item" key={num}>
                    <div className="goal-num">{num}</div>
                    <div className="goal-text">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .edu-layout { display: grid; grid-template-columns: 1fr 2fr; gap: 64px; align-items: start; }
        .timeline { position: relative; display: flex; flex-direction: column; gap: 0; }
        .timeline::before { content: ''; position: absolute; left: 23px; top: 0; bottom: 0; width: 2px; background: var(--border); }
        .timeline-item { display: flex; gap: 24px; padding-bottom: 40px; position: relative; }
        .timeline-item:last-child { padding-bottom: 0; }
        .tl-dot-wrap { position: relative; flex-shrink: 0; }
        .tl-dot { width: 48px; height: 48px; border-radius: 50%; border: 2px solid; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; background: var(--bg); position: relative; z-index: 1; transition: var(--transition); }
        .tl-dot.current { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }
        .tl-dot.past { border-color: var(--border); color: var(--text-muted); background: var(--bg-secondary); }
        .tl-content { flex: 1; padding-top: 8px; }
        .tl-year { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; font-weight: 500; color: var(--text-muted); margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
        .current-badge { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; font-size: 0.65rem; font-weight: 700; padding: 2px 8px; border-radius: 100px; font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 0.06em; }
        .tl-degree { font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; letter-spacing: -0.02em; }
        .tl-institution { font-size: 0.9rem; color: var(--accent); font-weight: 600; margin-bottom: 12px; }
        .tl-desc { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.7; }
        .tl-subjects { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .tl-subject { font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 6px; background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid var(--border); }
        .edu-sidebar { display: flex; flex-direction: column; gap: 24px; }
        .edu-highlight { background: linear-gradient(135deg, #f5f3ff, #eef2ff); border: 1px solid var(--accent-border); border-radius: var(--radius); padding: 28px; box-shadow: var(--card-shadow); }
        .edu-hl-title { font-size: 0.85rem; font-weight: 700; color: var(--accent); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; }
        .hl-list { display: flex; flex-direction: column; gap: 10px; }
        .hl-item { display: flex; align-items: center; gap: 10px; }
        .hl-icon { width: 28px; height: 28px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--accent); font-size: 0.75rem; box-shadow: 0 1px 4px rgba(0,0,0,0.07); flex-shrink: 0; }
        .hl-text { font-size: 0.85rem; color: var(--text-secondary); font-weight: 500; }
        .hl-text strong { color: var(--text-primary); }
        .courses-card, .goals-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; box-shadow: var(--card-shadow); }
        .courses-title { font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; }
        .course-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border); }
        .course-row:last-child { border-bottom: none; padding-bottom: 0; }
        .course-name { font-size: 0.875rem; color: var(--text-primary); font-weight: 500; }
        .course-sem { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--text-muted); }
        .goal-item { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
        .goal-item:last-child { margin-bottom: 0; }
        .goal-num { width: 28px; height: 28px; background: var(--accent); color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; font-weight: 700; flex-shrink: 0; }
        .goal-text { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; padding-top: 4px; }
        .goal-text strong { color: var(--text-primary); }
        @media (max-width: 900px) { .edu-layout { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>
    </>
  )
}
