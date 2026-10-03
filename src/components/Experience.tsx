import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { experience } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import SpotlightCard from './SpotlightCard'

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.6'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading index="04" eyebrow="career" title="Where I've been" accent="on call." />

      <div ref={listRef} className="relative pl-8 sm:pl-12">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-line sm:left-[11px]" />
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 shadow-[0_0_12px_#4ade80] sm:left-[11px]"
        />

        <div className="space-y-8">
          {experience.map((entry, i) => (
            <Reveal key={entry.role} delay={i * 0.08} className="relative">
              <span className="absolute -left-8 top-8 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent/50 bg-bg sm:-left-12 sm:h-[23px] sm:w-[23px]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#4ade80] sm:h-2 sm:w-2" />
              </span>

              <SpotlightCard className="p-6 sm:p-8">
                <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">{entry.period}</p>
                    {entry.orgUrl ? (
                      <a
                        href={entry.orgUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group/org mt-3 inline-flex items-center gap-1 text-sm text-muted transition hover:text-fg"
                      >
                        {entry.org}
                        <FiArrowUpRight className="transition group-hover/org:rotate-45" />
                      </a>
                    ) : (
                      <p className="mt-3 text-sm text-muted">{entry.org}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-fg sm:text-2xl">{entry.role}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {entry.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                          <span className="mt-[0.6em] h-1 w-3 shrink-0 rounded-full bg-accent/60" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
