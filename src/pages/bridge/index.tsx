import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export { default } from '../../views/bridge'
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
