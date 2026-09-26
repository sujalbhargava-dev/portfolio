import { createContext, useState, useCallback } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem('isLoggedIn') === 'true'
  )
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem('isAdmin') === 'true'
  )

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        sessionStorage.setItem('isLoggedIn', 'true')
        sessionStorage.setItem('isAdmin', data.isAdmin ? 'true' : 'false')
        setIsLoggedIn(true)
        setIsAdmin(!!data.isAdmin)
        return { success: true, isAdmin: !!data.isAdmin }
      }
      return { success: false, error: data.error || 'Invalid credentials' }
    } catch (err) {
      console.error('Login error:', err)
      return { success: false, error: 'Network error or server unavailable' }
    }
  }, [])

  const register = useCallback(async (email, password) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        sessionStorage.setItem('isLoggedIn', 'true')
        sessionStorage.setItem('isAdmin', 'false')
        setIsLoggedIn(true)
        setIsAdmin(false)
        return { success: true }
      }
      return { success: false, error: data.error || 'Failed to create account' }
    } catch (err) {
      console.error('Register error:', err)
      return { success: false, error: 'Network error or server unavailable' }
    }
  }, [])

  const logout = useCallback(() => {
    sessionStorage.clear()
    setIsLoggedIn(false)
    setIsAdmin(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
