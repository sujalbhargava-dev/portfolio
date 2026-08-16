import { useScrollAnimation } from '../hooks/useScrollAnimation'
import '../styles/Education.css'

export default function Education() {
  const animateRef = useScrollAnimation()

  return (
    <div className="page">
      <div className="section">
        <div className="section-header fade-up" ref={animateRef}>
          <span className="section-tag">Education</span>
          <h1 className="section-title">Academic Background</h1>
          <p className="section-desc">My educational journey — building a strong foundation in computer science and software development.</p>
        </div>

        <div className="edu-layout">
          <div className="fade-up" ref={animateRef}>
            <div className="timeline">
              <div className="timeline-item">
                <div className="tl-dot-wrap"><div className="tl-dot current"><i className="fa-solid fa-graduation-cap"></i></div></div>
                <div className="tl-content">
                  <div className="tl-year">2023 — Present <span className="current-badge">Currently Pursuing</span></div>
                  <div className="tl-degree">Bachelor of Computer Applications (BCA)</div>
                  <div className="tl-institution">ITM University, Gwalior</div>
                  <p className="tl-desc">Pursuing a 3-year undergraduate degree in Computer Applications, focusing on programming fundamentals, database management, object-oriented development, web technologies, and applied software projects.</p>
                  <div className="tl-subjects">
                    {['Programming in Python','C / C++','DBMS','DSA','Web Development','OOP','Computer Networks','Operating Systems'].map(s => <span className="tl-subject" key={s}>{s}</span>)}
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="tl-dot-wrap"><div className="tl-dot past"><i className="fa-solid fa-school"></i></div></div>
                <div className="tl-content">
                  <div className="tl-year">2022 — 2023</div>
                  <div className="tl-degree">Higher Secondary (12th Standard)</div>
                  <div className="tl-institution">Science Stream — Gwalior, MP</div>
                  <p className="tl-desc">Completed 12th standard with a focus on science and mathematics, laying the analytical foundation for computer science studies.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="tl-dot-wrap"><div className="tl-dot past"><i className="fa-solid fa-book"></i></div></div>
                <div className="tl-content">
                  <div className="tl-year">2020 — 2021</div>
                  <div className="tl-degree">Secondary (10th Standard)</div>
                  <div className="tl-institution">Gwalior, Madhya Pradesh</div>
                  <p className="tl-desc">Completed secondary education with strong fundamentals in mathematics and science, sparking an interest in computing and technology.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="edu-sidebar">
            <div className="edu-highlight fade-up" ref={animateRef}>
              <div className="edu-hl-title"><i className="fa-solid fa-star"></i> &nbsp;Key Highlights</div>
              <div className="hl-list">
                <div className="hl-item"><div className="hl-icon"><i className="fa-solid fa-university"></i></div><div className="hl-text"><strong>ITM University</strong> — Recognized institution in Gwalior, MP</div></div>
                <div className="hl-item"><div className="hl-icon"><i className="fa-solid fa-calendar"></i></div><div className="hl-text"><strong>3-Year Program</strong> — Full BCA curriculum</div></div>
                <div className="hl-item"><div className="hl-icon"><i className="fa-solid fa-laptop-code"></i></div><div className="hl-text"><strong>Hands-on Projects</strong> — Built 2+ real applications</div></div>
                <div className="hl-item"><div className="hl-icon"><i className="fa-solid fa-code"></i></div><div className="hl-text"><strong>Self-Learning</strong> — Continuously expanding skills</div></div>
              </div>
            </div>

            <div className="courses-card fade-up" ref={animateRef}>
              <div className="courses-title"><i className="fa-solid fa-list-check"></i> &nbsp;Key Courses</div>
              {[['Programming in Python','Sem 1–2'],['C Programming & C++','Sem 1–3'],['Database Management Systems','Sem 2–3'],['Data Structures & Algorithms','Sem 3'],['Web Technologies (HTML/CSS/JS)','Sem 4'],['Object-Oriented Programming','Sem 2–4']].map(([name, sem]) => (
                <div className="course-row" key={name}><span className="course-name">{name}</span><span className="course-sem">{sem}</span></div>
              ))}
            </div>

            <div className="goals-card fade-up" ref={animateRef}>
              <div className="courses-title"><i className="fa-solid fa-rocket"></i> &nbsp;Learning Goals</div>
              {[['01','Master <strong>Data Structures & Algorithms</strong> for competitive programming'],['02','Deepen expertise in <strong>Database Design</strong> and advanced SQL'],['03','Explore <strong>Web Development</strong> with modern frameworks'],['04','Land a <strong>Software Internship</strong> to gain real-world experience']].map(([num, text]) => (
                <div className="goal-item" key={num}><div className="goal-num">{num}</div><div className="goal-text" dangerouslySetInnerHTML={{ __html: text }} /></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
