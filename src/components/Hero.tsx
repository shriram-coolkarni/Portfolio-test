import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FiDownload } from 'react-icons/fi'
import { profile } from '../data/content'
import { useTypewriter } from '../hooks/useTypewriter'
import Avatar from './Avatar'
import TerminalWindow from './TerminalWindow'

const COMMANDS = [`whoami`, `cat role.txt`, `cat summary.txt`]

export default function Hero() {
  const { output, done } = useTypewriter(COMMANDS, { speed: 35, startDelay: 300 })
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center justify-center px-6">
      <motion.div
        style={{ scale, opacity, y }}
        className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16"
      >
        <div className="order-1 flex justify-center lg:order-none">
          <Avatar />
        </div>

        <div className="order-2 lg:order-none">
          <TerminalWindow title="shriram@portfolio:~">
            <div className="space-y-3 font-mono text-sm sm:text-base lg:text-lg">
              <Line prompt cmd={output[0]} />
              {output[0] === COMMANDS[0] && (
                <p className="pl-4 text-3xl font-semibold text-term-green text-glow sm:text-5xl lg:text-6xl">
                  {profile.name}
                </p>
              )}

              <Line prompt cmd={output[1]} />
              {output[1] === COMMANDS[1] && <p className="pl-4 text-term-amber">{profile.title}</p>}

              <Line prompt cmd={output[2]} />
              {output[2] === COMMANDS[2] && (
                <p className="pl-4 leading-relaxed text-term-text">
                  {profile.summary}
                  {done && <span className="cursor-blink" />}
                </p>
              )}
            </div>
          </TerminalWindow>

          <div className="mt-6 flex flex-wrap items-center gap-4 pl-1">
            <a
              href="/Shriram_Kulkarni_Resume.pdf"
              download
              className="group flex items-center gap-2 rounded border border-term-green/40 bg-term-green/5 px-4 py-2 font-mono text-xs text-term-green transition hover:bg-term-green/15 hover:shadow-[0_0_20px_-4px_rgba(74,222,128,0.5)] sm:text-sm"
            >
              <FiDownload className="transition group-hover:translate-y-0.5" />
              ./download-resume.sh
            </a>
            <p className="text-xs text-term-dim sm:text-sm">
              {profile.location} · scroll or run <code className="text-term-cyan">ls</code> above to explore
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-term-dim"
      >
        ▼ scroll
      </motion.div>
    </section>
  )
}

function Line({ prompt, cmd }: { prompt: boolean; cmd?: string }) {
  if (!cmd) return null
  return (
    <div className="flex gap-2">
      {prompt && <span className="text-term-green">shriram@portfolio:~$</span>}
      <span className="text-term-text">{cmd}</span>
    </div>
  )
}
