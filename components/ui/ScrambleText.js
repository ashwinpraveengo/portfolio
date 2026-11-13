import { memo, useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const GLYPHS = '!<>-_\\/[]{}=+*^?#01'

/**
 * Cycles through `words`, decoding each one through random glyphs.
 * The visible span is aria-hidden; screen readers get the full list once.
 */
function ScrambleText({ words, interval = 2600, start = true, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !start || words.length < 2 || prefersReducedMotion()) return

    let index = 0
    let frame = 0
    let timer = 0

    const scrambleTo = target => {
      const from = el.textContent
      const length = Math.max(from.length, target.length)
      const queue = Array.from({ length }, (_, i) => {
        const begin = Math.floor(Math.random() * 18)
        return { from: from[i] || '', to: target[i] || '', begin, end: begin + 8 + Math.floor(Math.random() * 18) }
      })
      let tick = 0

      const update = () => {
        let out = ''
        let done = 0
        for (const q of queue) {
          if (tick >= q.end) {
            done++
            out += q.to
          } else if (tick >= q.begin) {
            if (!q.glyph || Math.random() < 0.3) q.glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            out += `<span class="scramble-glyph">${q.glyph}</span>`
          } else {
            out += q.from
          }
        }
        el.innerHTML = out
        if (done === queue.length) {
          timer = setTimeout(next, interval)
        } else {
          tick++
          frame = requestAnimationFrame(update)
        }
      }
      update()
    }

    const next = () => {
      index = (index + 1) % words.length
      scrambleTo(words[index])
    }

    timer = setTimeout(next, interval)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [words, interval, start])

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {words[0]}
      </span>
      <span className="sr-only">{words.join(', ')}</span>
    </span>
  )
}

export default memo(ScrambleText)
