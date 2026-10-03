import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useScramble } from '../hooks/useScramble'
import SplitText from './SplitText'

export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  compact = false,
}: {
  index: string
  eyebrow: string
  title: string
  accent?: string
  compact?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const scrambled = useScramble(eyebrow.toUpperCase(), inView)

  return (
    <div ref={ref} className={compact ? 'mb-6 sm:mb-8' : 'mb-12 sm:mb-16'}>
      <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        <span>{scrambled}</span>
      </div>
      <h2
        className={`max-w-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-fg ${
          compact ? 'text-3xl sm:text-5xl' : 'text-4xl sm:text-6xl lg:text-7xl'
        }`}
      >
        <SplitText text={title} inView />
        {accent && (
          <>
            {' '}
            <SplitText
              text={accent}
              inView
              delay={0.15}
              className="font-serif font-normal italic tracking-[-0.02em]"
              wordClassName="text-gradient pr-[0.08em]"
            />
          </>
        )}
      </h2>
    </div>
  )
}
