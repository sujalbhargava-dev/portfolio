import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const INTERESTS = [
  { icon: '🐍', text: 'Python Development' },
  { icon: '🗄️', text: 'Database Systems' },
  { icon: '🧩', text: 'DSA & Algorithms' },
  { icon: '🖥️', text: 'Desktop Apps' },
  { icon: '🌐', text: 'Web Technologies' },
  { icon: '📚', text: 'Continuous Learning' },
]

const OFFERS = [
  { icon: 'fa-solid fa-terminal',    title: 'Desktop Applications', desc: 'Building functional GUI applications using Python and Tkinter for real-world use cases.' },
  { icon: 'fa-solid fa-database',    title: 'Database Design',      desc: 'Designing and managing relational databases using MySQL with proper normalization and DBMS concepts.' },
  { icon: 'fa-brands fa-python',     title: 'Python Development',   desc: 'Writing clean, object-oriented Python code applying OOP principles for scalable solutions.' },
  { icon: 'fa-solid fa-code-branch', title: 'Problem Solving',      desc: 'Applying Data Structures and Algorithms concepts to solve complex programming challenges.' },
]

export default function About() {
  useIntersectionObserver()

  useEffect(() => { document.title = 'About — Sujal Bhargava' }, [])

  return (
    <>
      <div className="page">
        <div className="section">
          <div className="section-header fade-up">
            <span className="section-tag">About</span>
            <h1 className="section-title">Who I Am</h1>
            <p className="section-desc">A passionate developer on a journey to build software that matters.</p>
          </div>

          <div className="about-grid">
            {/* Avatar column */}
            <div className="avatar-col fade-up">
              <div className="avatar-wrap">
                <div className="avatar-circle">SB</div>
                <div className="avatar-name">Sujal Bhargava</div>
                <div className="avatar-role">BCA Student &amp; Developer</div>
                <hr className="avatar-divider" />
                <div className="avatar-facts">
                  {[
                    { icon: 'fa-solid fa-graduation-cap', label: 'University', value: 'ITM University, Gwalior' },
                    { icon: 'fa-solid fa-book-open',      label: 'Degree',     value: 'BCA (Bachelor of Computer Applications)' },
                    { icon: 'fa-solid fa-location-dot',   label: 'Location',   value: 'Gwalior, India' },
                    { icon: 'fa-solid fa-envelope',       label: 'Email',      value: 'sujalbhargava2341@gmail.com' },
                  ].map(({ icon, label, value }) => (
                    <div className="fact-row" key={label}>
                      <div className="fact-icon"><i className={icon} /></div>
                      <div>
                        <div className="fact-label">{label}</div>
                        <div className="fact-value">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="about-socials">
                  <a href="mailto:sujalbhargava2341@gmail.com" className="social-icon" id="about-email">
                    <i className="fa-solid fa-envelope" />
                  </a>
                  <a href="https://github.com/sujalbhargava-dev" target="_blank" rel="noopener noreferrer"
                    className="social-icon" id="about-github">
                    <i className="fa-brands fa-github" />
                  </a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
                    className="social-icon" id="about-linkedin">
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>

            {/* Content column */}
            <div className="about-body">
              <div className="fade-up">
                <div className="about-section-title">My Story</div>
                <p className="about-text">
                  I am a Bachelor of Computer Applications (BCA) student at ITM University, Gwalior.
                  From my early days of learning to code, I developed a genuine passion for software
                  development and problem-solving. What started as curiosity quickly became a
                  dedicated pursuit of building things that work and make sense.
                </p>
                <p className="about-text">
                  I enjoy building practical applications using <strong>Python</strong>, <strong>C++</strong>,
                  and <strong>MySQL</strong>, and I am continuously learning new technologies and
                  improving my programming skills. Every project I take on is an opportunity to grow
                  and create something meaningful.
                </p>
              </div>

              <div className="fade-up">
                <div className="about-section-title">What I Do</div>
                <div className="offer-grid">
                  {OFFERS.map(({ icon, title, desc }) => (
                    <div className="offer-card" key={title}>
                      <div className="offer-icon-wrap"><i className={icon} /></div>
                      <div className="offer-title">{title}</div>
                      <div className="offer-desc">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fade-up">
                <div className="about-section-title">Interests</div>
                <div className="interest-grid">
                  {INTERESTS.map(({ icon, text }) => (
                    <div className="interest-card" key={text}>
                      <span className="interest-icon">{icon}</span>
                      <span className="interest-text">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fade-up">
                <Link to="/contact" className="btn btn-primary" id="about-cta">
                  <i className="fa-solid fa-paper-plane" /> Let's Connect
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 64px; align-items: start; }
        .avatar-col { position: sticky; top: calc(var(--nav-height) + 28px); }
        .avatar-wrap {
          width: 100%; max-width: 320px;
          background: linear-gradient(145deg, #f0f0ff 0%, #e8eeff 100%);
          border: 1px solid var(--accent-border); border-radius: 24px;
          padding: 40px 28px; text-align: center; box-shadow: var(--card-shadow);
        }
        .avatar-circle {
          width: 120px; height: 120px; margin: 0 auto 20px;
          background-image: linear-gradient(135deg, #4f46e5, #7c3aed);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 2.8rem; font-weight: 800; color: white; letter-spacing: -0.04em;
          box-shadow: 0 8px 32px rgba(79,70,229,0.3);
        }
        .avatar-name { font-size: 1.2rem; font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary); margin-bottom: 4px; }
        .avatar-role { font-size: 0.82rem; color: var(--accent); font-weight: 600; margin-bottom: 20px; }
        .avatar-divider { border: none; border-top: 1px solid var(--accent-border); margin: 20px 0; }
        .avatar-facts { display: flex; flex-direction: column; gap: 12px; text-align: left; }
        .fact-row { display: flex; align-items: center; gap: 12px; }
        .fact-icon {
          width: 32px; height: 32px; background: white; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: var(--accent); font-size: 0.85rem; flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .fact-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
        .fact-value { font-size: 0.85rem; color: var(--text-primary); font-weight: 600; }
        .about-socials { display: flex; justify-content: center; gap: 10px; margin-top: 20px; }
        .social-icon {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; background: white;
          border: 1px solid var(--accent-border); border-radius: 9px;
          color: var(--text-secondary); font-size: 1rem; transition: var(--transition);
        }
        .social-icon:hover { background: var(--accent); color: white; border-color: var(--accent); transform: translateY(-2px); }
        .about-body { display: flex; flex-direction: column; gap: 40px; }
        .about-section-title {
          font-size: 1.15rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: 14px; display: flex; align-items: center; gap: 10px;
        }
        .about-section-title::before {
          content: ''; width: 4px; height: 22px; background: var(--accent); border-radius: 4px;
        }
        .about-text { font-size: 1rem; color: var(--text-secondary); line-height: 1.85; }
        .about-text + .about-text { margin-top: 14px; }
        .interest-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; }
        .interest-card {
          background: var(--bg-secondary); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 16px 18px;
          display: flex; align-items: center; gap: 12px; transition: var(--transition);
        }
        .interest-card:hover { background: var(--accent-light); border-color: var(--accent-border); transform: translateY(-2px); }
        .interest-icon { font-size: 1.4rem; }
        .interest-text { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
        .offer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .offer-card {
          background: var(--bg); border: 1px solid var(--border);
          border-radius: var(--radius-sm); padding: 20px 22px;
          box-shadow: var(--card-shadow); transition: var(--transition);
        }
        .offer-card:hover { border-color: var(--accent-border); box-shadow: var(--card-shadow-md); transform: translateY(-2px); }
        .offer-icon-wrap {
          width: 40px; height: 40px; background: var(--accent-light); border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: var(--accent); font-size: 1rem; margin-bottom: 12px;
        }
        .offer-title { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; }
        .offer-desc { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.6; }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .avatar-col { position: static; }
          .avatar-wrap { max-width: 100%; }
          .offer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
