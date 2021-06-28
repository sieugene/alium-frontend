import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import React from 'react'

const WrapInvestorsAccounComponent = dynamic(() => import('views/InvestorsAccount/InvestorsAccountContainer'), {
  ssr: false,
})

const Collection = dynamic(() => import('views/InvestorsAccount/Collection'), { ssr: false })

const CollectionPage = () => {
  return (
    <WrapInvestorsAccounComponent>
      <Collection />
    </WrapInvestorsAccounComponent>
  )
}

export default CollectionPage

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
