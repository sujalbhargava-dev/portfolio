import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import '../styles/Register.css'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const animateRef = useScrollAnimation()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value.trim()
    const password = e.target.password.value.trim()
    setSubmitting(true)

    try {
      const result = await register(email, password)
      if (result.success) {
        navigate('/')
      } else {
        alert(result.error)
        setSubmitting(false)
      }
    } catch {
      alert('Failed to connect to the server')
      setSubmitting(false)
    }
  }

  return (
    <div className="page">
      <div className="section">
        <div className="register-wrapper fade-up" ref={animateRef}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: 30 }}>
            <h1 className="section-title">Create Account</h1>
            <p className="section-desc" style={{ margin: '0 auto' }}>Sign up to access the developer dashboard.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-input" type="email" id="email" name="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input className="form-input" type="password" id="password" name="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className="form-submit" disabled={submitting}>
              {submitting ? <><i className="fa-solid fa-spinner fa-spin"></i> Creating...</> : <><i className="fa-solid fa-user-plus"></i> Create Account</>}
            </button>
          </form>
          <div className="auth-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
