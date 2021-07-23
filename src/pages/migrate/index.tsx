import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import ViewMigrate from 'views/Migrate/Migrate'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), { ssr: false })

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
