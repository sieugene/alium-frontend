import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import InfoHeadline from './components/InfoHeadline'
import OverviewCharts from './components/OverviewCharts'
import Toolbar from './components/Toolbar'
import TopPairsTable from './components/TopPairsTable'
import TopTokensTable from './components/TopTokensTable'
import TransactionsTable from './components/TransactionsTable'
import { getInfoLayout } from './Layout'

export default function Info() {
  const { t } = useTranslation()
  return (
    <Info.Root>
      <Toolbar title={t('Analytics')} />
      <InfoHeadline />
      <Info.Content>
        <OverviewCharts />
        <TopTokensTable />
        <TopPairsTable />
        <TransactionsTable />
      </Info.Content>
    </Info.Root>
  )
}

Info.Content = styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 40px;
  }
`

Info.Root = styled.div`
  ${Toolbar.Root} {
    margin-bottom: 24px;
  }

  ${InfoHeadline.Root} {
    margin-bottom: 40px;
  }
`

Info.getLayout = getInfoLayout
