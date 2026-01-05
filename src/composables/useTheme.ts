import { ref } from 'vue'

export type Theme = 'light' | 'dark'

const THEME_KEY = 'portfolio-theme'

// Singleton state - shared across all components
const theme = ref<Theme>('light')
let isInitialized = false

const setTheme = (newTheme: Theme) => {
  theme.value = newTheme
  localStorage.setItem(THEME_KEY, newTheme)
  
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const toggleTheme = () => {
  setTheme(theme.value === 'light' ? 'dark' : 'light')
}

const initTheme = () => {
  if (isInitialized) return
  
  const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'))
  isInitialized = true
}

// Initialize immediately when module loads
if (typeof window !== 'undefined') {
  initTheme()
}

export function useTheme() {
  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme
  }
}
