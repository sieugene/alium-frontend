import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const Swap = dynamic(() => import('views/Swap'), { ssr: false })

const SwapPage = () => {
  return (
    <WrapSwapComponent>
      <Swap />
    </WrapSwapComponent>
  )
}

export default SwapPage

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
