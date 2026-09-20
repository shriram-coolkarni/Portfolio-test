import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

const BOOT_LINES = [
  'shriram-portfolio login: shriram',
  'Loading kernel modules... [ OK ]',
  'Mounting /dev/experience... [ OK ]',
  'Starting network-monitor.service... [ OK ]',
  'Starting incident-response.service... [ OK ]',
  'Starting devops-upskilling.service... [ OK ]',
  'Welcome. Type is optional — scrolling works too.',
]

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [hidden, setHidden] = useState(false)
  const { output, done } = useTypewriter(BOOT_LINES, {
    speed: 14,
    onDone: () => {
      setTimeout(() => setHidden(true), 500)
      setTimeout(onComplete, 1000)
    },
  })

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-term-bg px-6"
        >
          <div className="w-full max-w-xl font-mono text-sm text-term-green">
            {BOOT_LINES.map((_, i) => (
              <div key={i} className="min-h-[1.4em]">
                {output[i]}
                {done && i === BOOT_LINES.length - 1 && <span className="cursor-blink" />}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
