import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { FiArrowUpRight, FiCheck } from 'react-icons/fi'
import { projects, type Project } from '../data/content'
import SectionHeading from './SectionHeading'
import SpotlightCard from './SpotlightCard'

gsap.registerPlugin(ScrollTrigger)

// One accent per card so the horizontal strip doesn't read as four identical boxes.
const HUES = ['74,222,128', '45,212,191', '163,230,53', '251,191,36']

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      const scrollLength = () => track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -scrollLength(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollLength()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`
          },
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative flex h-[100svh] scroll-mt-0 flex-col overflow-hidden">
      <div className="mx-auto w-full max-w-7xl shrink-0 px-5 pt-24 sm:px-8 sm:pt-28">
        <SectionHeading index="03" eyebrow="selected work" title="Things I've" accent="built & shipped." compact />
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 overflow-hidden bg-line">
            <div ref={progressRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2" />
          </div>
          <span className="font-mono text-xs text-muted">
            {String(projects.length).padStart(2, '0')} projects · scroll →
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 items-center">
        <div ref={trackRef} className="flex items-stretch gap-5 pl-5 pr-[10vw] sm:gap-6 sm:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} hue={HUES[i % HUES.length]} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, hue }: { project: Project; index: number; hue: string }) {
  const isLive = project.status === 'deployed'

  return (
    <div className="w-[86vw] shrink-0 sm:w-[520px] lg:w-[560px]">
      <SpotlightCard glow={hue} className="flex h-full max-h-[62svh] flex-col sm:max-h-[60vh]">
        <div
          className="relative flex h-28 shrink-0 items-end justify-between overflow-hidden border-b border-line px-6 pb-4 sm:h-36 sm:px-7"
          style={{
            background: `radial-gradient(120% 140% at 0% 0%, rgba(${hue},0.28), transparent 55%), radial-gradient(90% 120% at 100% 100%, rgba(${hue},0.12), transparent 60%)`,
          }}
        >
          <span
            className="pointer-events-none absolute -right-2 -top-6 select-none text-[8rem] font-semibold leading-none tracking-[-0.06em] text-transparent sm:text-[10rem]"
            style={{ WebkitTextStroke: `1px rgba(${hue},0.35)` }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="relative font-mono text-xs text-muted">{project.period}</span>
          <span
            className={`relative flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
              isLive ? 'border-accent/30 bg-accent/10 text-accent' : 'border-warn/30 bg-warn/10 text-warn'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isLive ? 'bg-accent' : 'animate-pulse bg-warn'}`} />
            {isLive ? 'deployed' : 'in progress'}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-7">
          <h3 className="text-xl font-semibold leading-tight tracking-[-0.03em] text-fg sm:text-2xl">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

          {project.achievements && (
            <ul className="mt-4 space-y-2">
              {project.achievements.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm text-fg">
                  <FiCheck className="mt-0.5 shrink-0" style={{ color: `rgb(${hue})` }} />
                  {a}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] text-muted">
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group/link flex shrink-0 items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition hover:bg-accent"
              >
                Visit live
                <FiArrowUpRight className="transition group-hover/link:rotate-45" />
              </a>
            )}
          </div>
        </div>
      </SpotlightCard>
    </div>
  )
}
