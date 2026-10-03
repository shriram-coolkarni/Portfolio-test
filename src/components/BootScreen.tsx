import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const STAGES = ['mounting /dev/experience', 'starting network-monitor', 'starting incident-response', 'ready']

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let raf: number
    const start = performance.now()
    const duration = 1600
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      // ease-out so the counter slows near 100
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => setHidden(true), 250)
        setTimeout(onComplete, 650)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stage = STAGES[Math.min(Math.floor((count / 100) * STAGES.length), STAGES.length - 1)]

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-6 sm:p-10"
        >
          <div className="flex items-center justify-between font-mono text-xs text-muted">
            <span>shriram@portfolio</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {stage}
            </span>
          </div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-semibold tracking-[-0.04em] text-fg sm:text-6xl"
            >
              Shriram <span className="font-serif font-normal italic text-accent">Kulkarni</span>
            </motion.p>
          </div>

          <div>
            <div className="mb-3 h-px w-full overflow-hidden bg-line">
              <div className="h-full bg-gradient-to-r from-accent to-accent-2" style={{ width: `${count}%` }} />
            </div>
            <div className="flex items-end justify-between">
              <span className="font-mono text-xs text-muted">DevOps / SRE · Pune, IN</span>
              <span className="text-6xl font-semibold tabular-nums tracking-[-0.05em] text-fg sm:text-8xl">
                {count}
                <span className="text-accent">%</span>
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
