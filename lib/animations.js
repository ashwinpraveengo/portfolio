import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Page-wide scroll animations driven by data attributes:
 *   data-reveal         fade + rise when scrolled into view
 *   data-split          masked character reveal (use with <SplitText>)
 *   data-speed="0.2"    parallax drift while the element crosses the viewport
 *
 * Call after all sections have mounted so trigger positions account for
 * pinned sections. Returns a cleanup function.
 */
export function initScrollAnimations() {
  if (prefersReducedMotion()) return () => {}

  const ctx = gsap.context(() => {
    gsap.set('[data-reveal]', { opacity: 0, y: 56 })
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 90%',
      once: true,
      onEnter: batch =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.1,
          overwrite: true,
        }),
    })

    gsap.utils.toArray('[data-split]').forEach(el => {
      gsap.from(el.querySelectorAll('.split-char-inner'), {
        yPercent: 120,
        rotate: 6,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.018,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    gsap.utils.toArray('[data-speed]').forEach(el => {
      gsap.to(el, {
        yPercent: -100 * parseFloat(el.dataset.speed),
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  })

  return () => ctx.revert()
}

/**
 * Spotlight glow that follows the pointer across every [data-spotlight] card.
 */
export function initSpotlight() {
  let frame = 0
  const onMove = e => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      document.querySelectorAll('[data-spotlight]').forEach(el => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    })
  }
  window.addEventListener('pointermove', onMove, { passive: true })
  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('pointermove', onMove)
  }
}
