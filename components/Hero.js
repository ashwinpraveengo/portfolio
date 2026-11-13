import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { portfolioConfig } from '@/data/portfolio.config'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion, useIsomorphicLayoutEffect } from '@/lib/motion'
import SplitText from './ui/SplitText'
import ScrambleText from './ui/ScrambleText'
import MagneticButton from './ui/MagneticButton'
import CountUp from './ui/CountUp'
import LocalTime from './ui/LocalTime'
import styles from './Hero.module.css'

const HeroScene = dynamic(() => import('./three/HeroScene'), { ssr: false })

export default function Hero({ ready, isDark }) {
  const { personal, stats } = portfolioConfig
  const root = useRef(null)
  const progress = useRef(0)

  // Hold everything hidden until the preloader hands over
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.set('.split-char-inner', { yPercent: 120 })
      gsap.set('[data-hero-fade]', { opacity: 0, y: 30 })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.1 })
        .to('.split-char-inner', { yPercent: 0, duration: 1.6, ease: 'expo.out', stagger: 0.045 })
        .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.09 }, 0.35)
    }, root)
    return () => ctx.revert()
  }, [ready])

  // Scroll-out: name lines drift apart, content fades, 3D scene reads progress
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
      gsap.to(`.${styles.lineA}`, { xPercent: -14, ease: 'none', scrollTrigger })
      gsap.to(`.${styles.lineB}`, { xPercent: 14, ease: 'none', scrollTrigger })
      gsap.to(`.${styles.content}`, { opacity: 0, y: -80, ease: 'none', scrollTrigger: { ...scrollTrigger, end: '80% top' } })
      gsap.to(progress, {
        current: 1,
        ease: 'none',
        scrollTrigger,
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const [lineA, lineB] = personal.displayName

  return (
    <section id="home" className={styles.hero} ref={root}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.grid} />
        <div className={styles.glowA} />
        <div className={styles.glowB} />
      </div>

      <div className={styles.scene}>
        <HeroScene isDark={isDark} ready={ready} progressRef={progress} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.pill} data-hero-fade>
          <span className={styles.pulse} />
          {personal.availability}
        </div>

        <h1 className={styles.name} aria-label={personal.name}>
          <SplitText text={lineA} className={`${styles.line} ${styles.lineA}`} />
          <SplitText text={lineB} className={`${styles.line} ${styles.lineB} ${styles.outline}`} />
        </h1>

        <div className={styles.lower}>
          <div className={styles.intro} data-hero-fade>
            <p className={styles.role}>
              <span className={styles.roleTitle}>{personal.title}</span>
              <span className={styles.build}>
                I build <ScrambleText words={personal.roles} start={ready} className={styles.scramble} />
              </span>
            </p>
            <p className={styles.subtitle}>{personal.subtitle}</p>
          </div>

          <div className={styles.ctas} data-hero-fade>
            <MagneticButton href="#projects">View Projects</MagneticButton>
            <MagneticButton href="#contact" variant="ghost" arrow={false}>
              Get In Touch
            </MagneticButton>
          </div>
        </div>

        <div className={styles.bottom}>
          <dl className={styles.stats}>
            {stats.map(s => (
              <div key={s.label} className={styles.stat} data-hero-fade>
                <dt className={styles.statLabel}>{s.label}</dt>
                <dd className={styles.statNum}>
                  <CountUp value={s.num} play={ready} duration={2.4} />
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.side} data-hero-fade>
            <span className={styles.local}>
              {personal.location} · <LocalTime />
            </span>
            <a href="#about" className={styles.scrollHint} aria-label="Scroll to about">
              <span>Scroll</span>
              <span className={styles.scrollTrack}>
                <span className={styles.scrollThumb} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
