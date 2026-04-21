import { portfolioConfig } from '@/data/portfolio.config'
import { SectionLabel } from './SectionLabel'

const btnPrimary = {
  display: 'inline-block',
  padding: '14px 32px',
  background: 'var(--accent)',
  color: '#000',
  borderRadius: '6px',
  fontWeight: 600,
  fontSize: '14px',
  letterSpacing: '0.03em',
  transition: 'transform 0.2s, box-shadow 0.2s',
  textDecoration: 'none',
  cursor: 'pointer',
  border: 'none',
}

const btnSecondary = {
  display: 'inline-block',
  padding: '14px 32px',
  background: 'transparent',
  color: 'var(--text)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '6px',
  fontSize: '14px',
  letterSpacing: '0.03em',
  transition: 'border-color 0.2s',
  textDecoration: 'none',
  cursor: 'pointer',
}

export default function Contact() {
  const { personal, links, contact } = portfolioConfig

  return (
    <section
      id="contact"
      style={{
        padding: '8rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(0,229,160,0.04) 0%, transparent 70%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionLabel centered>Let&apos;s Work Together</SectionLabel>
        <h2
          style={{
            fontFamily: "'Bebas Neue'",
            fontSize: 'clamp(48px, 8vw, 100px)',
            lineHeight: 0.95,
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <span style={{ color: 'var(--text)' }}>{contact.heading}</span>
          <br />
          <span
            style={{
              WebkitTextStroke: '1px var(--accent)',
              color: 'transparent',
            }}
          >
            {contact.headingHighlight}
          </span>
        </h2>
        <p
          style={{
            color: 'var(--muted)',
            fontSize: '17px',
            maxWidth: '480px',
            margin: '0 auto 3rem',
          }}
        >
          {contact.message}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          <a href={`mailto:${personal.email}`} style={btnPrimary}>
            {personal.email}
          </a>
          <a href={`tel:${personal.phone}`} style={btnSecondary}>
            {personal.phone}
          </a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {[
            { label: 'LinkedIn', href: links.linkedin },
            { label: 'GitHub', href: links.github },
            { label: 'GitLab', href: links.gitlab },
          ].map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Space Mono'",
                fontSize: '12px',
                color: 'var(--muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.target.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.target.style.color = 'var(--muted)')}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
