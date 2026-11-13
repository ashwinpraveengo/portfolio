import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { getLenis, prefersReducedMotion } from '@/lib/motion'
import { portfolioConfig } from '@/data/portfolio.config'
import styles from './Marquee.module.css'

/**
 * One infinitely scrolling band. Speeds up and skews with scroll velocity,
 * and flips direction when the page scroll direction flips.
 */
function Band({ items, reverse, variant }) {
  const track = useRef(null)

  useEffect(() => {
    const el = track.current
    if (prefersReducedMotion()) return

    let x = 0
    let skew = 0
    let direction = reverse ? 1 : -1
    let visible = true
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(el)

    const tick = (_, delta) => {
      if (!visible) return
      const velocity = getLenis()?.velocity ?? 0
      if (Math.abs(velocity) > 0.5) direction = Math.sign(velocity) * (reverse ? 1 : -1)
      const speed = (0.035 + Math.min(Math.abs(velocity), 60) * 0.006) * (delta / 16.7)
      x += speed * direction
      if (x <= -50) x += 50
      if (x > 0) x -= 50
      skew += (gsap.utils.clamp(-8, 8, velocity * 0.25) - skew) * 0.1
      el.style.transform = `translate3d(${x}%, 0, 0) skewX(${-skew}deg)`
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      io.disconnect()
    }
  }, [reverse])

  // Rendered twice so the -50% wrap is seamless
  const run = [...items, ...items]
  return (
    <div className={`${styles.band} ${styles[variant]}`}>
      <div className={styles.track} ref={track}>
        {[0, 1].map(copy => (
          <div className={styles.group} key={copy}>
            {run.map((item, i) => (
              <span className={styles.item} key={i}>
                {item}
                <span className={styles.star}>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  const { skills, marquee } = portfolioConfig
  const tech = skills.flatMap(s => s.items)

  return (
    <div className={styles.marquee} aria-hidden="true">
      <Band items={marquee} variant="solid" />
      <Band items={tech} variant="outline" reverse />
    </div>
  )
}
