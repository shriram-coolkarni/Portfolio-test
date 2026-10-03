import { FiCloud, FiCpu, FiGitBranch, FiPackage, FiShield, FiTerminal, FiWifi } from 'react-icons/fi'
import { currentlyLearning, profile, skills } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import SkillIcons from './SkillIcons'
import SpotlightCard from './SpotlightCard'

const CATEGORY_META: Record<string, { label: string; icon: React.ReactNode; span?: string }> = {
  'cloud-&-infra': { label: 'Cloud & Infra', icon: <FiCloud /> },
  containers: { label: 'Containers', icon: <FiPackage /> },
  'ci/cd-&-automation': { label: 'CI/CD & Automation', icon: <FiGitBranch />, span: 'lg:col-span-2' },
  scripting: { label: 'Scripting & OS', icon: <FiTerminal />, span: 'lg:col-span-2' },
  networking: { label: 'Networking', icon: <FiWifi />, span: 'lg:col-span-2' },
  'reliability-&-ops': { label: 'Reliability & Ops', icon: <FiShield />, span: 'lg:col-span-3' },
  'ai-assisted-dev': { label: 'AI-assisted Dev', icon: <FiCpu />, span: 'sm:col-span-2 lg:col-span-1' },
}

export default function Skills() {
  const entries = Object.entries(skills)

  return (
    <section id="skills" className="scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="02" eyebrow="stack" title="Tools I run in production" accent="& the ones I'm learning." />
      </div>

      <Reveal className="mb-16">
        <SkillIcons />
      </Reveal>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map(([category, items], i) => {
            const meta = CATEGORY_META[category] ?? { label: category, icon: <FiTerminal /> }
            return (
              <Reveal key={category} delay={i * 0.05} className={meta.span}>
                <SpotlightCard className="h-full p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      {meta.icon}
                    </span>
                    <h3 className="font-medium tracking-tight text-fg">{meta.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted transition-colors hover:border-accent/40 hover:text-fg sm:text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>

        {/* Kept visually distinct from the skills above — exposure only, not production experience. */}
        <Reveal delay={0.1} className="mt-4">
          <div className="rounded-3xl border border-dashed border-warn/25 bg-warn/[0.03] p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="flex items-center gap-2.5 font-medium text-fg">
                <span className="h-2 w-2 animate-pulse rounded-full bg-warn" />
                Currently learning
              </h3>
              <p className="font-mono text-xs text-muted">
                foundational exposure · not yet applied in a project or work context
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {currentlyLearning.map((item) => (
                <span key={item} className="rounded-full border border-warn/20 px-3 py-1 text-xs text-warn/90 sm:text-sm">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-5 text-xs text-faint">— {profile.name.split(' ')[0]}, keeping this list honest.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
