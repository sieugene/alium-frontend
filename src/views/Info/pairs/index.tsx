import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import Toolbar from '../components/Toolbar'
import TopPairsTable from '../components/TopPairsTable'
import { getInfoLayout } from '../Layout'

export default function InfoPairs() {
  const { t } = useTranslation()
  return (
    <InfoPairs.Root>
      <Toolbar title={t('Top Pairs')} />
      <TopPairsTable hiddenTitle />
    </InfoPairs.Root>
  )
}

InfoPairs.Root = styled.div`
  ${Toolbar.Root} {
    margin-bottom: 40px;
  }
`

InfoPairs.getLayout = getInfoLayout
