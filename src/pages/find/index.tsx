import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const PoolFinder = dynamic(() => import('views/PoolFinder'), { ssr: false })

const Find = () => {
  return (
    <WrapSwapComponent>
      <PoolFinder />
    </WrapSwapComponent>
  )
}

export default Find

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
