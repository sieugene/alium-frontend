import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const Pool = dynamic(() => import('views/Pool'), { ssr: false })

const PoolPage = () => {
  return (
    <WrapSwapComponent>
      <Pool />
    </WrapSwapComponent>
  )
}

export default PoolPage

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
