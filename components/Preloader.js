import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import { portfolioConfig } from '@/data/portfolio.config'
import SplitText from './ui/SplitText'
import styles from './Preloader.module.css'

const STRIPS = 5

export default function Preloader({ onComplete }) {
  const root = useRef(null)
  const count = useRef(null)
  const done = useRef(onComplete)
  done.current = onComplete

  useEffect(() => {
    const reduce = prefersReducedMotion()
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve()
    const counter = { v: 0 }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      if (reduce) tl.timeScale(4)

      tl.to(counter, {
        v: 100,
        duration: reduce ? 0.3 : 2.4,
        ease: 'power3.inOut',
        onUpdate: () => {
          count.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
        },
      })
        .to(`.${styles.bar}`, { scaleX: 1, duration: reduce ? 0.3 : 2.4, ease: 'power3.inOut' }, 0)
        .from(
          `.${styles.name} .split-char-inner`,
          { yPercent: 120, duration: 1.2, ease: 'expo.out', stagger: 0.035 },
          0.15,
        )
        .from(`.${styles.meta}`, { opacity: 0, y: 12, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, 0.3)
        // Hold here until web fonts are in, so the hero never reflows mid-intro
        .addPause('+=0', () => fontsReady.then(() => tl.play()))
        .to(`.${styles.content}`, { yPercent: -12, opacity: 0, duration: 0.7, ease: 'power3.in' })
        .to(
          `.${styles.strip}`,
          { yPercent: -100, duration: 1.1, ease: 'expo.inOut', stagger: 0.07 },
          '-=0.25',
        )
        .add(() => done.current?.(), '-=0.85')
        .set(root.current, { display: 'none' })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.preloader} ref={root} aria-hidden="true" data-preloader>
      <div className={styles.strips}>
        {Array.from({ length: STRIPS }, (_, i) => (
          <span key={i} className={styles.strip} />
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.meta} suppressHydrationWarning>
            Portfolio ©{new Date().getFullYear()}
          </span>
          <span className={styles.meta}>{portfolioConfig.personal.title}</span>
        </div>

        <SplitText as="div" text={portfolioConfig.personal.name} className={styles.name} />

        <div className={styles.bottom}>
          <span className={styles.meta}>Loading experience</span>
          <span className={styles.count} ref={count}>
            000
          </span>
        </div>
        <span className={styles.bar} />
      </div>
    </div>
  )
}
