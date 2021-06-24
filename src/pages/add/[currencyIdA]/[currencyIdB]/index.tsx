import dynamic from 'next/dynamic'
import React from 'react'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const RedirectDuplicateTokenIds = dynamic(
  () => import('pages/AddLiquidity/redirects').then((module) => module.RedirectDuplicateTokenIds),
  {
    ssr: false,
  },
)

const SwapAddMultipleCurrency = () => {
  return (
    <WrapSwapComponent>
      <RedirectDuplicateTokenIds />
    </WrapSwapComponent>
  )
}

export default SwapAddMultipleCurrency
