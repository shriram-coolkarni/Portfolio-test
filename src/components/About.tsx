import { profile } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TerminalWindow from './TerminalWindow'

export default function About() {
  return (
    <section id="about" className="mx-auto flex min-h-screen max-w-6xl scroll-mt-20 flex-col justify-center px-6 py-24">
      <SectionHeading index="01" title="about" />
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Reveal>
          <TerminalWindow title="cat about.md">
            <div className="space-y-4 font-mono text-sm leading-relaxed sm:text-base">
              <p className="text-term-text">{profile.summary}</p>
              <p className="text-term-text">
                Currently upskilling toward Kubernetes, Infrastructure as Code, and observability tooling to move
                deeper into DevOps / Site Reliability Engineering.
              </p>
            </div>
          </TerminalWindow>
        </Reveal>

        <Reveal delay={0.15}>
          <TerminalWindow title="uname -a">
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 font-mono text-sm">
              <dt className="text-term-dim">role</dt>
              <dd className="text-term-amber">{profile.title}</dd>
              <dt className="text-term-dim">location</dt>
              <dd className="text-term-text">{profile.location}</dd>
              <dt className="text-term-dim">focus</dt>
              <dd className="text-term-text">NOC → DevOps / SRE</dd>
              <dt className="text-term-dim">uptime</dt>
              <dd className="text-term-text">3+ years, no burnout detected</dd>
            </dl>
          </TerminalWindow>
        </Reveal>
      </div>
    </section>
  )
}
