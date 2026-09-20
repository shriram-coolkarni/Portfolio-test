import { useEffect, useState } from 'react'

export function useTypewriter(
  lines: string[],
  { speed = 28, startDelay = 0, onDone }: { speed?: number; startDelay?: number; onDone?: () => void } = {},
) {
  const [output, setOutput] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    async function run() {
      await wait(startDelay)
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return
        const line = lines[i]
        for (let c = 1; c <= line.length; c++) {
          if (cancelled) return
          await wait(speed)
          setOutput((prev) => {
            const next = [...prev]
            next[i] = line.slice(0, c)
            return next
          })
        }
      }
      if (!cancelled) {
        setDone(true)
        onDone?.()
      }
    }

    function wait(ms: number) {
      return new Promise<void>((resolve) => {
        const t = setTimeout(resolve, ms)
        timers.push(t)
      })
    }

    run()

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { output, done }
}
