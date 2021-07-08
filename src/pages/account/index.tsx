import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

const WrapInvestorsAccounComponent = dynamic(() => import('views/InvestorsAccount/InvestorsAccountContainer'), {
  ssr: false,
})

const InvestorsAccount = dynamic(() => import('views/InvestorsAccount'), { ssr: false })

const Account = () => {
  return (
    <WrapInvestorsAccounComponent>
      <InvestorsAccount />
    </WrapInvestorsAccounComponent>
  )
}

export default Account

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
