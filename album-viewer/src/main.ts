import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { useTheme } from './composables/useTheme'
import App from './App.vue'
import en from './locales/en.json'
import fr from './locales/fr.json'
import de from './locales/de.json'

const i18n = createI18n({
	legacy: false,
	locale: 'en',
	fallbackLocale: 'en',
	messages: { en, fr, de }
})

// Initialize theme before mounting app
const { initializeTheme } = useTheme()
initializeTheme()

const app = createApp(App)
app.use(i18n)
app.mount('#app')
