import { useState, useEffect } from 'react'
import { portfolioConfig } from '@/data/portfolio.config'

export default function Navbar({ isDark, setIsDark }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = ['About', 'Experience', 'Projects', 'Achievements', 'Contact']

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0 2rem',
      background: scrolled ? 'rgba(6,12,22,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,229,160,0.08)' : 'none',
      transition: 'all 0.4s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
    }}>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '13px',
          color: 'var(--accent)',
          letterSpacing: '0.05em',
        }}
      >
        {'<ashwin />'}
      </span>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {navItems.map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              color: 'var(--muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.target.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.target.style.color = 'var(--muted)')}
          >
            {item}
          </a>
        ))}

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            background: 'transparent',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            width: '32px',
            height: '32px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'var(--accent)'
            e.target.style.color = '#000'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent'
            e.target.style.color = 'var(--accent)'
          }}
          title={isDark ? 'Light Mode' : 'Dark Mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <a
          href={`mailto:${portfolioConfig.personal.email}`}
          style={{
            padding: '6px 16px',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            borderRadius: '4px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            transition: 'all 0.2s',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'var(--accent)'
            e.target.style.color = '#000'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent'
            e.target.style.color = 'var(--accent)'
          }}
        >
          Hire Me
        </a>
      </div>
    </nav>
  )
}
