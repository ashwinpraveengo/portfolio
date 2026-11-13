import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Counts the first number inside `value` up from zero, keeping any prefix or
 * suffix ("CGPA 9.5 / 10", "4+", "95.6%"). Plays when scrolled into view, or
 * when `play` flips to true if that prop is given.
 */
export default function CountUp({ value, play, duration = 2, className }) {
  const ref = useRef(null)
  const text = String(value)
  const match = text.match(/\d+(?:\.\d+)?/)

  useEffect(() => {
    const el = ref.current
    if (!el || !match || prefersReducedMotion()) return

    const target = parseFloat(match[0])
    const decimals = (match[0].split('.')[1] || '').length
    const prefix = text.slice(0, match.index)
    const suffix = text.slice(match.index + match[0].length)
    const render = v => {
      el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`
    }
    const counter = { v: 0 }
    const tween = gsap.to(counter, {
      v: target,
      duration,
      ease: 'power3.out',
      paused: true,
      onUpdate: () => render(counter.v),
    })
    render(0)

    if (play === undefined) {
      const st = ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => tween.play() })
      return () => {
        st.kill()
        tween.kill()
      }
    }
    if (play) tween.play()
    return () => tween.kill()
  }, [text, play, duration])

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  )
}
