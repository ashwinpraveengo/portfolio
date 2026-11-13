import { useRef, useState } from 'react'
import { portfolioConfig } from '@/data/portfolio.config'
import { useMagnetic } from '@/lib/hooks'
import SectionHeading from './ui/SectionHeading'
import SplitText from './ui/SplitText'
import Icon from './ui/Icons'
import styles from './Contact.module.css'

function TalkButton({ href }) {
  const ref = useRef(null)
  useMagnetic(ref, 0.45)
  return (
    <a ref={ref} href={href} className={styles.talk} data-cursor>
      <span className={styles.talkFill} aria-hidden="true" />
      <span className={styles.talkLabel}>
        Let&apos;s talk
        <Icon name="arrowUpRight" size={22} />
      </span>
    </a>
  )
}

export default function Contact() {
  const { personal, links, contact } = portfolioConfig
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${personal.email}`
    }
  }

  const socials = [
    { label: 'LinkedIn', icon: 'linkedin', href: links.linkedin },
    { label: 'GitHub', icon: 'github', href: links.github },
    { label: 'GitLab', icon: 'gitlab', href: links.gitlab },
  ]

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className={styles.aurora} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="container">
        <SectionHeading index="07" label="Contact" />

        <h2 className={styles.heading}>
          <SplitText text={contact.heading} className={styles.line} data-split />
          <SplitText text={contact.headingHighlight} className={`${styles.line} ${styles.outline}`} data-split />
        </h2>

        <div className={styles.row}>
          <p className={styles.message} data-reveal>
            {contact.message}
          </p>
          <div data-reveal>
            <TalkButton href={`mailto:${personal.email}`} />
          </div>
        </div>

        <div className={styles.channels}>
          <button type="button" className={styles.channel} onClick={copyEmail} data-reveal>
            <span className={styles.channelLabel}>
              <Icon name="mail" size={16} /> Email
            </span>
            <span className={styles.channelValue}>{personal.email}</span>
            <span className={styles.channelAction} data-copied={copied}>
              <Icon name={copied ? 'check' : 'copy'} size={16} />
              {copied ? 'Copied' : 'Copy'}
            </span>
          </button>

          <a href={`tel:${personal.phone}`} className={styles.channel} data-reveal>
            <span className={styles.channelLabel}>
              <Icon name="phone" size={16} /> Phone
            </span>
            <span className={styles.channelValue}>+91 {personal.phone}</span>
            <span className={styles.channelAction}>
              <Icon name="arrowUpRight" size={16} /> Call
            </span>
          </a>

          <div className={styles.socials} data-reveal>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.social}>
                <Icon name={s.icon} size={20} />
                <span>{s.label}</span>
                <Icon name="arrowUpRight" size={16} className={styles.socialArrow} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
