import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import de from '../public/locales/de/de'
import en from '../public/locales/en'
import esAR from '../public/locales/es-AR'
import esUS from '../public/locales/es-US'
import itIT from '../public/locales/it-IT'
import iw from '../public/locales/iw'
import ro from '../public/locales/ro'
import ru from '../public/locales/ru'
import vi from '../public/locales/vi'
import zhCN from '../public/locales/zh-CN'
import zhTW from '../public/locales/zh-TW'


// ['de', 'en', 'es-AR', 'es-US', 'it-IT', 'iw', 'ro', 'ru', 'vi', 'zh-CN', 'zh-TW']

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      resources: {
        de: { translation: de },
        en: { translation: en },
        'es-AR': { translation: esAR },
        'es-US': { translation: esUS },
        'it-IT': { translation: itIT },
        iw: { translation: iw },
        ro: { translation: ro },
        ru: { translation: ru },
        vi: { translation: vi },
        'zh-CN': { translation: zhCN },
        'zh-TW': { translation: zhTW },
      },
      lng: 'en',
      fallbackLng: 'en',
      preload: ['en'],
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      debug: process.env.NODE_ENV !== 'production',
    },
    (err) => {
      console.error('i18next error:', err)
    },
  )

export default i18n
