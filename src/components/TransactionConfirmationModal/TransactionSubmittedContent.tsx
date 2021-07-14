import { ChainId } from '@alium-official/sdk'
import { Button, LinkExternal } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'
import { ArrowUpCircle } from 'react-feather'
import { ThemeContext } from 'styled-components'
import { getExplorerLink, getExplorerName } from 'utils'
import { AutoColumn } from '../Column'
import { ConfirmedIcon, ContentHeader, Section, Wrapper } from './helpers'

interface TransactionSubmittedContentProps {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
}

const TransactionSubmittedContent = ({ onDismiss, chainId, hash }: TransactionSubmittedContentProps) => {
  const theme = useContext(ThemeContext)
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Section>
        <ContentHeader onDismiss={onDismiss}>Transaction submitted</ContentHeader>
        <ConfirmedIcon>
          <ArrowUpCircle strokeWidth={0.5} size={97} color={theme.colors.primary} />
        </ConfirmedIcon>
        <AutoColumn gap='8px' justify='center'>
          {chainId && hash && (
            <LinkExternal href={getExplorerLink(chainId, hash, 'transaction')}>
              View on {getExplorerName(chainId)}
            </LinkExternal>
          )}
          <Button onClick={onDismiss} mt='20px'>
            {t('close')}
          </Button>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default TransactionSubmittedContent
