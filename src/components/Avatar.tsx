import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import photo from '../assets/photo.webp'

// Portrait card with a slow-spinning conic ring and a 3D tilt that follows the cursor.
export default function Avatar() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 15 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="relative aspect-[4/5] w-full max-w-[340px]"
    >
      <div className="absolute -inset-[1.5px] overflow-hidden rounded-[2rem]">
        <div className="absolute inset-[-50%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#4ade80_60deg,#2dd4bf_120deg,transparent_180deg,transparent_360deg)]" />
      </div>
      <div className="absolute -inset-8 -z-10 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative h-full overflow-hidden rounded-[2rem] bg-surface">
        <img src={photo} alt="Shriram Kulkarni" className="h-full w-full scale-110 object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/90 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-line bg-bg/50 px-4 py-3 backdrop-blur-md">
          <div>
            <p className="text-sm font-medium text-fg">Shriram Kulkarni</p>
            <p className="font-mono text-[11px] text-muted">System Engineer · NOC</p>
          </div>
          <span className="flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-accent/60" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}
