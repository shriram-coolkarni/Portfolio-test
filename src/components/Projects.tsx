import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { projects } from '../data/content'
import SectionHeading from './SectionHeading'
import TerminalWindow from './TerminalWindow'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      const scrollLength = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -scrollLength,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollLength}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative scroll-mt-20">
      <div className="absolute top-10 left-0 right-0 z-10 mx-auto max-w-6xl px-6">
        <SectionHeading index="03" title="projects" />
        <p className="-mt-4 font-mono text-xs text-term-dim">scroll to move through ~/projects →</p>
      </div>

      <div className="flex h-screen items-center overflow-hidden">
        <div ref={trackRef} className="flex items-center gap-6 pl-6 pr-[20vw] sm:gap-8 sm:pl-[8vw]">
          {projects.map((project) => (
            <div key={project.id} className="w-[85vw] shrink-0 sm:w-[440px] lg:w-[480px]">
              <TerminalWindow title={`~/projects/${project.id}`}>
                <div className="flex items-center justify-between gap-2 font-mono text-sm sm:text-base">
                  <span className="text-term-dim">drwxr-xr-x</span>
                  <StatusBadge status={project.status} />
                </div>
                <p className="mt-2 font-mono text-lg font-semibold text-term-cyan sm:text-xl">{project.title}</p>
                <p className="font-mono text-xs text-term-dim">{project.period}</p>

                <p className="mt-4 font-mono text-sm leading-relaxed text-term-text">{project.description}</p>

                {project.achievements && (
                  <ul className="mt-3 list-inside list-disc space-y-1 font-mono text-sm text-term-text">
                    {project.achievements.map((a) => (
                      <li key={a} className="marker:text-term-green">
                        {a}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-term-border bg-black/30 px-2 py-0.5 font-mono text-xs text-term-amber"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block font-mono text-sm text-term-cyan underline underline-offset-4 hover:text-term-green"
                  >
                    → {project.link.replace('https://', '')}
                  </a>
                )}
              </TerminalWindow>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatusBadge({ status }: { status: 'deployed' | 'in-progress' }) {
  const isLive = status === 'deployed'
  return (
    <span
      className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
        isLive ? 'bg-term-green/10 text-term-green' : 'bg-term-amber/10 text-term-amber'
      }`}
    >
      {isLive ? 'deployed' : 'in progress'}
    </span>
  )
}
