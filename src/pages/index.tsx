import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Home from 'views/Home'

function HomePage() {
  return <Home />
}

export default HomePage

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
