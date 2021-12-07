import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, Button, mq } from 'ui'
import { formatNumber } from 'utils/formatBalance'
import CurrencyLogo from 'views/Info/components/CurrencyLogo'
import Percentage from 'views/Info/components/Percentage'
import ToolbarActions from 'views/Info/components/Toolbar/ToolbarActions'
import ToolbarTitle from 'views/Info/components/Toolbar/ToolbarTitle'
import { TokenQuery } from 'views/Info/generated'
import { formatTokenSymbol, getPercentageChange } from 'views/Info/utils'
import { ReactComponent as PlusIcon } from './assets/plus.svg'

export interface TokenToolbarProps {
  token: NonNullable<TokenQuery['token']>
}

export default function TokenToolbar({ token }: TokenToolbarProps) {
  const { t } = useTranslation()
  const isDownLg = useMedia(mq.down(breakpoints.lg))
  const price = Number(token.tokenDayData[0]?.priceUSD) || 0
  const priceChange = getPercentageChange(Number(token.tokenDayData[1]?.priceUSD) || 0, price)
  return (
    <TokenToolbar.Root>
      <TokenToolbar.Row>
        <TokenToolbar.Main>
          <CurrencyLogo address={token.id} />
          <ToolbarTitle>
            {token.name} ({formatTokenSymbol(token.symbol)})
          </ToolbarTitle>
          <TokenToolbar.Price>
            <span>${formatNumber(price)}</span>
            <Percentage value={priceChange} />
          </TokenToolbar.Price>
        </TokenToolbar.Main>
        {!isDownLg && <ToolbarActions />}
      </TokenToolbar.Row>
      <TokenToolbar.Row>
        <TokenToolbar.Actions>
          <Link href={`/swap/${token.id}`} passHref>
            <Button as='a'>{t('Trade')}</Button>
          </Link>
          <Link href={`/add/${token.id}`} passHref>
            <Button as='a' variant='outlined'>
              <PlusIcon style={{ marginRight: 16 }} />
              {t('Add Liquidity')}
            </Button>
          </Link>
        </TokenToolbar.Actions>
        {isDownLg && <ToolbarActions />}
      </TokenToolbar.Row>
    </TokenToolbar.Root>
  )
}

TokenToolbar.Main = styled.div`
  display: flex;
  align-items: center;
`

TokenToolbar.Price = styled.div`
  margin-left: 16px;

  & > *:first-child {
    font-weight: 500;
    font-size: 24px;
    line-height: 20px;
    letter-spacing: 0.1px;
    color: #0b1359;
    margin-right: 8px;
  }
`

TokenToolbar.Row = styled.div`
  display: flex;
  justify-content: space-between;
`

TokenToolbar.Actions = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 8px;
  }
`

TokenToolbar.Root = styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 24px;
  }

  ${CurrencyLogo.Root} {
    width: 48px;
    height: 48px;
    margin-right: 16px;
  }

  @media ${mq.down(breakpoints.lg)} {
    ${CurrencyLogo.Root} {
      margin-right: 8px;
    }
  }

  @media ${mq.down(breakpoints.md)} {
    ${CurrencyLogo.Root} {
      width: 32px;
      height: 32px;
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    ${CurrencyLogo.Root} {
      width: 40px;
      height: 40px;
    }

    ${TokenToolbar.Main} {
      flex-wrap: wrap;
    }

    ${TokenToolbar.Price} {
      flex-basis: 100%;
      margin-left: 0;
      margin-top: 16px;
    }

    & > * + * {
      margin-top: 16px;
    }
  }
`
