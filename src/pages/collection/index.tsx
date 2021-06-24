import dynamic from 'next/dynamic'

const WrapInvestorsAccounComponent = dynamic(() => import('pages/InvestorsAccount/InvestorsAccountContainer'), {
  ssr: false,
})

const Collection = dynamic(() => import('pages/InvestorsAccount/Collection'), { ssr: false })

const CollectionPage = () => {
  return (
    <WrapInvestorsAccounComponent>
      <Collection />
    </WrapInvestorsAccounComponent>
  )
}

export default CollectionPage
