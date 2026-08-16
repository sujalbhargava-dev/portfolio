import { Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'

import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Education from './pages/Education'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Messages from './pages/Messages'

function PublicLayout({ children }) {
  return (
    <>
      <Background />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  const { isAdmin } = useAuth()

  return (
    <Routes>
      {/* Admin Login page */}
      <Route path="/login" element={
        <>
          <Background />
          <Navbar />
          <Login />
          <Footer />
        </>
      } />

      {/* Admin Dashboard routes - require admin login */}
      <Route element={
        <ProtectedRoute adminOnly>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
      </Route>

      {/* Portfolio pages - public for everyone */}
      {isAdmin ? (
        // Admin sees all pages inside the dashboard layout
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<div className="page" style={{ paddingTop: 0 }}><Home /></div>} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      ) : (
        // Regular visitors see standard public layout (no login required)
        <>
          <Route path="/" element={
            <PublicLayout><Home /></PublicLayout>
          } />
          <Route path="/about" element={
            <PublicLayout><About /></PublicLayout>
          } />
          <Route path="/skills" element={
            <PublicLayout><Skills /></PublicLayout>
          } />
          <Route path="/projects" element={
            <PublicLayout><Projects /></PublicLayout>
          } />
          <Route path="/education" element={
            <PublicLayout><Education /></PublicLayout>
          } />
          <Route path="/contact" element={
            <PublicLayout><Contact /></PublicLayout>
          } />
        </>
      )}
    </Routes>
  )
}

