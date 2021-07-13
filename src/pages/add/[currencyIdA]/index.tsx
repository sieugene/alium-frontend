import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { RedirectOldAddLiquidityPathStructure } from 'utils/redirects/swap/SwapRedirects'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const SwapAddCurrencyIdA = () => {
  return (
    <WrapSwapComponent>
      <RedirectOldAddLiquidityPathStructure type='add' />
    </WrapSwapComponent>
  )
}

export default SwapAddCurrencyIdA

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
