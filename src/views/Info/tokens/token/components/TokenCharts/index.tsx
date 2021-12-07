import orderBy from 'lodash/orderBy'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { breakpoints, Card, mq } from 'ui'
import Chart from 'views/Info/components/Chart'
import ResponsiveTabs from 'views/Info/components/ResponsiveTabs'
import { useTokenChartsQuery } from 'views/Info/generated'
import { ChartEntry } from 'views/Info/types'

export interface TokenChartsProps {
  token: string
}

enum ChartTab {
  VOLUME = 'volume',
  LIQUIDITY = 'liquidity',
  PRICE = 'price',
}

export default function TokenCharts({ token }: TokenChartsProps) {
  const { t } = useTranslation()
  const [tab, setTab] = useState(ChartTab.VOLUME)
  const { data } = useTokenChartsQuery({
    variables: {
      token,
    },
  })
  const tabs = useMemo(
    () => [
      { title: t('Volume'), value: ChartTab.VOLUME },
      { title: t('Liquidity'), value: ChartTab.LIQUIDITY },
      { title: t('Price'), value: ChartTab.PRICE },
    ],
    [t],
  )
  const chartsData = useMemo(() => {
    const volume: ChartEntry[] = []
    const liquidity: ChartEntry[] = []
    const price: ChartEntry[] = []
    orderBy(data?.tokenDayDatas, 'date').forEach((dayData) => {
      volume.push({
        date: dayData.date,
        value: Number(dayData.dailyVolumeUSD),
      })
      liquidity.push({
        date: dayData.date,
        value: Number(dayData.totalLiquidityUSD),
      })
      price.push({
        date: dayData.date,
        value: Number(dayData.priceUSD),
      })
    })
    return {
      volume,
      liquidity,
      price,
    }
  }, [data?.tokenDayDatas])
  return (
    <TokenCharts.Root>
      <ResponsiveTabs options={tabs} value={tab} onChange={setTab as any} />
      <Chart type={tab === ChartTab.VOLUME ? 'bar' : 'line'} data={chartsData[tab]} />
    </TokenCharts.Root>
  )
}

TokenCharts.Root = styled(Card)`
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  padding: 24px;
  display: flex;
  flex-direction: column;
  min-height: 394px;

  ${ResponsiveTabs.Root} {
    margin-bottom: 17px;
  }

  ${Chart.Root} {
    flex: 1;
  }

  @media ${mq.down(breakpoints.sm)} {
    min-height: 382px;
  }
`
