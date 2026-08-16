import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import '../styles/Projects.css'

export default function Projects() {
  const animateRef = useScrollAnimation()

  return (
    <div className="page">
      <div className="section">
        <div className="section-header fade-up" ref={animateRef}>
          <span className="section-tag">My Work</span>
          <h1 className="section-title">Featured Projects</h1>
          <p className="section-desc">Real-world applications I have built, applying programming concepts to solve practical problems.</p>
        </div>

        <div className="projects-grid">
          {/* Project 1 */}
          <div className="project-card p1 fade-up" ref={animateRef} id="project-shopping-cart">
            <div className="project-inner">
              <div className="project-meta">
                <span className="project-number">Project 01</span>
                <span className="project-type type-desktop"><i className="fa-solid fa-desktop"></i> &nbsp;Desktop App</span>
              </div>
              <h2 className="project-title">Shopping Cart Management System</h2>
              <p className="project-desc">A fully-functional desktop shopping cart application built with Python and Tkinter. Users can manage a product catalog, apply discounts, calculate shipping charges, and generate detailed billing summaries — all through an intuitive GUI interface.</p>
              <div className="feature-list">
                {['Add, update, and delete products with full CRUD operations','Automatic discount calculation based on cart total','Dynamic shipping charge computation','Billing summary generation with itemized receipts','File Handling / MySQL for persistent data storage','OOP-based modular design for scalability'].map((f, i) => (
                  <div className="feature-item" key={i}><div className="feature-dot"><i className="fa-solid fa-check"></i></div><span>{f}</span></div>
                ))}
              </div>
              <div className="tech-section">
                <div className="tech-label">Tech Stack</div>
                <div className="tech-tags">
                  {['Python','Tkinter','MySQL','File Handling','OOP'].map(t => <span className="tech-tag" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
            <div className="project-visual">
              <div className="visual-label"><i className="fa-solid fa-terminal"></i> &nbsp;Terminal Preview</div>
              <div className="visual-mockup">
                <div><span className="vm-g">===== Shopping Cart System =====</span></div>
                <div><span className="vm-b">Product</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="vm-b">Qty</span>&nbsp;&nbsp;<span className="vm-b">Price</span>&nbsp;&nbsp;<span className="vm-b">Total</span></div>
                <div>-------------------------------</div>
                <div>Laptop &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;45000&nbsp;&nbsp;45000</div>
                <div>Mouse&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;500&nbsp;&nbsp;&nbsp;1000</div>
                <div>Keyboard&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;1200&nbsp;&nbsp;&nbsp;1200</div>
                <div>-------------------------------</div>
                <div>Subtotal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="vm-y">47200</span></div>
                <div>Discount (10%)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="vm-r">-4720</span></div>
                <div>Shipping&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="vm-y">99</span></div>
                <div>==============================</div>
                <div><span className="vm-g">TOTAL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;42579</span></div>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card p2 fade-up" ref={animateRef} id="project-payroll">
            <div className="project-inner">
              <div className="project-meta">
                <span className="project-number">Project 02</span>
                <span className="project-type type-database"><i className="fa-solid fa-database"></i> &nbsp;Database System</span>
              </div>
              <h2 className="project-title">Payroll Management System</h2>
              <p className="project-desc">A comprehensive database-driven payroll system designed for organizations to manage employee records, track attendance, automate salary calculations, and handle leave management — all modeled with proper DBMS principles and ER diagrams.</p>
              <div className="feature-list">
                {['Complete employee record management system','Attendance tracking and leave management module','Automated salary calculation with deductions and allowances','Department-based organizational structure','Properly designed ER Diagram with normalized tables','Complex SQL queries for reporting and analytics'].map((f, i) => (
                  <div className="feature-item" key={i}><div className="feature-dot"><i className="fa-solid fa-check"></i></div><span>{f}</span></div>
                ))}
              </div>
              <div className="tech-section">
                <div className="tech-label">Tech Stack</div>
                <div className="tech-tags">
                  {['MySQL','SQL','ER Diagram','DBMS Concepts','Normalization'].map(t => <span className="tech-tag" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
            <div className="project-visual">
              <div className="visual-label"><i className="fa-solid fa-terminal"></i> &nbsp;SQL Preview</div>
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
            </div>
          </div>
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
