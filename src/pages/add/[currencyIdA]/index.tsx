import dynamic from 'next/dynamic'
import React from 'react'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const RedirectOldAddLiquidityPathStructure = dynamic(
  () => import('pages/AddLiquidity/redirects').then((module) => module.RedirectOldAddLiquidityPathStructure),
  {
    ssr: false,
  },
)

const SwapAddCurrencyIdA = () => {
  return (
    <WrapSwapComponent>
      <RedirectOldAddLiquidityPathStructure />
    </WrapSwapComponent>
  )
}

export default SwapAddCurrencyIdA
