import { createI18n } from 'vue-i18n'
import en from './locales/en'
import ja from './locales/ja'

const savedLocale = localStorage.getItem('locale') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    ja,
  },
})

export default i18n