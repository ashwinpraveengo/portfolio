// Theme colors live as CSS variables in styles/globals.css under
// :root (dark) and [data-theme='light']. This module just switches between them.

const STORAGE_KEY = 'portfolio-theme'

/**
 * Apply theme to document root
 * @param {string} themeName - 'dark' or 'light'
 */
export const applyTheme = themeName => {
  document.documentElement.dataset.theme = themeName === 'light' ? 'light' : 'dark'
}

/**
 * Get theme from localStorage or default to dark
 * @returns {string} - 'dark' or 'light'
 */
export const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

/**
 * Save theme to localStorage
 * @param {string} themeName - 'dark' or 'light'
 */
export const saveTheme = themeName => {
  try {
    localStorage.setItem(STORAGE_KEY, themeName)
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

/**
 * Read a CSS color variable from the active theme.
 * @param {string} name - e.g. '--accent'
 */
export const readThemeColor = name =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()
