import { useRef } from 'react'
import { portfolioConfig } from '@/data/portfolio.config'
import { useTilt } from '@/lib/hooks'
import SectionHeading from './ui/SectionHeading'
import Icon from './ui/Icons'
import styles from './Achievements.module.css'

function AchievementCard({ item, index }) {
  const card = useRef(null)
  useTilt(card, 10)

  return (
    <div data-reveal>
      <div
        ref={card}
        className={`card tilt ${styles.card} ${index === 0 ? styles.featured : ''}`}
        data-spotlight
      >
        <span className="tilt-glare" />
        <div className={styles.top}>
          <span className={styles.iconTile}>
            <Icon name={item.icon} size={30} />
          </span>
          <span className={styles.rank}>0{index + 1}</span>
        </div>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.event}>{item.event}</div>
        <div className={styles.project}>
          <span className={styles.projectLine} />
          {item.project}
        </div>
      </div>
    </div>
  )
}

export default function Achievements() {
  const { achievements, organizations, headings } = portfolioConfig

  return (
    <section id="achievements" className="section">
      <div className="container">
        <SectionHeading index="05" label="Achievements" title={headings.achievements} />

        <div className={styles.grid}>
          {achievements.map((a, i) => (
            <AchievementCard key={a.event} item={a} index={i} />
          ))}
        </div>

        {organizations.map(org => (
          <div key={org.name} className={`card ${styles.org}`} data-spotlight data-reveal>
            <span className={styles.orgGhost} aria-hidden="true">
              {org.name}
            </span>
            <div className={styles.orgHead}>
              <span className={styles.orgIcon}>
                <Icon name="code" size={26} />
              </span>
              <div>
                <h3 className={styles.orgName}>{org.name}</h3>
                <span className={styles.orgRole}>{org.role}</span>
              </div>
            </div>
            <p className={styles.orgDesc}>{org.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
