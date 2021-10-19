const isDev = process.env.NODE_ENV !== 'production'

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: isDev ? ['en', 'de', 'fr', 'ru'] : ['en'],
  },
  ns: ['common'],
  defaultNS: 'common',
  debug: isDev,
  keySeparator: false,
  nsSeparator: false,
}
