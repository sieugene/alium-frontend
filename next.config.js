const { i18n } = require('./next-i18next.config')
const APP_ENV = process.env.APP_ENV === 'development' ? 'development' : 'production'
const env = require(APP_ENV === 'development' ? './src/.env.development.js' : './src/.env.production.js')

module.exports = {
  i18n,
  env: { APP_ENV, ...env },
  generateBuildId: async () => String(Math.round(Number(new Date()) / 1000)),
  distDir: 'build',
  compress: false,
  poweredByHeader: false,
  devIndicators: {
    autoPrerender: false,
  },
  reactStrictMode: true,
}
