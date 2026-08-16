import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Typewriter from '../components/Typewriter'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useFeatureFlags } from '../hooks/useFeatureFlags'
import '../styles/Home.css'

const phrases = [
  'BCA Student @ ITM University',
  'Python Developer',
  'C++ Programmer',
  'Building Practical Solutions',
  'Problem Solver & Learner',
]

export default function Home() {
  const animateRef = useScrollAnimation()
  const { isFeatureEnabled } = useFeatureFlags()

  useEffect(() => {
    const el = document.getElementById('quick-nav')
    if (el) setTimeout(() => el.classList.add('visible'), 600)
  }, [])

  return (
    <>
      {isFeatureEnabled('new-hero') && (
        <div style={{ background: 'var(--accent)', color: 'white', textAlign: 'center', padding: 10, fontWeight: 'bold' }}>
          🚀 New Feature: This banner is controlled by the Feature Flag Framework!
        </div>
      )}

      <div className="page">
        {/* HERO */}
        <div className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="status-dot"></span>
              Open to Internships &amp; Opportunities
            </div>
            <div className="name-wrapper">
              <img
                src="/profile.jpg"
                alt="Sujal Bhargava"
                className="hero-avatar"
                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Sujal+Bhargava&background=4f46e5&color=fff&size=150' }}
              />
              <h1 className="hero-name" style={{ marginBottom: 0, animation: 'none' }}>
                Hi, I am<br />
                <span className="text-gradient">Sujal Bhargava</span>
              </h1>
            </div>
            <p className="hero-tagline">
              <Typewriter phrases={phrases} />
            </p>
            <p className="hero-desc">
              A BCA student at ITM University, Gwalior, passionate about building practical
              software using Python, C++, and MySQL. I love turning ideas into efficient,
              real-world applications.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary" id="view-projects-btn">
                <i className="fa-solid fa-briefcase"></i> View Projects
              </Link>
              <Link to="/contact" className="btn btn-outline" id="contact-btn">
                <i className="fa-solid fa-paper-plane"></i> Get in Touch
              </Link>
            </div>
            <div className="hero-socials">
              <a href="mailto:sujalbhargava2341@gmail.com" className="social-icon" id="email-link" title="Email">
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a href="https://github.com/sujalbhargava-dev" target="_blank" rel="noopener noreferrer" className="social-icon" id="github-link" title="GitHub">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/sujal-bhargava" target="_blank" rel="noopener noreferrer" className="social-icon" id="linkedin-link" title="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Code Card */}
          <div className="hero-visual">
            <div className="code-card">
              <div className="cc-header">
                <div className="cc-dot r"></div>
                <div className="cc-dot y"></div>
                <div className="cc-dot g"></div>
                <span className="cc-filename">developer.py</span>
              </div>
              <div className="cl"><span className="cm"># About me in code ✨</span></div>
              <div className="cl">&nbsp;</div>
              <div className="cl"><span className="kw">class</span> <span className="cls">Developer</span>:</div>
              <div className="cl">&nbsp;&nbsp;<span className="kw">def</span> <span className="fn">__init__</span>(self):</div>
              <div className="cl">&nbsp;&nbsp;&nbsp;&nbsp;self.name&nbsp;&nbsp;&nbsp;&nbsp; = <span className="str">"Sujal Bhargava"</span></div>
              <div className="cl">&nbsp;&nbsp;&nbsp;&nbsp;self.role&nbsp;&nbsp;&nbsp;&nbsp; = <span className="str">"BCA Student"</span></div>
              <div className="cl">&nbsp;&nbsp;&nbsp;&nbsp;self.languages = [</div>
              <div className="cl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"Python"</span>, <span className="str">"C++"</span>, <span className="str">"C"</span></div>
              <div className="cl">&nbsp;&nbsp;&nbsp;&nbsp;]</div>
              <div className="cl">&nbsp;&nbsp;&nbsp;&nbsp;self.loves&nbsp;&nbsp;&nbsp; = <span className="str">"Problem Solving"</span></div>
              <div className="cl">&nbsp;</div>
              <div className="cl">&nbsp;&nbsp;<span className="kw">def</span> <span className="fn">get_status</span>(self):</div>
              <div className="cl">&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">return</span> {'{'}</div>
              <div className="cl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"focus"</span>&nbsp;&nbsp;: <span className="str">"DSA &amp; DBMS"</span>,</div>
              <div className="cl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"building"</span>: <span className="str">"Practical Apps"</span>,</div>
              <div className="cl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"open_to"</span>&nbsp;: <span className="str">"Internships"</span></div>
              <div className="cl">&nbsp;&nbsp;&nbsp;&nbsp;{'}'}</div>
              <div className="hero-pills">
                <div className="pill"><span>🎓</span><span className="pill-text"><strong>ITM University</strong>, Gwalior</span></div>
                <div className="pill"><span>💻</span><span className="pill-text"><strong>2+</strong> Projects Built</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick nav cards */}
        <div className="quick-nav stagger" id="quick-nav">
          <Link to="/about" className="qnav-card" id="about-quick">
            <div className="qnav-icon"><i className="fa-solid fa-user"></i></div>
            <div>
              <div className="qnav-label">Learn more</div>
              <div className="qnav-title">About Me</div>
            </div>
          </Link>
          <Link to="/skills" className="qnav-card" id="skills-quick">
            <div className="qnav-icon"><i className="fa-solid fa-code"></i></div>
            <div>
              <div className="qnav-label">Tech stack</div>
              <div className="qnav-title">Skills</div>
            </div>
          </Link>
          <Link to="/projects" className="qnav-card" id="projects-quick">
            <div className="qnav-icon"><i className="fa-solid fa-laptop-code"></i></div>
            <div>
              <div className="qnav-label">What I built</div>
              <div className="qnav-title">Projects</div>
            </div>
          </Link>
          <Link to="/education" className="qnav-card" id="education-quick">
            <div className="qnav-icon"><i className="fa-solid fa-graduation-cap"></i></div>
            <div>
              <div className="qnav-label">Academic background</div>
              <div className="qnav-title">Education</div>
            </div>
          </Link>
          <Link to="/contact" className="qnav-card" id="contact-quick">
            <div className="qnav-icon"><i className="fa-solid fa-envelope"></i></div>
            <div>
              <div className="qnav-label">Let's connect</div>
              <div className="qnav-title">Contact</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
