import { Skeleton } from 'alium-uikit/src'
import orderBy from 'lodash/orderBy'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, Card, mq } from 'ui'
import { useOverviewChartsQuery } from 'views/Info/generated'
import { ChartEntry } from 'views/Info/types'
import Chart from '../Chart'
import ResponsiveTabs from '../ResponsiveTabs'

enum ChartTab {
  VOLUME = 'volume',
  LIQUIDITY = 'liquidity',
}

export default function OverviewCharts() {
  const isTablet = useMedia(mq.down(breakpoints.md))
  const { t } = useTranslation()
  const [tab, setTab] = useState(ChartTab.LIQUIDITY)
  const tabs = useMemo(
    () => [
      {
        title: t('Liquidity'),
        value: ChartTab.LIQUIDITY,
      },
      {
        title: t('Volume (24hr)'),
        value: ChartTab.VOLUME,
      },
    ],
    [t],
  )
  const { data } = useOverviewChartsQuery()
  const chartsData = useMemo(() => {
    const volume: ChartEntry[] = []
    const liquidity: ChartEntry[] = []
    orderBy(data?.aliumDayDatas, 'date').forEach((dayData) => {
      volume.push({
        date: dayData.date,
        value: Number(dayData.dailyVolumeUSD),
      })
      liquidity.push({
        date: dayData.date,
        value: Number(dayData.totalLiquidityUSD),
      })
    }, [])
    return {
      volume,
      liquidity,
    }
  }, [data?.aliumDayDatas])

  const renderChart = (chartTab: ChartTab) => {
    const data = chartsData[chartTab]
    const tabItem = tabs.find((t) => t.value === chartTab)
    return data.length > 0 ? (
      <Chart
        type={chartTab === ChartTab.VOLUME ? 'bar' : 'line'}
        data={data}
        title={isTablet ? undefined : tabItem.title}
      />
    ) : (
      <Skeleton height='100%' />
    )
  }

  return (
    <OverviewCharts.Root>
      {isTablet ? (
        <OverviewCharts.Card>
          <ResponsiveTabs options={tabs} value={tab} responsive={false} onChange={setTab as any} />
          {renderChart(tab)}
        </OverviewCharts.Card>
      ) : (
        tabs.map((tab) => <OverviewCharts.Card key={tab.value}>{renderChart(tab.value)}</OverviewCharts.Card>)
      )}
    </OverviewCharts.Root>
  )
}

OverviewCharts.Card = styled(Card)`
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;

  ${Chart.Root} {
    flex: 1;
  }

  @media ${mq.down(breakpoints.sm)} {
    padding: 16px;
  }
`

OverviewCharts.Root = styled.div`
  display: flex;
  min-height: 342px;

  & > * + * {
    margin-left: 30px;
  }

  ${ResponsiveTabs.Root} {
    margin-bottom: 16px;
  }

  @media ${mq.down(breakpoints.md)} {
    min-height: 394px;
  }

  @media ${mq.down(breakpoints.sm)} {
    min-height: 372px;
  }
`
