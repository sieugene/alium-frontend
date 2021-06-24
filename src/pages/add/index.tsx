import dynamic from 'next/dynamic'
import React from 'react'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const AddLiquidity = dynamic(() => import('pages/AddLiquidity').then((module) => module), {
  ssr: false,
})

const SwapAdd = () => {
  return (
    <WrapSwapComponent>
      <AddLiquidity />
    </WrapSwapComponent>
  )
}

export default SwapAdd
