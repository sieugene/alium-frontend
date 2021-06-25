import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Home from 'views/Home'

function HomePage() {
  return <Home />
}

export default HomePage

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
