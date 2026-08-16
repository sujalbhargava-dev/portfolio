import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import '../styles/About.css'

export default function About() {
  const animateRef = useScrollAnimation()

  return (
    <div className="page">
      <div className="section">
        <div className="section-header fade-up" ref={animateRef}>
          <span className="section-tag">About</span>
          <h1 className="section-title">Who I Am</h1>
          <p className="section-desc">A passionate developer on a journey to build software that matters.</p>
        </div>

        <div className="about-grid">
          <div className="avatar-col fade-up" ref={animateRef}>
            <div className="avatar-wrap">
              <div className="avatar-circle">SB</div>
              <div className="avatar-name">Sujal Bhargava</div>
              <div className="avatar-role">BCA Student &amp; Developer</div>
              <hr className="avatar-divider" />
              <div className="avatar-facts">
                <div className="fact-row">
                  <div className="fact-icon"><i className="fa-solid fa-graduation-cap"></i></div>
                  <div><div className="fact-label">University</div><div className="fact-value">ITM University, Gwalior</div></div>
                </div>
                <div className="fact-row">
                  <div className="fact-icon"><i className="fa-solid fa-book-open"></i></div>
                  <div><div className="fact-label">Degree</div><div className="fact-value">BCA (Bachelor of Computer Applications)</div></div>
                </div>
                <div className="fact-row">
                  <div className="fact-icon"><i className="fa-solid fa-location-dot"></i></div>
                  <div><div className="fact-label">Location</div><div className="fact-value">Gwalior, India</div></div>
                </div>
                <div className="fact-row">
                  <div className="fact-icon"><i className="fa-solid fa-envelope"></i></div>
                  <div><div className="fact-label">Email</div><div className="fact-value">sujalbhargava2341@gmail.com</div></div>
                </div>
              </div>
              <div className="about-socials">
                <a href="mailto:sujalbhargava2341@gmail.com" className="social-icon" id="about-email"><i className="fa-solid fa-envelope"></i></a>
                <a href="https://github.com/sujalbhargava-dev" target="_blank" rel="noopener noreferrer" className="social-icon" id="about-github"><i className="fa-brands fa-github"></i></a>
                <a href="https://linkedin.com/in/sujal-bhargava" target="_blank" rel="noopener noreferrer" className="social-icon" id="about-linkedin"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>

          <div className="about-body">
            <div className="fade-up" ref={animateRef}>
              <div className="about-section-title">My Story</div>
              <p className="about-text">I am a Bachelor of Computer Applications (BCA) student at ITM University, Gwalior. From my early days of learning to code, I developed a genuine passion for software development and problem-solving. What started as curiosity quickly became a dedicated pursuit of building things that work and make sense.</p>
              <p className="about-text">I enjoy building practical applications using <strong>Python</strong>, <strong>C++</strong>, and <strong>MySQL</strong>, and I am continuously learning new technologies and improving my programming skills. Every project I take on is an opportunity to grow and create something meaningful.</p>
            </div>

            <div className="fade-up" ref={animateRef}>
              <div className="about-section-title">What I Do</div>
              <div className="offer-grid">
                <div className="offer-card"><div className="offer-icon-wrap"><i className="fa-solid fa-terminal"></i></div><div className="offer-title">Desktop Applications</div><div className="offer-desc">Building functional GUI applications using Python and Tkinter for real-world use cases.</div></div>
                <div className="offer-card"><div className="offer-icon-wrap"><i className="fa-solid fa-database"></i></div><div className="offer-title">Database Design</div><div className="offer-desc">Designing and managing relational databases using MySQL with proper normalization and DBMS concepts.</div></div>
                <div className="offer-card"><div className="offer-icon-wrap"><i className="fa-brands fa-python"></i></div><div className="offer-title">Python Development</div><div className="offer-desc">Writing clean, object-oriented Python code applying OOP principles for scalable solutions.</div></div>
                <div className="offer-card"><div className="offer-icon-wrap"><i className="fa-solid fa-code-branch"></i></div><div className="offer-title">Problem Solving</div><div className="offer-desc">Applying Data Structures and Algorithms concepts to solve complex programming challenges.</div></div>
              </div>
            </div>

            <div className="fade-up" ref={animateRef}>
              <div className="about-section-title">Interests</div>
              <div className="interest-grid">
                <div className="interest-card"><span className="interest-icon">🐍</span><span className="interest-text">Python Development</span></div>
                <div className="interest-card"><span className="interest-icon">🗄️</span><span className="interest-text">Database Systems</span></div>
                <div className="interest-card"><span className="interest-icon">🧩</span><span className="interest-text">DSA &amp; Algorithms</span></div>
                <div className="interest-card"><span className="interest-icon">🖥️</span><span className="interest-text">Desktop Apps</span></div>
                <div className="interest-card"><span className="interest-icon">🌐</span><span className="interest-text">Web Technologies</span></div>
                <div className="interest-card"><span className="interest-icon">📚</span><span className="interest-text">Continuous Learning</span></div>
              </div>
            </div>

            <div className="fade-up" ref={animateRef}>
              <Link to="/contact" className="btn btn-primary" id="about-cta">
                <i className="fa-solid fa-paper-plane"></i> Let's Connect
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
