import { useState, useEffect } from 'react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

const API_URL = 'http://localhost:4000/api/contact'

const CHANNELS = [
  {
    id: 'email-contact',
    cls: 'cc-email',
    href: 'mailto:sujalbhargava2341@gmail.com',
    icon: 'fa-solid fa-envelope',
    label: 'Email',
    value: 'sujalbhargava2341@gmail.com',
    external: false,
  },
  {
    id: 'github-contact',
    cls: 'cc-github',
    href: 'https://github.com/sujalbhargava-dev',
    icon: 'fa-brands fa-github',
    label: 'GitHub',
    value: 'github.com/sujalbhargava-dev',
    external: true,
  },
  {
    id: 'linkedin-contact',
    cls: 'cc-linkedin',
    href: 'https://linkedin.com/in/yourusername',
    icon: 'fa-brands fa-linkedin-in',
    label: 'LinkedIn',
    value: 'linkedin.com/in/yourusername',
    external: true,
  },
]

const INIT_FORM = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm]       = useState(INIT_FORM)
  const [status, setStatus]   = useState('idle') // idle | loading | success | error
  const [errMsg, setErrMsg]   = useState('')

  useIntersectionObserver()
  useEffect(() => { document.title = 'Contact — Sujal Bhargava' }, [])

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      const res  = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm(INIT_FORM)
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setErrMsg(data.error || 'Something went wrong.')
        setStatus('error')
      }
    } catch {
      setErrMsg('Could not reach the server. Please try again.')
      setStatus('error')
    }
  }

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'

  return (
    <>
      <div className="page">
        <div className="section">
          <div className="section-header fade-up">
            <span className="section-tag">Contact</span>
            <h1 className="section-title">Let's Connect</h1>
            <p className="section-desc">
              Have an opportunity, project idea, or just want to say hi? I would love to hear from you.
            </p>
          </div>

          <div className="contact-layout">
            {/* Left: Info */}
            <div className="contact-info fade-up">
              <div>
                <div className="contact-intro-title">Get in Touch 👋</div>
                <p className="contact-intro-text">
                  I am currently a BCA student open to internship opportunities, collaborative projects,
                  and freelance work. Feel free to reach out through any of the channels below.
                </p>
              </div>

              <div className="availability-box">
                <div className="avail-dot" />
                <div className="avail-text">
                  <strong>Available for Opportunities</strong><br />
                  Open to internships, part-time projects, and freelance work.
                  Response time: within 24 hours.
                </div>
              </div>

              {CHANNELS.map(({ id, cls, href, icon, label, value, external }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  className={`contact-card ${cls}`}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <div className="cc-icon"><i className={icon} /></div>
                  <div>
                    <div className="cc-label">{label}</div>
                    <div className="cc-value">{value}</div>
                  </div>
                </a>
              ))}

              <div style={{ padding: '16px 0', borderTop: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  <i className="fa-solid fa-location-dot" style={{ color: 'var(--accent)' }} />
                  &nbsp; <strong style={{ color: 'var(--text-secondary)' }}>Location:</strong> Gwalior, Madhya Pradesh, India
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form-wrap fade-up">
              <div className="form-title">Send a Message</div>
              <div className="form-subtitle">Fill in the form and I will get back to you as soon as possible.</div>

              <form id="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="form-name">
                      Full Name <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <input
                      className="form-input" type="text" id="form-name" name="name"
                      placeholder="Your name" required value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="form-email">
                      Email <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <input
                      className="form-input" type="email" id="form-email" name="email"
                      placeholder="your@email.com" required value={form.email} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="form-subject">
                    Subject <span style={{ color: 'var(--accent)' }}>*</span>
                  </label>
                  <input
                    className="form-input" type="text" id="form-subject" name="subject"
                    placeholder="What is this about?" required value={form.subject} onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="form-message">
                    Message <span style={{ color: 'var(--accent)' }}>*</span>
                  </label>
                  <textarea
                    className="form-textarea" id="form-message" name="message"
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                    required value={form.message} onChange={handleChange}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '12px' }}>
                    <i className="fa-solid fa-circle-exclamation" /> {errMsg}
                  </p>
                )}

                <button
                  type="submit"
                  id="submit-btn"
                  className="form-submit"
                  disabled={isLoading || isSuccess}
                  style={isSuccess ? { background: '#10b981' } : {}}
                >
                  {isSuccess ? (
                    <><i className="fa-solid fa-circle-check" /> Message Sent!</>
                  ) : isLoading ? (
                    <><i className="fa-solid fa-spinner fa-spin" /> Sending…</>
                  ) : (
                    <><i className="fa-solid fa-paper-plane" /> Send Message</>
                  )}
                </button>

                <p className="form-note">
                  <i className="fa-solid fa-lock" style={{ fontSize: '0.65rem' }} />
                  {' '}Your information is private and will never be shared.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-layout { display: grid; grid-template-columns: 1fr 1.5fr; gap: 56px; align-items: start; }
        .contact-info { display: flex; flex-direction: column; gap: 20px; }
        .contact-intro-title { font-size: 1.3rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em; margin-bottom: 8px; }
        .contact-intro-text { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.75; margin-bottom: 4px; }
        .contact-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 18px 20px; display: flex; align-items: center; gap: 16px; box-shadow: var(--card-shadow); transition: var(--transition); text-decoration: none; color: inherit; }
        .contact-card:hover { border-color: var(--accent-border); background: var(--accent-light); transform: translateY(-2px); box-shadow: var(--card-shadow-md); }
        .cc-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; transition: var(--transition); }
        .cc-email .cc-icon   { background: #fef2f2; color: #dc2626; }
        .cc-github .cc-icon  { background: #f3f4f6; color: #1f2937; }
        .cc-linkedin .cc-icon{ background: #eff6ff; color: #2563eb; }
        .contact-card:hover .cc-icon { background: var(--accent); color: white; }
        .cc-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        .cc-value { font-size: 0.875rem; color: var(--text-primary); font-weight: 600; word-break: break-all; }
        .availability-box { background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 1px solid #bbf7d0; border-radius: var(--radius-sm); padding: 18px 20px; display: flex; align-items: flex-start; gap: 14px; }
        .avail-dot { width: 10px; height: 10px; background: #22c55e; border-radius: 50%; flex-shrink: 0; margin-top: 5px; animation: avail-pulse 2.2s infinite; }
        @keyframes avail-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); } 60% { box-shadow: 0 0 0 8px rgba(34,197,94,0); } }
        .avail-text { font-size: 0.875rem; color: #166534; font-weight: 500; line-height: 1.6; }
        .avail-text strong { font-weight: 700; }
        .contact-form-wrap { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 36px; box-shadow: var(--card-shadow); }
        .form-title { font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; }
        .form-subtitle { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 28px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .form-label { font-size: 0.78rem; font-weight: 600; color: var(--text-primary); }
        .form-input, .form-textarea {
          width: 100%; padding: 12px 16px; background: var(--bg-secondary);
          border: 1.5px solid var(--border); border-radius: var(--radius-sm);
          font-size: 0.9rem; font-family: 'Inter', sans-serif; color: var(--text-primary);
          transition: var(--transition); outline: none; resize: none;
        }
        .form-input::placeholder, .form-textarea::placeholder { color: var(--text-muted); }
        .form-input:focus, .form-textarea:focus { border-color: var(--accent); background: var(--bg); box-shadow: 0 0 0 3px rgba(79,70,229,0.1); }
        .form-textarea { min-height: 140px; }
        .form-submit {
          width: 100%; padding: 14px; border-radius: 10px; font-size: 0.9rem;
          font-weight: 700; font-family: 'Inter', sans-serif; background: var(--accent);
          color: white; border: none; cursor: pointer; display: flex;
          align-items: center; justify-content: center; gap: 8px; transition: var(--transition);
        }
        .form-submit:hover:not(:disabled) { background: var(--accent-hover); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(79,70,229,0.35); }
        .form-submit:disabled { opacity: 0.85; cursor: not-allowed; transform: none; }
        .form-note { font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 12px; }
        @media (max-width: 900px) { .contact-layout { grid-template-columns: 1fr; gap: 40px; } .form-row { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .contact-form-wrap { padding: 24px 20px; } }
      `}</style>
    </>
  )
}
