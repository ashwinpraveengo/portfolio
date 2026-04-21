// Theme definitions for the portfolio
export const themes = {
  dark: {
    '--bg': '#060c16',
    '--text': '#f0f0f0',
    '--muted': '#a0a8b8',
    '--accent': '#00e5a0',
    '--accent2': '#00b8ff',
    '--card': 'rgba(13,21,37,0.7)',
    '--border': 'rgba(0,229,160,0.08)',
  },
  light: {
    '--bg': '#f8f9fa',
    '--text': '#0a0e14',
    '--muted': '#6b7280',
    '--accent': '#00d691',
    '--accent2': '#0099dd',
    '--card': 'rgba(255,255,255,0.9)',
    '--border': 'rgba(0,214,143,0.12)',
  },
}

/**
 * Apply theme to document root
 * @param {string} themeName - 'dark' or 'light'
 */
export const applyTheme = (themeName) => {
  const theme = themes[themeName] || themes.dark
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}

/**
 * Get theme from localStorage or default to dark
 * @returns {string} - 'dark' or 'light'
 */
export const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  return localStorage.getItem('portfolio-theme') || 'dark'
}

/**
 * Save theme to localStorage
 * @param {string} themeName - 'dark' or 'light'
 */
export const saveTheme = (themeName) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio-theme', themeName)
  }
}
