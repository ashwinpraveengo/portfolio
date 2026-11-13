import { useEffect, useLayoutEffect } from 'react'

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

// ── Lenis instance store ────────────────────────────────────────────────────
// A single smooth-scroll instance shared by the nav, marquee and preloader.
let lenisInstance = null

export const setLenis = lenis => {
  lenisInstance = lenis
}

export const getLenis = () => lenisInstance

/**
 * Scroll to an in-page anchor, using Lenis when it's running.
 * @param {string} hash - e.g. '#projects'
 */
export const scrollToHash = hash => {
  const target = hash === '#home' ? 0 : document.querySelector(hash)
  if (target === null) return
  if (lenisInstance) {
    lenisInstance.start()
    lenisInstance.scrollTo(target, { duration: 1.6, force: true })
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
