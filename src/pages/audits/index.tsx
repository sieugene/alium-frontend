import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AuditPage from 'views/Audit'

const AuditsPage = () => {
  return <AuditPage />
}

export default AuditsPage

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
