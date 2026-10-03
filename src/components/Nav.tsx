import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Stack' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Career' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  // Hide on scroll-down, reveal on scroll-up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 200)
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const highlight = hovered ?? active

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
    >
      <div className="flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fg font-mono text-xs font-bold text-bg"
          aria-label="Back to top"
        >
          SK
        </button>
        <div className="flex items-center" onMouseLeave={() => setHovered(null)}>
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              onMouseEnter={() => setHovered(link.id)}
              className={`relative rounded-full px-2.5 py-2 text-xs transition-colors sm:px-3.5 sm:text-sm ${
                highlight === link.id ? 'text-fg' : 'text-muted'
              }`}
            >
              {highlight === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.08]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo('contact')}
          className="group ml-1 hidden items-center gap-1 rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent-3 sm:flex"
        >
          Hire me
          <FiArrowUpRight className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.nav>
  )
}
