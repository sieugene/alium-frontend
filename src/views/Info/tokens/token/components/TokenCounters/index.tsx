import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { TokenQuery } from 'views/Info/generated'
import { formatNumber, getPercentageChange } from 'views/Info/utils'
import CounterCard from '../CounterCard'

export interface TokenCountersProps {
  token: NonNullable<TokenQuery['token']>
}

export default function TokenCounters({ token }: TokenCountersProps) {
  const { t } = useTranslation()
  const [nowData, prevData] = token.tokenDayData

  const liquidity = Number(nowData?.totalLiquidityUSD) || 0
  const liquidityPercentage = getPercentageChange(Number(prevData?.totalLiquidityUSD) || 0, liquidity)

  const volume24h = Number(nowData?.dailyVolumeUSD) || 0
  const volume24Percentage = getPercentageChange(Number(prevData?.dailyVolumeUSD) || 0, volume24h)

  const transactions24h = Number(nowData?.dailyTxns) || 0
  const transactions24hPercentage = getPercentageChange(Number(prevData?.dailyTxns) || 0, transactions24h)

  return (
    <TokenCounters.Root>
      <CounterCard
        title={t('Total Liquidity')}
        value={'$' + formatNumber(liquidity, { notation: 'compact' })}
        percentage={liquidityPercentage}
      />
      <CounterCard
        title={t('Volume (24 hrs)')}
        value={'$' + formatNumber(volume24h, { notation: 'compact' })}
        percentage={volume24Percentage}
      />
      <CounterCard
        title={t('Transaction (24 hrs)')}
        value={formatNumber(transactions24h)}
        percentage={transactions24hPercentage}
      />
    </TokenCounters.Root>
  )
}

TokenCounters.Root = styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 22px;
  }

  @media ${mq.down(breakpoints.md)} {
    flex-direction: row;

    & > * {
      flex: 1;
    }

    & > * + * {
      margin-top: 0;
      margin-left: 24px;
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    flex-direction: column;

    & > * + * {
      margin-left: 0;
      margin-top: 8px;
    }
  }
`
