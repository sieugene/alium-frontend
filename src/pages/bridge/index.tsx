import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

// export { default } from '../../views/bridge'

const Layout = dynamic(() => import('../../views/bridge'), { ssr: false })
export default Layout
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
