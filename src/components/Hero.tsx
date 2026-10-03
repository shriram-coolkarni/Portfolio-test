import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiArrowDown, FiArrowUpRight, FiDownload } from 'react-icons/fi'
import { profile } from '../data/content'
import Avatar from './Avatar'
import Magnetic from './Magnetic'
import SplitText from './SplitText'

const ROTATING = ['always up.', 'observable.', 'automated.', 'shipping.']

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 0.7], ['blur(0px)', 'blur(10px)'])

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center pb-20 pt-28">
      <motion.div
        style={{ y, opacity, filter: blur }}
        className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-2 pr-4 text-xs text-muted backdrop-blur-md sm:text-sm"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[11px] text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              OPEN
            </span>
            to DevOps · SRE · Network roles
          </motion.div>

          <h1 className="text-[clamp(3.4rem,15vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-fg">
            <SplitText text="Shriram" delay={0.1} />
            <br />
            <SplitText
              text="Kulkarni"
              delay={0.2}
              className="font-serif font-normal italic tracking-[-0.03em]"
              wordClassName="text-gradient pr-[0.06em]"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-baseline gap-x-2.5 text-xl text-muted sm:text-3xl"
          >
            <span>I keep infrastructure</span>
            <RotatingWord />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.title}. 3+ years on Zensar’s NOC for the Airbus account — now shipping CI/CD, Docker and AWS
            on the side.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="/Shriram_Kulkarni_Resume.pdf"
                download
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
                <FiDownload className="relative" />
                <span className="relative">Download résumé</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm text-fg backdrop-blur-md transition hover:border-accent/60 hover:bg-accent/5"
              >
                See my work
                <FiArrowUpRight className="transition group-hover:rotate-45" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Avatar />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute inset-x-0 bottom-6 mx-auto flex max-w-7xl items-center justify-between px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint sm:px-8"
      >
        <span>{profile.location}</span>
        <span className="flex items-center gap-2">
          Scroll
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <FiArrowDown />
          </motion.span>
        </span>
      </motion.div>
    </section>
  )
}

function RotatingWord() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % ROTATING.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-flex overflow-hidden pb-1">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROTATING[i]}
          initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-fg"
        >
          {ROTATING[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
