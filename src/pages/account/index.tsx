import dynamic from 'next/dynamic'
import React from 'react'

const WrapInvestorsAccounComponent = dynamic(() => import('pages/InvestorsAccount/InvestorsAccountContainer'), {
  ssr: false,
})

const InvestorsAccount = dynamic(() => import('pages/InvestorsAccount'), { ssr: false })

const Account = () => {
  const [mounted, setmounted] = React.useState(false)
  React.useEffect(() => {
    setmounted(true)
  }, [])
  if (!mounted) {
    return <div></div>
  }
  return (
    <WrapInvestorsAccounComponent>
      <InvestorsAccount />
    </WrapInvestorsAccounComponent>
  )
}

export default Account
