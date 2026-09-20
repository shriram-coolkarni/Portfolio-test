import { motion } from 'framer-motion'
import photo from '../assets/photo.jpg'

export default function Avatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <span className="absolute -left-2 -top-2 h-5 w-5 border-l-2 border-t-2 border-term-green" />
      <span className="absolute -right-2 -top-2 h-5 w-5 border-r-2 border-t-2 border-term-green" />
      <span className="absolute -bottom-2 -left-2 h-5 w-5 border-b-2 border-l-2 border-term-green" />
      <span className="absolute -bottom-2 -right-2 h-5 w-5 border-b-2 border-r-2 border-term-green" />

      <div className="h-40 w-40 overflow-hidden rounded-md border border-term-border bg-term-bg-alt sm:h-48 sm:w-48">
        <img src={photo} alt="Shriram Kulkarni" className="h-full w-full object-cover" />
      </div>
    </motion.div>
  )
}
