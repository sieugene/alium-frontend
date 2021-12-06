import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import Toolbar from '../components/Toolbar'
import TopTokensTable from '../components/TopTokensTable'
import { getInfoLayout } from '../Layout'

export default function InfoTokens() {
  const { t } = useTranslation()
  return (
    <InfoTokens.Root>
      <Toolbar title={t('Top Tokens')} />
      <TopTokensTable hiddenTitle />
    </InfoTokens.Root>
  )
}

InfoTokens.Root = styled.div`
  ${Toolbar.Root} {
    margin-bottom: 40px;
  }
`

InfoTokens.getLayout = getInfoLayout
