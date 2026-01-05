import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'

export type Locale = 'en' | 'ar'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ar
  }
})

export function useLanguage() {
  const { locale } = i18n.global

  const setLanguage = (lang: Locale) => {
    locale.value = lang
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    localStorage.setItem('portfolio-lang', lang)
  }

  const toggleLanguage = () => {
    setLanguage(locale.value === 'en' ? 'ar' : 'en')
  }

  const initLanguage = () => {
    const savedLang = localStorage.getItem('portfolio-lang') as Locale | null
    setLanguage(savedLang || 'en')
  }

  return {
    locale,
    setLanguage,
    toggleLanguage,
    initLanguage
  }
}
