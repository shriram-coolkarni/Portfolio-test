import { currentlyLearning, profile, skills } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import SkillIcons from './SkillIcons'
import TerminalWindow from './TerminalWindow'

const LOGO = [
  '     ▄▄▄▄▄▄▄     ',
  '   ▄█████████▄   ',
  '  █████████████  ',
  '  █████████████  ',
  '   ▀█████████▀   ',
  '     ▀▀▀▀▀▀▀     ',
]

export default function Skills() {
  const entries = Object.entries(skills)

  return (
    <section id="skills" className="mx-auto flex min-h-screen max-w-6xl scroll-mt-20 flex-col justify-center px-6 py-24">
      <SectionHeading index="02" title="skills" />
      <Reveal>
        <TerminalWindow title="neofetch">
          <div className="grid gap-8 font-mono text-xs sm:grid-cols-[auto_1fr] sm:text-sm">
            <pre className="hidden select-none text-term-green sm:block">{LOGO.join('\n')}</pre>

            <div className="space-y-2">
              <p>
                <span className="text-term-green">shriram</span>
                <span className="text-term-dim">@</span>
                <span className="text-term-green">portfolio</span>
              </p>
              <div className="h-px bg-term-border" />
              {entries.map(([category, items]) => (
                <p key={category}>
                  <span className="text-term-amber">{category}</span>
                  <span className="text-term-dim">: </span>
                  <span className="text-term-text">{items.join(', ')}</span>
                </p>
              ))}
            </div>
          </div>
        </TerminalWindow>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <p className="mb-6 text-center font-mono text-xs text-term-dim">
          hover a node · <span className="text-term-amber">amber dot</span> = currently learning
        </p>
        <SkillIcons />
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <TerminalWindow title="cat currently-learning.log">
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            <p className="text-term-dim">
              # foundational exposure — actively building toward hands-on, production-level proficiency.
            </p>
            <p className="text-term-dim"># not yet applied in a project or work context.</p>
            <ul className="mt-2 grid list-inside list-disc grid-cols-1 gap-x-6 gap-y-1 text-term-text sm:grid-cols-2">
              {currentlyLearning.map((item) => (
                <li key={item} className="marker:text-term-cyan">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </TerminalWindow>
      </Reveal>

      <p className="mt-3 pl-1 text-xs text-term-dim">— {profile.name.split(' ')[0]}, keeping this list honest.</p>
    </section>
  )
}
