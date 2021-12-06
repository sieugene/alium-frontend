import { Button, Skeleton } from 'alium-uikit/src'
import format from 'date-fns/format'
import fromUnixTime from 'date-fns/fromUnixTime'
import orderBy from 'lodash/orderBy'
import { useTranslation } from 'next-i18next'
import { ReactNode, useMemo, useState } from 'react'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, Card, mq, typography } from 'ui'
import { useOverviewChartsQuery } from 'views/Info/generated'
import { ChartEntry } from 'views/Info/types'
import { formatNumber, getPercentageChange } from 'views/Info/utils'
import Percentage from '../Percentage'
import BarChart from './BarChart'
import LineChart from './LineChart'

export default function OverviewCharts() {
  const isTablet = useMedia(mq.down(breakpoints.md))
  const { t } = useTranslation()
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
  const [hoveredLiquidity, setHoveredLiquidity] = useState<number>()
  const [hoveredVolume, setHoveredVolume] = useState<number>()

  const [chartTab, setChartTab] = useState<'liquidity' | 'volume'>('liquidity')

  const liquidityChartNode =
    chartsData.liquidity.length > 0 ? (
      <OverviewCharts.ChartContainer>
        <LineChart data={chartsData.liquidity} onHover={setHoveredLiquidity} />
        <ChartInfo hovered={hoveredLiquidity} data={chartsData.liquidity} title={t('Liquidity')} />
      </OverviewCharts.ChartContainer>
    ) : (
      <Skeleton height='100%' />
    )

  const volumeChartNode =
    chartsData.volume.length > 0 ? (
      <OverviewCharts.ChartContainer>
        <BarChart data={chartsData.volume} onHover={setHoveredVolume} />
        <ChartInfo hovered={hoveredVolume} data={chartsData.volume} title={t('Volume (24hr)')} />
      </OverviewCharts.ChartContainer>
    ) : (
      <Skeleton height='100%' />
    )

  return (
    <OverviewCharts.Root>
      {isTablet ? (
        <OverviewCharts.Card>
          <OverviewCharts.Tabs>
            <OverviewCharts.Tab data-active={chartTab === 'liquidity'} onClick={() => setChartTab('liquidity')}>
              {t('Liquidity')}
            </OverviewCharts.Tab>
            <OverviewCharts.Tab data-active={chartTab === 'volume'} onClick={() => setChartTab('volume')}>
              {t('Volume (24hr)')}
            </OverviewCharts.Tab>
          </OverviewCharts.Tabs>
          {chartTab === 'liquidity' ? liquidityChartNode : volumeChartNode}
        </OverviewCharts.Card>
      ) : (
        <>
          <OverviewCharts.Card>{liquidityChartNode}</OverviewCharts.Card>
          <OverviewCharts.Card>{volumeChartNode}</OverviewCharts.Card>
        </>
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

  @media ${mq.down(breakpoints.sm)} {
    padding: 16px;
  }
`

OverviewCharts.ChartContainer = styled.div`
  position: relative;
  flex: 1;
`

OverviewCharts.Root = styled.div`
  display: flex;
  min-height: 342px;

  & > * + * {
    margin-left: 30px;
  }

  @media ${mq.down(breakpoints.md)} {
    min-height: 394px;
  }

  @media ${mq.down(breakpoints.sm)} {
    min-height: 372px;
  }
`

OverviewCharts.Tabs = styled.div`
  display: flex;
  margin-bottom: 16px;
`

OverviewCharts.Tab = styled(Button).attrs({
  size: 'sm',
})`
  &&&[data-active='false'] {
    &,
    &:hover {
      background: none;
      color: #8990a5;
    }
  }
`

interface ChartInfoProps {
  hovered?: number
  data: ChartEntry[]
  title: ReactNode
}

function ChartInfo({ hovered, data, title }: ChartInfoProps) {
  const entryIndex = hovered ?? data.length - 1
  const entry = data[entryIndex]
  const prevEntry = data[entryIndex - 1]
  return (
    <ChartInfo.Root>
      <ChartInfo.Title>{title}</ChartInfo.Title>
      {entry && (
        <>
          <ChartInfo.Value>
            <span>${formatNumber(entry.value, { notation: 'compact' })}</span>
            {prevEntry && <Percentage value={getPercentageChange(prevEntry.value, entry.value)} />}
          </ChartInfo.Value>
          <ChartInfo.Date>{format(fromUnixTime(entry.date), 'MMM d, yyyy')}</ChartInfo.Date>
        </>
      )}
    </ChartInfo.Root>
  )
}

ChartInfo.Root = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  color: #0b1359;

  & > * + * {
    margin-top: 6px;
  }
`

ChartInfo.Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.1px;

  @media ${mq.down(breakpoints.md)} {
    display: none;
  }
`

ChartInfo.Value = styled.div`
  & > *:first-child {
    font-weight: 500;
    font-size: 24px;
    line-height: 20px;
    letter-spacing: 0.1px;
  }

  ${Percentage.Root} {
    margin-left: 8px;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.1px;
  }
`

ChartInfo.Date = styled.div`
  ${typography.small.regular}
`
