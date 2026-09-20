import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#'

export function useScramble(text: string, inView: boolean, speed = 30) {
  const [display, setDisplay] = useState(text.replace(/[^\s]/g, ' '))
  const frame = useRef(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true
    let raf: ReturnType<typeof setInterval>

    raf = setInterval(() => {
      frame.current++
      const revealCount = Math.floor((frame.current * text.length) / 18)

      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < revealCount) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(''),
      )

      if (revealCount >= text.length) {
        clearInterval(raf)
        setDisplay(text)
      }
    }, speed)

    return () => clearInterval(raf)
  }, [inView, text, speed])

  return display
}
