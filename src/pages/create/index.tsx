import dynamic from 'next/dynamic'
import React from 'react'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const RedirectToAddLiquidity = dynamic(
  () => import('views/AddLiquidity/redirects').then((module) => module.RedirectToAddLiquidity),
  {
    ssr: false,
  },
)

const CreateSwap = () => {
  return (
    <WrapSwapComponent>
      <RedirectToAddLiquidity />
    </WrapSwapComponent>
  )
}

export default CreateSwap
