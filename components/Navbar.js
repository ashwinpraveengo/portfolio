import { useEffect, useRef, useState } from 'react'
import { navItems, portfolioConfig } from '@/data/portfolio.config'
import { gsap } from '@/lib/gsap'
import { getLenis, scrollToHash } from '@/lib/motion'
import { useMagnetic } from '@/lib/hooks'
import Icon from './ui/Icons'
import styles from './Navbar.module.css'

function ThemeToggle({ isDark, onToggle }) {
  const ref = useRef(null)
  useMagnetic(ref, 0.4)
  return (
    <button
      ref={ref}
      className={styles.toggle}
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className={styles.toggleIcon} data-dark={isDark}>
        <mask id="moon-mask">
          <rect width="24" height="24" fill="#fff" />
          <circle className={styles.moonCut} cx="24" cy="4" r="7" fill="#000" />
        </mask>
        <circle className={styles.sunCore} cx="12" cy="12" r="5" fill="currentColor" mask="url(#moon-mask)" />
        <g className={styles.rays} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M4.6 19.4 6 18M18 6l1.4-1.4" />
        </g>
      </svg>
    </button>
  )
}

export default function Navbar({ isDark, onToggleTheme }) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const linksRef = useRef(null)
  const indicator = useRef(null)
  const menuRef = useRef(null)
  const logoRef = useRef(null)
  useMagnetic(logoRef, 0.25)

  const items = navItems.map(label => ({ label, id: label.toLowerCase() }))
  const { personal, links } = portfolioConfig

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 400)
        lastY = y
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track which section is in the middle of the viewport
  useEffect(() => {
    const sections = items.map(i => document.getElementById(i.id)).filter(Boolean)
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach(s => io.observe(s))
    const home = document.getElementById('home')
    const homeIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(''), { rootMargin: '-45% 0px -50% 0px' })
    if (home) homeIo.observe(home)
    return () => {
      io.disconnect()
      homeIo.disconnect()
    }
  }, [])

  // Slide the pill behind the active link
  useEffect(() => {
    const el = linksRef.current?.querySelector(`[data-id="${active}"]`)
    const pill = indicator.current
    if (!pill) return
    if (!el) {
      pill.style.opacity = '0'
      return
    }
    pill.style.opacity = '1'
    pill.style.width = `${el.offsetWidth}px`
    pill.style.transform = `translateX(${el.offsetLeft}px)`
  }, [active])

  // Full-screen menu (mobile)
  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    if (!open || !menuRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('[data-menu-link]', { yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.25 })
      gsap.from('[data-menu-foot]', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.5 })
    }, menuRef)
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      ctx.revert()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (e, hash) => {
    e.preventDefault()
    setOpen(false)
    scrollToHash(hash)
  }

  return (
    <>
      <header
        className={styles.nav}
        data-hidden={hidden && !open}
        data-scrolled={scrolled}
      >
        <a href="#home" className={styles.logo} ref={logoRef} onClick={e => go(e, '#home')} aria-label="Back to top">
          <span className={styles.mark}>AP</span>
          <span className={styles.logoText}>
            <strong>{personal.name}</strong>
            <small>{personal.title}</small>
          </span>
        </a>

        <nav className={styles.links} ref={linksRef} aria-label="Primary">
          <span className={styles.indicator} ref={indicator} aria-hidden="true" />
          {items.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              data-id={id}
              className={styles.link}
              data-active={active === id}
              onClick={e => go(e, `#${id}`)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <a href={`mailto:${personal.email}`} className={styles.hire}>
            <span className={styles.hireDot} />
            Hire Me
          </a>
          <button
            className={styles.burger}
            data-open={open}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={styles.menu} data-open={open} ref={menuRef} aria-hidden={!open}>
        <nav className={styles.menuLinks}>
          {items.map(({ label, id }, i) => (
            <a key={id} href={`#${id}`} onClick={e => go(e, `#${id}`)} className={styles.menuLink} tabIndex={open ? 0 : -1}>
              <span data-menu-link>
                <small>0{i + 1}</small>
                {label}
              </span>
            </a>
          ))}
        </nav>
        <div className={styles.menuFoot} data-menu-foot>
          <a href={`mailto:${personal.email}`} tabIndex={open ? 0 : -1}>
            {personal.email}
          </a>
          <div className={styles.menuSocials}>
            {[
              ['linkedin', links.linkedin],
              ['github', links.github],
              ['gitlab', links.gitlab],
            ].map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} tabIndex={open ? 0 : -1}>
                <Icon name={name} size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
