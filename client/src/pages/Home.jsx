import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

/* ── Typewriter ── */
const PHRASES = [
  'BCA Student @ ITM University',
  'Python Developer',
  'C++ Programmer',
  'Building Practical Solutions',
  'Problem Solver & Learner',
]

function useTypewriter(elementRef) {
  useEffect(() => {
    let pi = 0, ci = 0, del = false
    let timer

    function type() {
      const cur = PHRASES[pi]
      if (!del) {
        ci++
        if (elementRef.current) elementRef.current.textContent = cur.slice(0, ci)
        if (ci === cur.length) { del = true; timer = setTimeout(type, 2200); return }
      } else {
        ci--
        if (elementRef.current) elementRef.current.textContent = cur.slice(0, ci)
        if (ci === 0) { del = false; pi = (pi + 1) % PHRASES.length }
      }
      timer = setTimeout(type, del ? 38 : 75)
    }

    const start = setTimeout(type, 800)
    return () => { clearTimeout(start); clearTimeout(timer) }
  }, [elementRef])
}

/* ── Quick nav data ── */
const QUICK_NAV = [
  { to: '/about',     icon: 'fa-solid fa-user',           label: 'Learn more',         title: 'About Me' },
  { to: '/skills',    icon: 'fa-solid fa-code',           label: 'Tech stack',          title: 'Skills' },
  { to: '/projects',  icon: 'fa-solid fa-laptop-code',    label: 'What I built',        title: 'Projects' },
  { to: '/education', icon: 'fa-solid fa-graduation-cap', label: 'Academic background', title: 'Education' },
  { to: '/contact',   icon: 'fa-solid fa-envelope',       label: "Let's connect",       title: 'Contact' },
]

export default function Home() {
  const twRef = useRef(null)
  useTypewriter(twRef)
  useIntersectionObserver()

  useEffect(() => {
    // Trigger quick-nav stagger after a short delay
    const t = setTimeout(() => {
      const el = document.getElementById('quick-nav')
      if (el) el.classList.add('visible')
    }, 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <title>Sujal Bhargava — Software Developer</title>

      <div className="page">
        {/* ── HERO ── */}
        <div className="hero">
          {/* Left */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="status-dot" />
              Open to Internships &amp; Opportunities
            </div>

            <h1 className="hero-name">
              Hi, I am<br />
              <span className="gradient-text">Sujal Bhargava</span>
            </h1>

            <p className="hero-tagline" id="tw" ref={twRef} />

            <p className="hero-desc">
              A BCA student at ITM University, Gwalior, passionate about building practical
              software using Python, C++, and MySQL. I love turning ideas into efficient,
              real-world applications.
            </p>

            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary" id="view-projects-btn">
                <i className="fa-solid fa-briefcase" /> View Projects
              </Link>
              <Link to="/contact" className="btn btn-outline" id="contact-btn">
                <i className="fa-solid fa-paper-plane" /> Get in Touch
              </Link>
            </div>

            <div className="hero-socials">
              <a href="mailto:sujalbhargava2341@gmail.com" className="social-icon" id="email-link" title="Email">
                <i className="fa-solid fa-envelope" />
              </a>
              <a href="https://github.com/sujalbhargava-dev" target="_blank" rel="noopener noreferrer"
                className="social-icon" id="github-link" title="GitHub">
                <i className="fa-brands fa-github" />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
                className="social-icon" id="linkedin-link" title="LinkedIn">
                <i className="fa-brands fa-linkedin-in" />
              </a>
            </div>
          </div>

          {/* Right: Code Card */}
          <div className="hero-visual">
            <div className="code-card">
              <div className="cc-header">
                <div className="cc-dot r" /><div className="cc-dot y" /><div className="cc-dot g" />
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
                <div className="pill">
                  <span>🎓</span>
                  <span className="pill-text"><strong>ITM University</strong>, Gwalior</span>
                </div>
                <div className="pill">
                  <span>💻</span>
                  <span className="pill-text"><strong>2+</strong> Projects Built</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick nav cards */}
        <div className="quick-nav stagger" id="quick-nav">
          {QUICK_NAV.map(({ to, icon, label, title }) => (
            <Link to={to} className="qnav-card" key={to} id={`${to.replace('/', '')}-quick`}>
              <div className="qnav-icon"><i className={icon} /></div>
              <div>
                <div className="qnav-label">{label}</div>
                <div className="qnav-title">{title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        /* ── HERO ── */
        .hero {
          min-height: calc(100vh - var(--nav-height));
          display: flex;
          align-items: center;
          padding: 60px 28px;
          max-width: 1140px;
          margin: 0 auto;
          gap: 72px;
        }
        .hero-content { flex: 1; max-width: 560px; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--accent-light); border: 1px solid var(--accent-border);
          color: var(--accent); font-size: 0.78rem; font-weight: 600;
          padding: 6px 14px; border-radius: 100px; margin-bottom: 28px;
          animation: hFadeDown 0.6s var(--ease) both;
        }
        .status-dot {
          width: 8px; height: 8px; background: #22c55e; border-radius: 50%;
          animation: statusPulse 2.2s infinite;
        }
        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          60%       { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
        }
        .hero-name {
          font-size: clamp(2.4rem, 6vw, 4rem); font-weight: 900;
          letter-spacing: -0.045em; line-height: 1.1; margin-bottom: 16px;
          animation: hFadeUp 0.7s var(--ease) 0.1s both;
        }
        .gradient-text {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #9333ea 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .hero-tagline {
          font-size: 1.05rem; color: var(--text-secondary); font-weight: 500;
          margin-bottom: 24px; min-height: 1.7em;
          animation: hFadeUp 0.7s var(--ease) 0.2s both;
        }
        #tw::after { content: '|'; animation: blink 1s step-end infinite; color: var(--accent); margin-left: 1px; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .hero-desc {
          font-size: 1rem; color: var(--text-secondary); line-height: 1.8;
          margin-bottom: 36px; animation: hFadeUp 0.7s var(--ease) 0.3s both;
        }
        .hero-actions {
          display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 44px;
          animation: hFadeUp 0.7s var(--ease) 0.4s both;
        }
        .hero-socials { display: flex; gap: 12px; animation: hFadeUp 0.7s var(--ease) 0.5s both; }
        .social-icon {
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; background: var(--bg-secondary);
          border: 1px solid var(--border); border-radius: 10px;
          color: var(--text-secondary); font-size: 1.1rem; transition: var(--transition);
        }
        .social-icon:hover {
          background: var(--accent); color: #fff; border-color: var(--accent);
          transform: translateY(-3px); box-shadow: 0 8px 20px rgba(79,70,229,0.3);
        }
        /* Code Card */
        .hero-visual {
          flex: 1; display: flex; justify-content: center; align-items: center;
          animation: hFadeRight 0.8s var(--ease) 0.3s both;
        }
        .code-card {
          background: #0f172a; border-radius: 20px; padding: 28px;
          width: 100%; max-width: 440px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(79,70,229,0.12);
          border: 1px solid rgba(255,255,255,0.08); position: relative; overflow: hidden;
        }
        .code-card::before {
          content: ''; position: absolute; top: -60px; right: -60px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 65%);
          border-radius: 50%; pointer-events: none;
        }
        .code-card::after {
          content: ''; position: absolute; bottom: -40px; left: 20px;
          width: 140px; height: 140px;
          background: radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 65%);
          border-radius: 50%; pointer-events: none;
        }
        .cc-header { display: flex; align-items: center; gap: 7px; margin-bottom: 22px; }
        .cc-dot { width: 12px; height: 12px; border-radius: 50%; }
        .cc-dot.r { background: #ff5f57; }
        .cc-dot.y { background: #febc2e; }
        .cc-dot.g { background: #28c840; }
        .cc-filename { margin-left: auto; font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: #475569; }
        .cl { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; line-height: 1.95; color: #94a3b8; }
        .cl .kw { color: #818cf8; }
        .cl .fn { color: #34d399; }
        .cl .str { color: #fbbf24; }
        .cl .cm { color: #4b5563; font-style: italic; }
        .cl .cls { color: #60a5fa; }
        .cl .num { color: #f472b6; }
        .hero-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 24px; position: relative; z-index: 1; }
        .pill {
          display: flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 8px 14px;
        }
        .pill-text { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: #94a3b8; }
        .pill-text strong { color: #e2e8f0; font-weight: 600; }
        /* Quick nav */
        .quick-nav {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px; padding: 0 28px 64px; max-width: 1140px; margin: 0 auto;
        }
        .qnav-card {
          display: flex; align-items: center; gap: 14px;
          background: var(--bg); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 18px 20px;
          text-decoration: none; color: var(--text-primary);
          box-shadow: var(--card-shadow); transition: var(--transition);
        }
        .qnav-card:hover {
          border-color: var(--accent-border); background: var(--accent-light);
          transform: translateY(-2px); box-shadow: var(--card-shadow-md);
        }
        .qnav-icon {
          width: 40px; height: 40px; background: var(--accent-light); border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: var(--accent); font-size: 1rem; flex-shrink: 0; transition: var(--transition);
        }
        .qnav-card:hover .qnav-icon { background: var(--accent); color: #fff; }
        .qnav-label { font-size: 0.82rem; color: var(--text-muted); font-weight: 500; }
        .qnav-title { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); }
        @keyframes hFadeDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes hFadeUp   { from { opacity:0; transform:translateY(24px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes hFadeRight{ from { opacity:0; transform:translateX(32px);  } to { opacity:1; transform:translateX(0); } }
        @media (max-width: 900px) {
          .hero { flex-direction: column; padding: 48px 24px; gap: 48px; text-align: center; }
          .hero-actions, .hero-socials { justify-content: center; }
          .hero-visual { width: 100%; }
          .hero-desc { margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 600px) {
          .hero-name { font-size: 2.2rem; }
          .quick-nav { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </>
  )
}
