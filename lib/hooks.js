import { useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { canHover, prefersReducedMotion } from '@/lib/motion'

/**
 * Pulls an element toward the pointer while hovered, then springs it back.
 */
export function useMagnetic(ref, strength = 0.35) {
  useEffect(() => {
    const el = ref.current
    if (!el || !canHover() || prefersReducedMotion()) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' })

    const onMove = e => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [ref, strength])
}

/**
 * 3D tilt toward the pointer. Writes --rx/--ry (rotation) and --px/--py
 * (pointer position, for glare) as CSS variables; the `.tilt` class in
 * globals.css turns them into a transform.
 */
export function useTilt(ref, max = 8) {
  useEffect(() => {
    const el = ref.current
    if (!el || !canHover() || prefersReducedMotion()) return

    let frame = 0
    const onMove = e => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
        el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
        el.style.setProperty('--px', `${px * 100}%`)
        el.style.setProperty('--py', `${py * 100}%`)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [ref, max])
}
