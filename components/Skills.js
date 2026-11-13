import { useMemo } from 'react'
import { portfolioConfig } from '@/data/portfolio.config'
import SectionHeading from './ui/SectionHeading'
import SkillGlobe from './SkillGlobe'
import styles from './Skills.module.css'

export default function Skills() {
  const { skills, headings } = portfolioConfig
  const all = useMemo(() => skills.flatMap(s => s.items), [skills])

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading index="02" label="Skills" title={headings.skills} />

        <div className={styles.grid}>
          <div className={styles.list}>
            {skills.map((group, i) => (
              <div key={group.category} className={styles.row} data-reveal>
                <div className={styles.rowHead}>
                  <span className={styles.rowIndex}>0{i + 1}</span>
                  <h3 className={styles.rowTitle}>{group.category}</h3>
                  <span className={styles.rowCount}>{group.items.length}</span>
                </div>
                <div className={styles.chips}>
                  {group.items.map(skill => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.globeCol} data-reveal>
            <div className={styles.globe}>
              <SkillGlobe skills={all} />
            </div>
            <p className={styles.hint}>
              <span className={styles.hintDot} /> Drag to spin · {all.length} technologies
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
