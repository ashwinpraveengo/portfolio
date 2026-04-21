import { useState, useEffect } from 'react'
import Head from 'next/head'
import { portfolioConfig } from '@/data/portfolio.config'
import { applyTheme, getStoredTheme, saveTheme } from '@/lib/themes'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
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
  const [isDark, setIsDark] = useState(true)

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = getStoredTheme()
    setIsDark(storedTheme === 'dark')
    applyTheme(storedTheme)
  }, [])

  // Update theme when isDark changes
  useEffect(() => {
    const themeName = isDark ? 'dark' : 'light'
    applyTheme(themeName)
    saveTheme(themeName)
  }, [isDark])

  const { personal, sections } = portfolioConfig

  return (
    <>
      <Head>
        <title>{personal.name} · {personal.title}</title>
        <meta name="description" content={personal.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>

      {sections.navbar && <Navbar isDark={isDark} setIsDark={setIsDark} />}

      <main>
        {sections.hero && <Hero />}
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
