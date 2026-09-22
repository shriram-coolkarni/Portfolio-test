import { experience } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TerminalWindow from './TerminalWindow'

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto flex min-h-screen max-w-6xl scroll-mt-20 flex-col justify-center px-6 py-24"
    >
      <SectionHeading index="04" title="experience" />
      <Reveal>
        <TerminalWindow title="git log --graph --oneline experience">
          <div className="space-y-8 font-mono text-sm sm:text-base">
            {experience.map((entry, i) => (
              <div key={entry.role} className="relative pl-6">
                <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-term-green shadow-[0_0_8px] shadow-term-green" />
                {i < experience.length - 1 && (
                  <span className="absolute left-[4.5px] top-4 h-[calc(100%+1rem)] w-px bg-term-border" />
                )}
                <p className="text-term-dim">{entry.period}</p>
                <p className="mt-1 font-semibold text-term-green">{entry.role}</p>
                {entry.orgUrl ? (
                  <a
                    href={entry.orgUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-term-cyan underline underline-offset-4 hover:text-term-green"
                  >
                    {entry.org}
                  </a>
                ) : (
                  <p className="text-term-cyan">{entry.org}</p>
                )}
                <ul className="mt-2 list-outside list-disc space-y-1.5 pl-5 text-term-text">
                  {entry.bullets.map((b) => (
                    <li key={b} className="marker:text-term-amber">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  )
}
