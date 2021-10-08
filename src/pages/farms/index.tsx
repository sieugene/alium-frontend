import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Farms from 'views/farms'

export default Farms

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
