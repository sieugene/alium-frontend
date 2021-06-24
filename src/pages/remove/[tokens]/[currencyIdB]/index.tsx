import dynamic from 'next/dynamic'
import React from 'react'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const RemoveLiquidity = dynamic(() => import('pages/RemoveLiquidity').then((module) => module.RemoveLiquidity), {
  ssr: false,
})

const RemoveMultiple = () => {
  return (
    <WrapSwapComponent>
      <RemoveLiquidity />
    </WrapSwapComponent>
  )
}

export default RemoveMultiple
