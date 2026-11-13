import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    const tween = gsap.to(bar.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return <div className="scroll-progress" ref={bar} aria-hidden="true" />
}
