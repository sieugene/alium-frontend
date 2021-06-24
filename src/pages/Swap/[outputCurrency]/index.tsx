import dynamic from 'next/dynamic'
import React from 'react'
import { RedirectToSwap } from 'views/Swap/redirects'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const OutputCurrencySwap = () => {
  return (
    <WrapSwapComponent>
      <RedirectToSwap />
    </WrapSwapComponent>
  )
}

export default OutputCurrencySwap
