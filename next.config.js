// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

const { NODE_ENV, __NEXT_PROCESSED_ENV, __CF_USER_TEXT_ENCODING, __CFBundleIdentifier, ...OTHER_ENVS } = process.env

module.exports = {
  i18n,
  env: {
    ...OTHER_ENVS,
  },
  distDir: 'build',
  compress: false,
  poweredByHeader: false,
  devIndicators: {
    autoPrerender: false,
  },
  reactStrictMode: true,
}
