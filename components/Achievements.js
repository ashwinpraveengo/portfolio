import { portfolioConfig } from '@/data/portfolio.config'
import { SectionLabel } from './SectionLabel'

const cardStyle = {
  background: 'rgba(13,21,37,0.7)',
  border: '1px solid rgba(0,229,160,0.08)',
  borderRadius: '12px',
  padding: '1.5rem',
  backdropFilter: 'blur(10px)',
}

const tagStyle = {
  display: 'inline-block',
  padding: '3px 12px',
  borderRadius: '100px',
  border: '1px solid',
  fontSize: '11px',
  fontFamily: "'Space Mono', monospace",
  letterSpacing: '0.05em',
}

export default function Achievements() {
  const { achievements, organizations } = portfolioConfig

  return (
    <section
      id="achievements"
      style={{
        padding: '6rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <SectionLabel>Achievements & Orgs</SectionLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}
      >
        {achievements.map((a, i) => (
          <div
            key={i}
            style={{
              ...cardStyle,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <div style={{ fontSize: '28px', flexShrink: 0 }}>{a.icon}</div>
            <div>
              <div
                style={{
                  fontFamily: "'Bebas Neue'",
                  fontSize: '22px',
                  color: 'var(--accent)',
                  lineHeight: 1,
                }}
              >
                {a.title}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 500, marginTop: '2px', marginBottom: '4px' }}>
                {a.event}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                {a.project}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Organizations */}
      {organizations.map((org, i) => (
        <div key={i} style={{ ...cardStyle, marginTop: '1.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '0.75rem',
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue'",
                fontSize: '28px',
                color: 'var(--accent2)',
              }}
            >
              {org.name}
            </div>
            <span
              style={{
                ...tagStyle,
                borderColor: 'rgba(0,184,255,0.3)',
                color: 'var(--accent2)',
                background: 'rgba(0,184,255,0.08)',
              }}
            >
              {org.role}
            </span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
            {org.desc}
          </p>
        </div>
      ))}
    </section>
  )
}
