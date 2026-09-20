import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useScramble } from '../hooks/useScramble'

export default function SectionHeading({ index, title }: { index: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const scrambled = useScramble(title.toUpperCase(), inView)

  return (
    <div ref={ref} className="mb-8 flex items-baseline gap-4">
      <span className="font-mono text-sm text-term-dim">{index}</span>
      <h2 className="font-mono text-2xl font-bold tracking-tight text-term-green text-glow sm:text-4xl">
        {scrambled}
      </h2>
      <span className="h-px flex-1 bg-term-border" />
    </div>
  )
}
