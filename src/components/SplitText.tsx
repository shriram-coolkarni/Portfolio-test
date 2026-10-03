import { motion } from 'framer-motion'

// Kinetic headline: each word slides up from behind a mask, staggered.
export default function SplitText({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.06,
  inView = false,
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  inView?: boolean
}) {
  const words = text.split(' ')
  const target = { y: '0%', rotate: 0 }
  const animateProps = inView
    ? { whileInView: target, viewport: { once: true, margin: '-60px' } }
    : { animate: target }

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: '110%', rotate: 4 }}
            {...animateProps}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
