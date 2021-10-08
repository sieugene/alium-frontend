import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { ROUTES } from 'routes'

const NotFound = dynamic(() => import('alium-uikit/src').then((module) => module.NotFound), { ssr: false })

const ErrorPage = () => {
  return <NotFound redirectURL={ROUTES.home} />
}

export default ErrorPage

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
