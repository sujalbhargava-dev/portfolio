import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import '../styles/Contact.css'

export default function Contact() {
  const animateRef = useScrollAnimation()
  const [submitState, setSubmitState] = useState({ text: 'Send Message', icon: 'fa-paper-plane', disabled: false, bg: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = {
      name: form.querySelector('#form-name')?.value || '',
      email: form.querySelector('#form-email')?.value || '',
      subject: form.querySelector('#form-subject')?.value || '',
      message: form.querySelector('#form-message')?.value || '',
    }

    setSubmitState({ text: 'Sending...', icon: 'fa-spinner fa-spin', disabled: true, bg: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitState({ text: 'Message Sent!', icon: 'fa-circle-check', disabled: true, bg: '#10b981' })
        form.reset()
      } else {
        setSubmitState({ text: 'Failed to Send', icon: 'fa-circle-xmark', disabled: true, bg: '#ef4444' })
      }
    } catch {
      setSubmitState({ text: 'Connection Error', icon: 'fa-circle-xmark', disabled: true, bg: '#ef4444' })
    }

    setTimeout(() => {
      setSubmitState({ text: 'Send Message', icon: 'fa-paper-plane', disabled: false, bg: '' })
    }, 3000)
  }

  return (
    <div className="page">
      <div className="section">
        <div className="section-header fade-up" ref={animateRef}>
          <span className="section-tag">Contact</span>
          <h1 className="section-title">Let's Connect</h1>
          <p className="section-desc">Have an opportunity, project idea, or just want to say hi? I would love to hear from you.</p>
        </div>

        <div className="contact-layout">
          <div className="contact-info fade-up" ref={animateRef}>
            <div>
              <div className="contact-intro-title">Get in Touch 👋</div>
              <p className="contact-intro-text">I am currently a BCA student open to internship opportunities, collaborative projects, and freelance work. Feel free to reach out through any of the channels below.</p>
            </div>

            <div className="availability-box">
              <div className="avail-dot"></div>
              <div className="avail-text"><strong>Available for Opportunities</strong><br />Open to internships, part-time projects, and freelance work. Response time: within 24 hours.</div>
            </div>

            <a href="mailto:sujalbhargava2341@gmail.com" className="contact-card cc-email" id="email-contact">
              <div className="cc-icon"><i className="fa-solid fa-envelope"></i></div>
              <div><div className="cc-label">Email</div><div className="cc-value">sujalbhargava2341@gmail.com</div></div>
            </a>
            <a href="https://github.com/sujalbhargava-dev" target="_blank" rel="noopener noreferrer" className="contact-card cc-github" id="github-contact">
              <div className="cc-icon"><i className="fa-brands fa-github"></i></div>
              <div><div className="cc-label">GitHub</div><div className="cc-value">github.com/sujalbhargava-dev</div></div>
            </a>
            <a href="https://linkedin.com/in/sujal-bhargava" target="_blank" rel="noopener noreferrer" className="contact-card cc-linkedin" id="linkedin-contact">
              <div className="cc-icon"><i className="fa-brands fa-linkedin-in"></i></div>
              <div><div className="cc-label">LinkedIn</div><div className="cc-value">linkedin.com/in/sujal-bhargava</div></div>
            </a>

            <div style={{ padding: '16px 0', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <i className="fa-solid fa-location-dot" style={{ color: 'var(--accent)' }}></i>
                &nbsp; <strong style={{ color: 'var(--text-secondary)' }}>Location:</strong> Gwalior, Madhya Pradesh, India
              </p>
            </div>
          </div>

          <div className="contact-form-wrap fade-up" ref={animateRef}>
            <div className="form-title">Send a Message</div>
            <div className="form-subtitle">Fill in the form and I will get back to you as soon as possible.</div>
            <form id="contact-form" noValidate onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="form-name">Full Name <span style={{ color: 'var(--accent)' }}>*</span></label>
                  <input className="form-input" type="text" id="form-name" name="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="form-email">Email <span style={{ color: 'var(--accent)' }}>*</span></label>
                  <input className="form-input" type="email" id="form-email" name="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="form-subject">Subject <span style={{ color: 'var(--accent)' }}>*</span></label>
                <input className="form-input" type="text" id="form-subject" name="subject" placeholder="What is this about?" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="form-message">Message <span style={{ color: 'var(--accent)' }}>*</span></label>
                <textarea className="form-textarea" id="form-message" name="message" placeholder="Tell me about your project, opportunity, or just say hello..." required></textarea>
              </div>
              <button type="submit" className="form-submit" id="submit-btn" disabled={submitState.disabled} style={submitState.bg ? { background: submitState.bg } : {}}>
                <i className={`fa-solid ${submitState.icon}`}></i> {submitState.text}
              </button>
              <p className="form-note"><i className="fa-solid fa-lock" style={{ fontSize: '0.65rem' }}></i> Your information is private and will never be shared.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
