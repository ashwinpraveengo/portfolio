import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { canHover } from '@/lib/motion'

/**
 * Dot + trailing ring cursor for fine pointers. Grows over links/buttons and
 * shows a label for elements with data-cursor-label (e.g. project cards).
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const ring = useRef(null)
  const dot = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    setEnabled(canHover())
  }, [])

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-cursor')

    gsap.set([ring.current, dot.current], { xPercent: -50, yPercent: -50, x: -100, y: -100 })
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3.out' })
    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power2.out' })

    const onMove = e => {
      ringX(e.clientX)
      ringY(e.clientY)
      dotX(e.clientX)
      dotY(e.clientY)
      ring.current.dataset.hidden = 'false'
    }
    const onOver = e => {
      const target = e.target.closest('a, button, [data-cursor-label], [data-cursor]')
      const text = target?.dataset.cursorLabel
      ring.current.dataset.state = target ? (text ? 'label' : 'hover') : ''
      label.current.textContent = text || ''
    }
    const onLeave = () => {
      ring.current.dataset.hidden = 'true'
    }
    const onDown = () => gsap.to(ring.current, { scale: 0.8, duration: 0.2 })
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.4, ease: 'back.out(3)' })

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div className="cursor-ring" ref={ring} data-hidden="true" aria-hidden="true">
        <span ref={label} />
      </div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  )
}
