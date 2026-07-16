import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Background from './components/Background'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Education from './pages/Education'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/about"     element={<About />} />
        <Route path="/skills"    element={<Skills />} />
        <Route path="/projects"  element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact"   element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}
