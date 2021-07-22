const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  env: Object.keys(process.env).reduce((acc, val) =>
    val.slice(0, 4) === 'APP_' || val.slice(0, 10) === 'REACT_APP_' ? { ...acc, [val]: process.env[val] } : acc,
  ),
  generateBuildId: async () => String(Math.round(Number(new Date()) / 1000)),
  distDir: 'build',
  compress: false,
  poweredByHeader: false,
  devIndicators: {
    autoPrerender: false,
  },
  reactStrictMode: true,
}
