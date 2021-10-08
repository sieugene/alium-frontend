import { isProduction } from 'config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

const Bridge = dynamic(() => import('../../views/bridge'))

function BridgePage() {
  return <Bridge />
}

export default BridgePage

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
  notFound: isProduction,
})
