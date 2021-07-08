import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const RemoveLiquidity = dynamic(() => import('views/RemoveLiquidity').then((module) => module.RemoveLiquidity), {
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

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
