import { useState } from 'react'
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

const tagStyle = {
  display: 'inline-block',
  padding: '3px 12px',
  borderRadius: '100px',
  border: '1px solid',
  fontSize: '11px',
  fontFamily: "'Space Mono', monospace",
  letterSpacing: '0.05em',
}

export default function Projects() {
  const [hovered, setHovered] = useState(null)
  const { projects } = portfolioConfig

  return (
    <section
      id="projects"
      style={{
        padding: '6rem 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <SectionLabel>Projects</SectionLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}
      >
        {projects.map((proj, i) => (
          <a
            key={i}
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...cardStyle,
              borderColor: hovered === i ? proj.accent + '50' : 'rgba(0,229,160,0.08)',
              transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {/* Top */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  ...tagStyle,
                  borderColor: proj.accent + '40',
                  color: proj.accent,
                  background: proj.accent + '10',
                }}
              >
                {proj.tag}
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono'",
                  fontSize: '10px',
                  color: 'var(--muted)',
                }}
              >
                {proj.period}
              </span>
            </div>

            <h3
              style={{
                fontSize: '20px',
                fontWeight: 500,
                marginBottom: '0.5rem',
                color: 'var(--text)',
              }}
            >
              {proj.name}
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--muted)',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
              }}
            >
              {proj.desc}
            </p>

            {/* Tech */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
              {proj.tech.map(t => (
                <span key={t} style={{ ...skillChip, fontSize: '11px', padding: '3px 10px' }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Role */}
            <div
              style={{
                fontFamily: "'Space Mono'",
                fontSize: '11px',
                color: proj.accent,
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: '0.75rem',
              }}
            >
              ↗ {proj.role}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
