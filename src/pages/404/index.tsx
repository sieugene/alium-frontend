import dynamic from 'next/dynamic'
import { ROUTES } from 'routes'

const NotFound = dynamic(() => import('alium-uikit/src').then((module) => module.NotFound), { ssr: false })

const ErrorPage = () => {
  return <NotFound redirectURL={ROUTES.home} />
}

export default ErrorPage
export { getStaticProps } from 'utils/i18n'
