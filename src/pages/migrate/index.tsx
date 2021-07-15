import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), { ssr: false })
const ViewMigrate = dynamic(() => import('views/Migrate'), { ssr: false })

const MigratePage = () => {
  return (
    <WrapSwapComponent>
      <ViewMigrate />
    </WrapSwapComponent>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ['common'])) },
})

export default MigratePage
