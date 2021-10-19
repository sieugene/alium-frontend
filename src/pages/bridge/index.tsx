import { isProduction } from 'config'
import { getStaticProps as getI18nProps } from 'utils/i18n'

export { default } from 'views/bridge'

export const getStaticProps = async (ctx) => ({
  ...(await getI18nProps(ctx)),
  notFound: isProduction,
})
