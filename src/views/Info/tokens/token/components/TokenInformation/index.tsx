import { ChainId } from '@alium-official/sdk'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { useTranslation } from 'next-i18next'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, Button, Card, IconButton, mq, typography } from 'ui'
import { getExplorerLink } from 'utils'
import Table from 'views/Info/components/Table'
import TableTitle from 'views/Info/components/TableTitle'
import { TokenQuery } from 'views/Info/generated'
import { formatTokenSymbol } from 'views/Info/utils'
import { formatAddress } from 'views/StrongHoldersPool/utils'
import { ReactComponent as CopyIcon } from './assets/copy.svg'

export interface TokenInformationProps {
  token: NonNullable<TokenQuery['token']>
}

export default function TokenInformation({ token }: TokenInformationProps) {
  const { t } = useTranslation()
  const [_, copy] = useCopyClipboard()
  const isMobile = useMedia(mq.down(breakpoints.sm))

  const tokenSymbolNode = <TokenInformation.TokenSymbol>{formatTokenSymbol(token.symbol)}</TokenInformation.TokenSymbol>
  const tokenName = token.name
  const tokenAddressNode = (
    <TokenInformation.TokenAddress>
      <span>{formatAddress(token.id, 8, 6)}</span>
      <IconButton onClick={() => copy(token.id)}>
        <CopyIcon />
      </IconButton>
    </TokenInformation.TokenAddress>
  )

  const explorerNode = (
    <Button
      as='a'
      href={getExplorerLink(ChainId.MAINNET, token.id, 'token')}
      target='_blank'
      rel='noreferrer noopener'
      variant='outlined'
      size='small'
    >
      {t('View on BscScan')}
    </Button>
  )

  return (
    <TokenInformation.Root>
      <TableTitle>{t('Token Information')}</TableTitle>
      {isMobile ? (
        <TokenInformation.MobileCard>
          <div>
            <span>{t('Symbol')}</span>
            <span>{tokenSymbolNode}</span>
          </div>
          <div>
            <span>{t('Name')}</span>
            <span>{tokenName}</span>
          </div>
          <div>
            <span>{t('Address')}</span>
            <span>{tokenAddressNode}</span>
          </div>
          <div>{explorerNode}</div>
        </TokenInformation.MobileCard>
      ) : (
        <Table
          header={
            <Table.HeaderRow>
              <Table.HeaderCell>{t('Symbol')}</Table.HeaderCell>
              <Table.HeaderCell>{t('Name')}</Table.HeaderCell>
              <Table.HeaderCell>{t('Address')}</Table.HeaderCell>
            </Table.HeaderRow>
          }
        >
          <Table.ItemRow>
            <Table.ItemCell>{tokenSymbolNode}</Table.ItemCell>
            <Table.ItemCell>{tokenName}</Table.ItemCell>
            <Table.ItemCell>
              {tokenAddressNode}
              {explorerNode}
            </Table.ItemCell>
          </Table.ItemRow>
        </Table>
      )}
    </TokenInformation.Root>
  )
}

TokenInformation.TokenAddress = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 16px;
  }
`

TokenInformation.TokenSymbol = styled.div`
  ${typography.ultrasmall.medium}
  color: #6C5DD3;
`

TokenInformation.MobileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);

  & > * + * {
    margin-top: 8px;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child {
      margin-top: 16px;
    }

    & > span {
      color: #0b1359;

      &:nth-of-type(1) {
        ${typography.miniheader}
      }

      &:nth-of-type(2) {
        ${typography.tiny.regular}
      }
    }
  }
`

TokenInformation.Root = styled.div`
  ${Table.Row} {
    grid-template-columns: repeat(2, 1fr) 4fr;

    & > *:last-child {
      text-align: inherit;
      justify-content: space-between;
    }
  }
`
