import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FiArrowUpRight, FiCheck, FiCopy, FiDownload, FiLinkedin, FiPhone } from 'react-icons/fi'
import { profile } from '../data/content'
import Magnetic from './Magnetic'
import Reveal from './Reveal'
import SplitText from './SplitText'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-5 py-32 sm:px-8 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#4ade8022,transparent_60%)]" />

      <div className="mx-auto max-w-7xl text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          <span className="text-accent">05</span> — contact
        </p>
        <h2 className="text-[clamp(2.8rem,9vw,8rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-fg">
          <SplitText text="Let's keep" inView />
          <br />
          <SplitText
            text="things running."
            inView
            delay={0.15}
            className="font-serif font-normal italic tracking-[-0.03em]"
            wordClassName="text-gradient pr-[0.06em]"
          />
        </h2>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-base text-muted sm:text-lg">
            Open to DevOps, SRE and Network Engineering roles. My inbox is always on — reach out any time.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 flex flex-col items-center gap-6">
          <Magnetic strength={0.15}>
            <div className="group flex items-center gap-2 rounded-full border border-line-strong bg-surface/70 p-2 pl-6 backdrop-blur-xl transition hover:border-accent/50">
              <a
                href={`mailto:${profile.email}`}
                className="max-w-[58vw] truncate text-sm font-medium text-fg sm:max-w-none sm:text-xl"
              >
                {profile.email}
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-bg transition hover:bg-accent-3 sm:h-12 sm:w-12"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'done' : 'copy'}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </Magnetic>

          <div className="flex flex-wrap justify-center gap-3">
            <Pill href={profile.linkedin} icon={<FiLinkedin />} label="LinkedIn" external />
            <Pill href={`tel:${profile.phone}`} icon={<FiPhone />} label={profile.phone} />
            <Pill href="/Shriram_Kulkarni_Resume.pdf" icon={<FiDownload />} label="Résumé (PDF)" download />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Pill({
  href,
  icon,
  label,
  external,
  download,
}: {
  href: string
  icon: React.ReactNode
  label: string
  external?: boolean
  download?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      download={download}
      className="group flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-muted backdrop-blur-md transition hover:border-accent/50 hover:bg-accent/5 hover:text-fg"
    >
      <span className="text-accent">{icon}</span>
      {label}
      {external && <FiArrowUpRight className="opacity-60 transition group-hover:rotate-45" />}
    </a>
  )
}
