import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import '../styles/Login.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const animateRef = useScrollAnimation()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value.trim()
    const password = e.target.password.value.trim()
    setSubmitting(true)

    try {
      const result = await login(email, password)
      if (result.success) {
        navigate('/dashboard')
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
    <div className="login-page">
      <div className="page">
        <div className="section">
          <div className="login-wrapper">
            <div className="section-header fade-up" ref={animateRef} style={{ textAlign: 'center' }}>
              <span className="section-tag">Admin Access</span>
              <h1 className="section-title">Admin Login</h1>
              <p className="section-desc" style={{ margin: '0 auto' }}>Sign in to access the admin dashboard and manage your portfolio.</p>
            </div>

            <div className="card fade-up" ref={animateRef} style={{ padding: 32 }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input className="form-input" type="email" id="email" name="email" placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password
                    <a href="#" className="forgot-link">Forgot Password?</a>
                  </label>
                  <input className="form-input" type="password" id="password" name="password" placeholder="••••••••" required />
                </div>
                <button type="submit" className="form-submit" disabled={submitting}>
                  {submitting ? <><i className="fa-solid fa-spinner fa-spin"></i> Signing in...</> : <><i className="fa-solid fa-right-to-bracket"></i> Sign In</>}
                </button>

                <div className="divider">or</div>
                <button type="button" className="form-submit-google">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  Sign in with Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
