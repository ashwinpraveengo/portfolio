import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import Head from 'next/head'
import { portfolioConfig } from '@/data/portfolio.config'
import { applyTheme, getStoredTheme, saveTheme } from '@/lib/themes'
import { prefersReducedMotion } from '@/lib/motion'
import { initScrollAnimations, initSpotlight } from '@/lib/animations'
import { useSmoothScroll } from '@/lib/useSmoothScroll'
import Preloader from '@/components/Preloader'
import Cursor from '@/components/Cursor'
import ScrollProgress from '@/components/ScrollProgress'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Marquee from '@/components/Marquee'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Achievements from '@/components/Achievements'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'


// ────────────────────────────────────────────────────────────────────────────
// Main Page Component
// ────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const { personal, sections } = portfolioConfig
  const [isDark, setIsDark] = useState(true)
  const [ready, setReady] = useState(!sections.preloader)

  useSmoothScroll(ready)

  // Initialize theme on mount (the boot script in _document already applied it)
  useEffect(() => {
    setIsDark(getStoredTheme() === 'dark')
  }, [])

  // Section effects run before this one, so pinned sections already exist
  // when the page-wide reveals measure their positions.
  useEffect(() => {
    const cleanups = [initScrollAnimations(), initSpotlight()]
    return () => cleanups.forEach(fn => fn())
  }, [])

  // Theme switch expands as a circle from the toggle button
  const toggleTheme = useCallback(
    e => {
      const next = isDark ? 'light' : 'dark'
      const apply = () => {
        applyTheme(next)
        saveTheme(next)
        flushSync(() => setIsDark(!isDark))
      }
      if (!document.startViewTransition || prefersReducedMotion()) {
        apply()
        return
      }
      const x = e?.clientX ?? window.innerWidth
      const y = e?.clientY ?? 0
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      const transition = document.startViewTransition(apply)
      transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 800, easing: 'cubic-bezier(0.7, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
    },
    [isDark],
  )

  const onLoaded = useCallback(() => setReady(true), [])

  return (
    <>
      <Head>
        <title>{`${personal.name} · ${personal.title}`}</title>
        <meta name="description" content={personal.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta property="og:title" content={`${personal.name} · ${personal.title}`} />
        <meta property="og:description" content={personal.summary} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={personal.profilePhoto} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {sections.preloader && <Preloader onComplete={onLoaded} />}
      <Cursor />
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />

      {sections.navbar && <Navbar isDark={isDark} onToggleTheme={toggleTheme} />}

      <main>
        {sections.hero && <Hero ready={ready} isDark={isDark} />}
        {sections.about && <About />}
        {sections.marquee && <Marquee />}
        {sections.skills && <Skills />}
        {sections.experience && <Experience />}
        {sections.projects && <Projects />}
        {sections.achievements && <Achievements />}
        {sections.education && <Education />}
        {sections.contact && <Contact />}
      </main>

      {sections.footer && <Footer />}
    </>
  )
}
