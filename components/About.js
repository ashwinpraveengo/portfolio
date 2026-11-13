import { useEffect, useRef } from 'react'
import { portfolioConfig } from '@/data/portfolio.config'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import { useTilt } from '@/lib/hooks'
import SectionHeading from './ui/SectionHeading'
import styles from './About.module.css'

function RotatingBadge({ text }) {
  const chars = [...text]
  return (
    <div className={styles.badge} aria-hidden="true">
      <svg viewBox="0 0 200 200" className={styles.badgeRing}>
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#badge-circle" textLength="488">
            {chars.join('')}
          </textPath>
        </text>
      </svg>
      <span className={styles.badgeCore}>✦</span>
    </div>
  )
}

export default function About() {
  const { personal, about, headings } = portfolioConfig
  const root = useRef(null)
  const card = useRef(null)
  useTilt(card, 9)

  const highlight = new Set(about.highlights.map(w => w.toLowerCase()))
  const words = personal.summary.split(' ')

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // Words light up as the paragraph scrolls through the viewport
      gsap.to(`.${styles.word}`, {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: `.${styles.manifesto}`,
          start: 'top 80%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      })

      // Photo: clip open, then slow parallax inside its frame
      gsap.fromTo(
        `.${styles.photoFrame}`,
        { clipPath: 'inset(100% 0% 0% 0% round 28px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 28px)',
          duration: 1.6,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: `.${styles.photoCol}`, start: 'top 80%', once: true },
        },
      )
      gsap.fromTo(
        `.${styles.photo}`,
        { yPercent: -8, scale: 1.25 },
        {
          yPercent: 8,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: { trigger: `.${styles.photoCol}`, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )

      gsap.from(`.${styles.gpaFill}`, {
        scaleX: 0,
        duration: 2,
        ease: 'expo.out',
        scrollTrigger: { trigger: `.${styles.gpa}`, start: 'top 90%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const gpa = parseFloat(personal.cgpa)

  return (
    <section id="about" className="section" ref={root}>
      <div className="container">
        <SectionHeading index="01" label="About" title={headings.about} />

        <div className={styles.grid}>
          <div className={styles.photoCol}>
            <div className={`${styles.photoCard} tilt`} ref={card} data-cursor>
              <div className={styles.photoFrame}>
                <img
                  src={personal.profilePhoto}
                  alt={personal.name}
                  className={styles.photo}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.holo} />
                <div className={styles.scan} />
              </div>
              <span className="tilt-glare" />
              <span className={`${styles.corner} ${styles.tl}`} />
              <span className={`${styles.corner} ${styles.tr}`} />
              <span className={`${styles.corner} ${styles.bl}`} />
              <span className={`${styles.corner} ${styles.br}`} />
              <div className={styles.photoMeta}>
                <span>{personal.name}</span>
                <span>{personal.location}</span>
              </div>
              <div className={styles.floatChip}>
                <strong>{personal.cgpa}</strong>
                <span>CGPA</span>
              </div>
            </div>
            <RotatingBadge text={about.badge} />
          </div>

          <div className={styles.textCol}>
            <p className={styles.manifesto} aria-label={personal.summary}>
              {words.map((w, i) => {
                const bare = w.replace(/[^\w-]/g, '').toLowerCase()
                return (
                  <span
                    key={i}
                    aria-hidden="true"
                    className={`${styles.word} ${highlight.has(bare) ? styles.hl : ''}`}
                  >
                    {w}{' '}
                  </span>
                )
              })}
            </p>

            <dl className={styles.facts}>
              {about.facts.map(f => (
                <div key={f.label} className={styles.fact} data-reveal>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className={styles.gpa} data-reveal>
              <div className={styles.gpaHead}>
                <span>Academic performance</span>
                <span className={styles.gpaValue}>{personal.cgpa} / 10</span>
              </div>
              <div className={styles.gpaTrack}>
                <div className={styles.gpaFill} style={{ width: `${(gpa / 10) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
