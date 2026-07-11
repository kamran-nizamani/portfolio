import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Research from './components/Research'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'

const LOADER_KEY = 'kk-loaded'

export default function App() {
  const [showLoader, setShowLoader] = useState(
    () => typeof window !== 'undefined' && !sessionStorage.getItem(LOADER_KEY)
  )

  const handleLoaderComplete = useCallback(() => {
    sessionStorage.setItem(LOADER_KEY, '1')
    setShowLoader(false)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <AnimatePresence>
        {showLoader && <LoadingScreen onComplete={handleLoaderComplete} />}
      </AnimatePresence>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Research />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <Education />
        <div className="divider" />
        <Certifications />
        <div className="divider" />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
