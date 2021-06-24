import dynamic from 'next/dynamic'
import React from 'react'

const WrapInvestorsAccounComponent = dynamic(() => import('views/InvestorsAccount/InvestorsAccountContainer'), {
  ssr: false,
})

const InvestorsAccount = dynamic(() => import('views/InvestorsAccount'), { ssr: false })

const Account = () => {
  return (
    <WrapInvestorsAccounComponent>
      <InvestorsAccount />
    </WrapInvestorsAccounComponent>
  )
}

export default Account
