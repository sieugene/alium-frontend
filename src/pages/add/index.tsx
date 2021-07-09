import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const AddLiquidity = dynamic(() => import('views/AddLiquidity').then((module) => module), {
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

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
