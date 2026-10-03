import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiClock, FiMapPin, FiTrendingUp } from 'react-icons/fi'
import { profile, yearsOfExperience } from '../data/content'
import Reveal from './Reveal'
import ScrollRevealText from './ScrollRevealText'
import SectionHeading from './SectionHeading'
import SpotlightCard from './SpotlightCard'

const YEARS_AT_ZENSAR = yearsOfExperience()

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading index="01" eyebrow="about" title="Keeping production calm," accent="one incident at a time." />

      <div className="grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal className="sm:col-span-2 lg:row-span-2">
          <SpotlightCard className="flex h-full flex-col justify-between p-7 sm:p-9">
            <ScrollRevealText
              text={profile.summary}
              className="text-xl font-medium leading-snug tracking-[-0.02em] text-fg sm:text-2xl lg:text-[1.7rem]"
            />
            <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-muted sm:text-base">
              Currently upskilling toward Kubernetes, Infrastructure as Code, and observability tooling to move deeper
              into DevOps / Site Reliability Engineering.
            </p>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.05}>
          <SpotlightCard className="flex h-full flex-col justify-between p-7">
            <Label icon={<FiTrendingUp />}>At Zensar</Label>
            <div>
              <p className="text-6xl font-semibold tracking-[-0.05em] text-fg">
                <Counter to={YEARS_AT_ZENSAR} />
                <span className="text-accent">+</span>
              </p>
              <p className="mt-1 text-sm text-muted">years in production ops</p>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.1}>
          <SpotlightCard className="flex h-full flex-col justify-between p-7">
            <Label icon={<FiClock />}>Local time</Label>
            <LocalClock />
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.15}>
          <SpotlightCard className="flex h-full flex-col justify-between p-7">
            <Label>CI/CD pipeline</Label>
            <div>
              <p className="text-6xl font-semibold tracking-[-0.05em] text-fg">
                <Counter to={60} />
                <span className="text-accent">%</span>
              </p>
              <p className="mt-1 text-sm text-muted">faster deploys, 80% less manual effort</p>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.2}>
          <SpotlightCard className="h-full p-0">
            <div className="flex items-center gap-1.5 border-b border-line px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-2 font-mono text-[11px] text-faint">uname -a</span>
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 p-5 font-mono text-xs">
              <dt className="text-faint">role</dt>
              <dd className="text-fg">System Engineer</dd>
              <dt className="text-faint">focus</dt>
              <dd className="text-accent">NOC → DevOps / SRE</dd>
              <dt className="text-faint">uptime</dt>
              <dd className="text-fg">no burnout detected</dd>
              <dt className="text-faint">shell</dt>
              <dd className="cursor-blink text-fg">bash</dd>
            </dl>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  )
}

function Label({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
      {icon && <span className="text-accent">{icon}</span>}
      {children}
    </p>
  )
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const value = useMotionValue(0)
  const spring = useSpring(value, { stiffness: 60, damping: 20 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) value.set(to)
  }, [inView, to, value])

  useEffect(() => spring.on('change', (v) => setDisplay(Math.round(v))), [spring])

  return <span ref={ref}>{display}</span>
}

function LocalClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div>
      <p className="font-mono text-4xl font-medium tabular-nums tracking-tight text-fg">{time}</p>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
        <FiMapPin className="text-accent" />
        Pune · IST (UTC+5:30)
      </p>
    </div>
  )
}
