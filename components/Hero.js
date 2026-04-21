import { portfolioConfig } from '@/data/portfolio.config'

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

export default function Hero() {
  const { personal, stats } = portfolioConfig

  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(0,229,160,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,160,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0,184,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '6rem',
          alignItems: 'center',
        }}
      >
        {/* Left: Text Content */}
        <div
          style={{
            paddingRight: '2rem',
          }}
        >
          {/* Status pill */}
          <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '100px',
            border: '1px solid rgba(0,229,160,0.2)',
            background: 'rgba(0,229,160,0.05)',
            marginBottom: '2rem',
            animation: 'fadeSlideUp 0.6s ease both',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'block',
              boxShadow: '0 0 8px var(--accent)',
            }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
              color: 'var(--accent)',
              letterSpacing: '0.1em',
            }}
          >
            OPEN TO OPPORTUNITIES · 2027 GRAD
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(64px, 10vw, 140px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
            animation: 'fadeSlideUp 0.7s 0.1s ease both',
          }}
        >
          <span style={{ color: 'var(--text)' }}>G O ASHWIN</span>
          <br />
          <span
            style={{
              WebkitTextStroke: '1px var(--accent)',
              color: 'transparent',
            }}
          >
            PRAVEEN
          </span>
        </h1>

        {/* Role */}
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(14px, 2vw, 18px)',
            color: 'var(--accent)',
            marginBottom: '1.5rem',
            animation: 'fadeSlideUp 0.7s 0.2s ease both',
          }}
        >
          {personal.title}
          <span style={{ color: 'var(--muted)', marginLeft: '1rem' }}>·</span>
          <span
            style={{
              color: 'var(--muted)',
              marginLeft: '1rem',
              fontStyle: 'italic',
            }}
          >
            {personal.subtitle}
          </span>
        </p>

        {/* Summary */}
        <p
          style={{
            maxWidth: '620px',
            color: 'var(--muted)',
            fontSize: '17px',
            lineHeight: 1.8,
            marginBottom: '3rem',
            animation: 'fadeSlideUp 0.7s 0.3s ease both',
          }}
        >
          {personal.summary}
        </p>

        {/* GPA Progress Bar */}
        <div
          style={{
            maxWidth: '400px',
            animation: 'fadeSlideUp 0.7s 0.35s ease both',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono'",
                fontSize: '11px',
                color: 'var(--muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              GPA Performance
            </span>
            <span
              style={{
                fontFamily: "'Bebas Neue'",
                fontSize: '20px',
                color: 'var(--accent)',
              }}
            >
              {personal.cgpa}/10
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(0,229,160,0.1)',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid rgba(0,229,160,0.2)',
            }}
          >
            <div
              style={{
                width: `${(parseFloat(personal.cgpa) / 10) * 100}%`,
                height: '100%',
                background: `linear-gradient(90deg, var(--accent), var(--accent2))`,
                borderRadius: '4px',
                transition: 'width 1s ease',
              }}
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            animation: 'fadeSlideUp 0.7s 0.4s ease both',
          }}
        >
          <a href="#projects" style={btnPrimary}>
            View Projects
          </a>
          <a href={`mailto:${personal.email}`} style={btnSecondary}>
            Get In Touch
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            marginTop: '5rem',
            flexWrap: 'wrap',
            animation: 'fadeSlideUp 0.7s 0.5s ease both',
          }}
        >
          {stats.map(s => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "'Bebas Neue'",
                  fontSize: '42px',
                  color: 'var(--accent)',
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono'",
                  fontSize: '10px',
                  color: 'var(--muted)',
                  letterSpacing: '0.12em',
                  marginTop: '4px',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
        </div>

        {/* Right: Profile Photo */}
        {personal.profilePhoto && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'fadeSlideUp 0.7s 0.3s ease both',
            }}
          >
            <img
              src={personal.profilePhoto}
              alt={personal.name}
              style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '16px',
                border: '2px solid var(--accent)',
                boxShadow: '0 0 40px rgba(0, 229, 160, 0.2)',
                objectFit: 'cover',
                aspectRatio: '1',
              }}
            />
          </div>
        )}
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'bounce 2s infinite',
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono'",
            fontSize: '10px',
            color: 'var(--muted)',
            letterSpacing: '0.2em',
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(var(--accent), transparent)',
          }}
        />
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(8px);
          }
        }
      `}</style>
    </section>
  )
}
