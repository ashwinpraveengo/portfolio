import { portfolioConfig } from '@/data/portfolio.config'
import SectionHeading from './ui/SectionHeading'
import CountUp from './ui/CountUp'
import styles from './Education.module.css'

// "CGPA 9.5 / 10" -> { value: '9.5', label: 'CGPA / 10' }; "95.6%" -> { value: '95.6%', label: 'Score' }
function splitScore(score) {
  const match = score.match(/\d+(?:\.\d+)?%?/)
  if (!match) return { value: score, label: '' }
  const label = score.replace(match[0], '').replace(/\s+/g, ' ').trim()
  return { value: match[0], label: label || 'Score' }
}

export default function Education() {
  const { education, headings } = portfolioConfig

  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeading index="06" label="Education" title={headings.education} />

        <div className={styles.rows}>
          {education.map(e => {
            const score = splitScore(e.score)
            return (
              <div key={e.degree} className={styles.row} data-reveal>
                <span className={styles.fill} aria-hidden="true" />
                <span className={styles.year}>{e.year}</span>
                <div className={styles.main}>
                  <h3 className={styles.inst}>{e.inst}</h3>
                  <p className={styles.degree}>{e.degree}</p>
                </div>
                <span className={styles.loc}>{e.loc}</span>
                <span className={styles.score}>
                  <CountUp value={score.value} className={styles.scoreValue} />
                  <span className={styles.scoreLabel}>{score.label}</span>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
