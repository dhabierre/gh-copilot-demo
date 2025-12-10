import { ref, computed, watch } from 'vue'

type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'album-viewer-theme'

const currentTheme = ref<Theme>('light')

export function useTheme() {
  // Load theme from localStorage or system preference
  const initializeTheme = () => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    
    if (stored && (stored === 'light' || stored === 'dark')) {
      currentTheme.value = stored
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      currentTheme.value = prefersDark ? 'dark' : 'light'
    }
    
    applyTheme(currentTheme.value)
  }

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  const isDark = computed(() => currentTheme.value === 'dark')
  const isLight = computed(() => currentTheme.value === 'light')

  // Watch for changes and apply theme
  watch(
    currentTheme,
    (newTheme) => {
      applyTheme(newTheme)
    }
  )

  return {
    currentTheme: computed(() => currentTheme.value),
    isDark,
    isLight,
    toggleTheme,
    initializeTheme
  }
}
