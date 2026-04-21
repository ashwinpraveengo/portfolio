import { portfolioConfig } from '@/data/portfolio.config'
import { SectionLabel } from './SectionLabel'

const cardStyle = {
  background: 'rgba(13,21,37,0.7)',
  border: '1px solid rgba(0,229,160,0.08)',
  borderRadius: '12px',
  padding: '1.5rem',
  backdropFilter: 'blur(10px)',
}

export default function Experience() {
  const { experience } = portfolioConfig

  return (
    <section
      id="experience"
      style={{
        padding: '6rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <SectionLabel>Experience</SectionLabel>
      <div
        style={{
          marginTop: '3rem',
          position: 'relative',
        }}
      >
        {/* Timeline line */}
        <div
          style={{
            position: 'absolute',
            left: '0',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'linear-gradient(var(--accent), transparent)',
            marginLeft: '7px',
          }}
        />

        {experience.map((exp, i) => (
          <div
            key={i}
            style={{
              paddingLeft: '3rem',
              marginBottom: '3rem',
              position: 'relative',
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '6px',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                border: `2px solid ${exp.color}`,
                background: 'var(--bg)',
                boxShadow: `0 0 10px ${exp.color}60`,
              }}
            />

            <div style={cardStyle}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 500,
                      color: 'var(--text)',
                      marginBottom: '2px',
                    }}
                  >
                    {exp.role}
                  </h3>
                  <div
                    style={{
                      fontFamily: "'Space Mono'",
                      fontSize: '12px',
                      color: exp.color,
                    }}
                  >
                    {exp.company}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontFamily: "'Space Mono'",
                      fontSize: '11px',
                      color: 'var(--muted)',
                    }}
                  >
                    {exp.period}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {exp.type}
                  </div>
                </div>
              </div>
              <ul
                style={{
                  paddingLeft: '1rem',
                  color: 'var(--muted)',
                  fontSize: '15px',
                }}
              >
                {exp.points.map((pt, j) => (
                  <li key={j} style={{ marginBottom: '6px' }}>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
