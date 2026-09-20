import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'

export default function TerminalWindow({
  title,
  children,
  className = '',
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 })
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(400px circle at ${glowX}% ${glowY}%, rgba(74,222,128,0.08), transparent 70%)`

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 6)
    rotateX.set((0.5 - py) * 6)
    glowX.set(px * 100)
    glowY.set(py * 100)
  }

  function onMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
      className={`relative overflow-hidden rounded-lg border border-term-border bg-term-bg-alt shadow-[0_0_40px_-15px_rgba(74,222,128,0.15)] backdrop-blur-sm will-change-transform ${className}`}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ backgroundImage: glow }} />
      <div className="relative flex items-center gap-2 border-b border-term-border bg-black/30 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-term-red/70" />
        <span className="h-3 w-3 rounded-full bg-term-amber/70" />
        <span className="h-3 w-3 rounded-full bg-term-green/70" />
        <span className="ml-3 truncate text-xs text-term-dim">{title}</span>
      </div>
      <div className="relative p-5 sm:p-6">{children}</div>
    </motion.div>
  )
}
