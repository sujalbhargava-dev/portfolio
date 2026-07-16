import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const PROJECTS = [
  {
    id: 'p1',
    cls: 'p1',
    num: 'Project 01',
    typeLabel: 'type-desktop',
    typeIcon: 'fa-solid fa-desktop',
    typeName: 'Desktop App',
    title: 'Shopping Cart Management System',
    desc: 'A fully-functional desktop shopping cart application built with Python and Tkinter. Users can manage a product catalog, apply discounts, calculate shipping charges, and generate detailed billing summaries — all through an intuitive GUI interface.',
    features: [
      'Add, update, and delete products with full CRUD operations',
      'Automatic discount calculation based on cart total',
      'Dynamic shipping charge computation',
      'Billing summary generation with itemized receipts',
      'File Handling / MySQL for persistent data storage',
      'OOP-based modular design for scalability',
    ],
    tech: ['Python', 'Tkinter', 'MySQL', 'File Handling', 'OOP'],
    visualLabel: 'Terminal Preview',
    visual: (
      <div className="visual-mockup">
        <div><span className="vm-g">===== Shopping Cart System =====</span></div>
        <div><span className="vm-b">Product</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="vm-b">Qty</span>&nbsp;&nbsp;<span className="vm-b">Price</span>&nbsp;&nbsp;<span className="vm-b">Total</span></div>
        <div>{'-------------------------------'}</div>
        <div>Laptop &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;45000&nbsp;&nbsp;45000</div>
        <div>Mouse&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;500&nbsp;&nbsp;&nbsp;1000</div>
        <div>Keyboard&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;1200&nbsp;&nbsp;&nbsp;1200</div>
        <div>{'-------------------------------'}</div>
        <div>Subtotal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="vm-y">47200</span></div>
        <div>Discount (10%)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="vm-r">-4720</span></div>
        <div>Shipping&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="vm-y">99</span></div>
        <div>{'=============================='}</div>
        <div><span className="vm-g">TOTAL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;42579</span></div>
      </div>
    ),
  },
  {
    id: 'p2',
    cls: 'p2',
    num: 'Project 02',
    typeLabel: 'type-database',
    typeIcon: 'fa-solid fa-database',
    typeName: 'Database System',
    title: 'Payroll Management System',
    desc: 'A comprehensive database-driven payroll system designed for organizations to manage employee records, track attendance, automate salary calculations, and handle leave management — all modeled with proper DBMS principles and ER diagrams.',
    features: [
      'Complete employee record management system',
      'Attendance tracking and leave management module',
      'Automated salary calculation with deductions and allowances',
      'Department-based organizational structure',
      'Properly designed ER Diagram with normalized tables',
      'Complex SQL queries for reporting and analytics',
    ],
    tech: ['MySQL', 'SQL', 'ER Diagram', 'DBMS Concepts', 'Normalization'],
    visualLabel: 'SQL Preview',
    visual: (
      <div className="visual-mockup">
        <div><span className="vm-p">-- Salary Calculation Query</span></div>
        <div><span className="vm-b">SELECT</span> e.emp_id, e.name,</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;d.dept_name,</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;s.basic + s.hra + s.da <span className="vm-b">AS</span> gross,</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;s.pf + s.tax <span className="vm-b">AS</span> deductions,</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;(s.basic+s.hra+s.da) -</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;(s.pf+s.tax) <span className="vm-b">AS</span> <span className="vm-g">net_salary</span></div>
        <div><span className="vm-b">FROM</span> employees e</div>
        <div><span className="vm-b">JOIN</span> departments d <span className="vm-b">ON</span> e.dept_id=d.id</div>
        <div><span className="vm-b">JOIN</span> salaries s <span className="vm-b">ON</span> e.emp_id=s.emp_id</div>
        <div><span className="vm-b">WHERE</span> e.status=<span className="vm-y">'active'</span></div>
        <div><span className="vm-b">ORDER BY</span> <span className="vm-g">net_salary</span> <span className="vm-b">DESC</span>;</div>
      </div>
    ),
  },
]

export default function Projects() {
  useIntersectionObserver()
  useEffect(() => { document.title = 'Projects — Sujal Bhargava' }, [])

  return (
    <>
      <div className="page">
        <div className="section">
          <div className="section-header fade-up">
            <span className="section-tag">My Work</span>
            <h1 className="section-title">Featured Projects</h1>
            <p className="section-desc">
              Real-world applications I have built, applying programming concepts to solve practical problems.
            </p>
          </div>

          <div className="projects-grid">
            {PROJECTS.map(({ id, cls, num, typeLabel, typeIcon, typeName, title, desc, features, tech, visualLabel, visual }) => (
              <div className={`project-card ${cls} fade-up`} id={`project-${id}`} key={id}>
                <div className="project-inner">
                  <div className="project-meta">
                    <span className="project-number">{num}</span>
                    <span className={`project-type ${typeLabel}`}>
                      <i className={typeIcon} /> &nbsp;{typeName}
                    </span>
                  </div>
                  <h2 className="project-title">{title}</h2>
                  <p className="project-desc">{desc}</p>
                  <div className="feature-list">
                    {features.map((f) => (
                      <div className="feature-item" key={f}>
                        <div className="feature-dot"><i className="fa-solid fa-check" /></div>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="tech-section">
                    <div className="tech-label">Tech Stack</div>
                    <div className="tech-tags">
                      {tech.map((t) => <span className="tech-tag" key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
                <div className="project-visual">
                  <div className="visual-label"><i className="fa-solid fa-terminal" /> &nbsp;{visualLabel}</div>
                  {visual}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="projects-cta fade-up">
            <div className="cta-title">🚀 More Projects Coming Soon</div>
            <p className="cta-desc">
              I am continuously working on new projects. Check back often or connect with me to see what I am building next.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://github.com/sujalbhargava-dev" target="_blank" rel="noopener noreferrer"
                className="btn btn-primary" id="github-projects-btn">
                <i className="fa-brands fa-github" /> View GitHub
              </a>
              <Link to="/contact" className="btn btn-outline" id="collaborate-btn">
                <i className="fa-solid fa-handshake" /> Let's Collaborate
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .projects-grid { display: grid; gap: 28px; }
        .project-card {
          background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
          overflow: hidden; box-shadow: var(--card-shadow); transition: var(--transition);
          display: grid; grid-template-columns: 1fr;
        }
        .project-card:hover { box-shadow: var(--card-shadow-md); transform: translateY(-4px); }
        .project-card::before { content: ''; display: block; height: 4px; }
        .project-card.p1::before { background: linear-gradient(90deg, #4f46e5, #7c3aed); }
        .project-card.p2::before { background: linear-gradient(90deg, #0d9488, #10b981); }
        .project-inner { padding: 32px 36px; }
        .project-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
        .project-number { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }
        .project-type { font-size: 0.72rem; font-weight: 600; padding: 4px 10px; border-radius: 6px; }
        .type-desktop  { background: var(--accent-light); color: var(--accent); }
        .type-database { background: #f0fdf4; color: #16a34a; }
        .project-title { font-size: 1.4rem; font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); margin-bottom: 14px; }
        .project-desc { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.75; margin-bottom: 24px; }
        .feature-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; }
        .feature-item { display: flex; align-items: flex-start; gap: 10px; font-size: 0.875rem; color: var(--text-secondary); }
        .feature-dot { width: 20px; height: 20px; background: var(--accent-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .feature-dot i { font-size: 0.6rem; color: var(--accent); }
        .p2 .feature-dot { background: #f0fdf4; }
        .p2 .feature-dot i { color: #16a34a; }
        .tech-section { padding-top: 24px; border-top: 1px solid var(--border); }
        .tech-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 12px; }
        .tech-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .tech-tag { font-size: 0.78rem; font-weight: 600; padding: 5px 12px; border-radius: 8px; border: 1px solid; transition: var(--transition); }
        .p1 .tech-tag { background: var(--accent-light); color: var(--accent); border-color: var(--accent-border); }
        .p1 .tech-tag:hover { background: var(--accent); color: #fff; }
        .p2 .tech-tag { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
        .p2 .tech-tag:hover { background: #16a34a; color: #fff; }
        .project-visual { border-top: 1px solid var(--border); padding: 28px 36px; background: var(--bg-secondary); }
        .visual-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 16px; }
        .visual-mockup {
          background: #0f172a; border-radius: 12px; padding: 20px 24px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
          line-height: 1.9; color: #94a3b8; box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .vm-g { color: #34d399; } .vm-y { color: #fbbf24; } .vm-b { color: #60a5fa; }
        .vm-p { color: #a78bfa; } .vm-r { color: #f87171; }
        .projects-cta { margin-top: 48px; padding: 40px; background: var(--accent-light); border: 1px solid var(--accent-border); border-radius: var(--radius); text-align: center; }
        .cta-title { font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; }
        .cta-desc { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 20px; }
        @media (max-width: 640px) {
          .project-inner, .project-visual { padding: 24px 20px; }
        }
      `}</style>
    </>
  )
}
