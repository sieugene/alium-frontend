const { i18n } = require('./next-i18next.config')
const env = require(process.env.APP_ENV === 'development' ? './.env.development.js' : './.env.production.js')

module.exports = {
  i18n,
  env,
  generateBuildId: async () => String(Math.round(Number(new Date()) / 1000)),
  distDir: 'build',
  compress: false,
  poweredByHeader: false,
  devIndicators: {
    autoPrerender: false,
  },
  reactStrictMode: true,
}
