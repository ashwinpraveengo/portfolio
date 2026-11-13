import { useEffect, useRef } from 'react'
import { portfolioConfig } from '@/data/portfolio.config'
import { scrollToHash } from '@/lib/motion'
import { useMagnetic } from '@/lib/hooks'
import SplitText from './ui/SplitText'
import LocalTime from './ui/LocalTime'
import Icon from './ui/Icons'
import styles from './Footer.module.css'

export default function Footer() {
  const { personal, links } = portfolioConfig
  const giant = useRef(null)
  const topBtn = useRef(null)
  useMagnetic(topBtn, 0.4)

  // Size the giant name so it spans the full container width
  useEffect(() => {
    const el = giant.current
    const fit = () => {
      el.style.fontSize = '100px'
      const ratio = el.parentElement.clientWidth / el.scrollWidth
      el.style.fontSize = `${Math.floor(100 * ratio * 0.98)}px`
    }
    const ro = new ResizeObserver(fit)
    ro.observe(el.parentElement)
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [])

  const giantName = personal.displayName.join(' ').replace(/^G O /, '')

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.status}>
            <span className={styles.pulse} />
            {personal.availability}
          </div>
          <div className={styles.time}>
            {personal.location} · <LocalTime seconds />
          </div>
          <button
            ref={topBtn}
            className={styles.toTop}
            onClick={() => scrollToHash('#home')}
            aria-label="Back to top"
          >
            <Icon name="arrowUp" size={20} />
          </button>
        </div>

        <div className={styles.giantWrap}>
          <SplitText text={giantName} className={styles.giant} ref={giant} data-split />
        </div>

        <div className={styles.bottom}>
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {personal.name}
          </span>
          <span>Designed &amp; built by {personal.name}</span>
          <div className={styles.links}>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={links.gitlab} target="_blank" rel="noopener noreferrer">
              GitLab
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
