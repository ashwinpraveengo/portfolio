import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { getLenis, prefersReducedMotion, setLenis } from '@/lib/motion'

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in
 * sync. Scrolling is locked until `enabled` is true (i.e. after the preloader).
 */
export function useSmoothScroll(enabled) {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({ lerp: 0.09, anchors: true, autoRaf: false })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const tick = time => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('is-loading', !enabled)
    const lenis = getLenis()
    if (enabled) {
      lenis?.start()
      ScrollTrigger.refresh()
    } else {
      window.scrollTo(0, 0)
      lenis?.stop()
    }
  }, [enabled])
}
