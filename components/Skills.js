import { portfolioConfig } from '@/data/portfolio.config'
import { SectionLabel } from './SectionLabel'

const cardStyle = {
  background: 'rgba(13,21,37,0.7)',
  border: '1px solid rgba(0,229,160,0.08)',
  borderRadius: '12px',
  padding: '1.5rem',
  backdropFilter: 'blur(10px)',
}

const skillChip = {
  padding: '5px 14px',
  borderRadius: '100px',
  border: '1px solid rgba(0,229,160,0.15)',
  background: 'rgba(0,229,160,0.05)',
  color: 'var(--muted)',
  fontSize: '13px',
  fontFamily: "'Space Mono', monospace",
}

export default function Skills() {
  const { skills } = portfolioConfig

  return (
    <section
      style={{
        padding: '6rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <SectionLabel>Skills</SectionLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}
      >
        {skills.map(group => (
          <div key={group.category} style={cardStyle}>
            <div
              style={{
                fontFamily: "'Space Mono'",
                fontSize: '11px',
                color: 'var(--accent)',
                letterSpacing: '0.15em',
                marginBottom: '1.25rem',
              }}
            >
              {group.category.toUpperCase()}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {group.items.map(skill => (
                <span key={skill} style={skillChip}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
