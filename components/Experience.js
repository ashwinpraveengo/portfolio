import { useEffect, useRef } from 'react'
import { portfolioConfig } from '@/data/portfolio.config'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'
import { useTilt } from '@/lib/hooks'
import SectionHeading from './ui/SectionHeading'
import styles from './Experience.module.css'

function ExperienceCard({ exp, index }) {
  const card = useRef(null)
  useTilt(card, 4)

  return (
    <div className={`card tilt ${styles.card}`} ref={card} data-spotlight style={{ '--c': exp.color }}>
      <span className="tilt-glare" />
      <div className={styles.cardTop}>
        <span className={styles.bigIndex}>0{index + 1}</span>
        <span className={styles.type}>{exp.type}</span>
      </div>
      <h3 className={styles.role}>{exp.role}</h3>
      <div className={styles.company}>
        <span className={styles.companyDot} />
        {exp.company}
      </div>
      <ul className={styles.points}>
        {exp.points.map((pt, j) => (
          <li key={j}>{pt}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Experience() {
  const { experience, headings } = portfolioConfig
  const root = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.lineFill}`,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: `.${styles.timeline}`, start: 'top 65%', end: 'bottom 65%', scrub: 0.5 },
        },
      )
      gsap.utils.toArray(`.${styles.item}`).forEach(item => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 65%',
          toggleClass: { targets: item, className: styles.lit },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="section" ref={root}>
      <div className="container">
        <SectionHeading index="03" label="Experience" title={headings.experience} />

        <div className={styles.timeline}>
          <div className={styles.line} aria-hidden="true">
            <div className={styles.lineFill} />
          </div>

          {experience.map((exp, i) => (
            <article key={exp.company} className={styles.item} style={{ '--c': exp.color }}>
              <div className={styles.when} data-reveal>
                <span className={styles.period}>{exp.period}</span>
                <span className={styles.companySmall}>{exp.company}</span>
              </div>
              <div className={styles.node} aria-hidden="true">
                <span />
              </div>
              <div data-reveal>
                <ExperienceCard exp={exp} index={i} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
