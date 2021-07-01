/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const { i18n } = require('./next-i18next.config')

const isDev = process.env.NODE_ENV === 'development'

const { parsed: myEnv } = isDev
  ? require('dotenv').config({
      path: './.env.development',
    })
  : require('dotenv').config({
      path: './.env.production',
    })
console.log('APP was started with MODE', isDev ? 'DEV' : 'PRODUCTION')

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
    return config
  },
  distDir: 'build',
  compress: false,
  poweredByHeader: false,
  devIndicators: {
    autoPrerender: false,
  },
  reactStrictMode: true,
  i18n,
}
