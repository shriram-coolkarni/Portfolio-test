import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import type { ReactNode } from 'react'

// Glass card with a cursor-following glow on both the fill and the border —
// the "spotlight" hover popularised by Linear/Vercel.
export default function SpotlightCard({
  children,
  className = '',
  glow = '74,222,128',
}: {
  children: ReactNode
  className?: string
  glow?: string
}) {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const fill = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(${glow},0.10), transparent 70%)`
  const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(${glow},0.55), transparent 70%)`

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        x.set(-400)
        y.set(-400)
      }}
      className={`group relative overflow-hidden rounded-3xl border border-line bg-surface/60 backdrop-blur-xl ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: border,
          padding: 1,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: fill }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}
