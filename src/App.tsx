import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect, useState } from 'react'
import About from './components/About'
import BootScreen from './components/BootScreen'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import NetworkScene from './components/NetworkScene'
import Projects from './components/Projects'
import ScrollProgress from './components/ScrollProgress'
import Skills from './components/Skills'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let frameId: number

    lenis.on('scroll', ScrollTrigger.update)

    function raf(time: number) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    gsap.ticker.lagSmoothing(0)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (booted) {
      const t = setTimeout(() => ScrollTrigger.refresh(), 100)
      return () => clearTimeout(t)
    }
  }, [booted])

  return (
    <>
      <BootScreen onComplete={() => setBooted(true)} />
      <NetworkScene />
      {booted && (
        <div className="relative min-h-screen">
          <ScrollProgress />
          <Nav />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
