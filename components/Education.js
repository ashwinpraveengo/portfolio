import { portfolioConfig } from '@/data/portfolio.config'
import { SectionLabel } from './SectionLabel'

const cardStyle = {
  background: 'rgba(13,21,37,0.7)',
  border: '1px solid rgba(0,229,160,0.08)',
  borderRadius: '12px',
  padding: '1.5rem',
  backdropFilter: 'blur(10px)',
}

export default function Education() {
  const { education } = portfolioConfig

  return (
    <section
      style={{
        padding: '6rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <SectionLabel>Education</SectionLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}
      >
        {education.map((e, i) => (
          <div key={i} style={cardStyle}>
            <div
              style={{
                fontFamily: "'Bebas Neue'",
                fontSize: '32px',
                color: 'var(--accent)',
                lineHeight: 1,
                marginBottom: '4px',
              }}
            >
              {e.score}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>
              {e.inst}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
              {e.degree}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: "'Space Mono'",
                fontSize: '11px',
                color: 'var(--muted)',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: '10px',
              }}
            >
              <span>{e.loc}</span>
              <span>{e.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
