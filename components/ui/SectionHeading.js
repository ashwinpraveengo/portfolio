import SplitText from './SplitText'
import styles from './SectionHeading.module.css'

export default function SectionHeading({ index, label, title, children }) {
  return (
    <div className={styles.head}>
      <div className={styles.meta} data-reveal>
        <span className={styles.index}>{index}</span>
        <span className={styles.rule} />
        <span className={styles.label}>{label}</span>
      </div>
      {title && <SplitText as="h2" text={title} className={styles.title} data-split />}
      {children}
    </div>
  )
}
