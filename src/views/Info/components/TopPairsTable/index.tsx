import getUnixTime from 'date-fns/getUnixTime'
import subDays from 'date-fns/subDays'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useMemo } from 'react'
import { useMedia } from 'react-use'
import { breakpoints, mq } from 'ui'
import { LP_HOLDERS_FEE, TOTAL_FEE } from 'views/Info/config'
import { TopPairFragment, useBlockByTimestampQuery, useTopPairsQuery } from 'views/Info/generated'
import { formatNumber, formatTokenSymbol, getPeriodChange } from 'views/Info/utils'
import PairCurrencyLogo from '../PairCurrencyLogo'
import Percentage from '../Percentage'
import Table, { useTableData } from '../Table'
import TableTitle from '../TableTitle'
import TopTokensTable from '../TopTokensTable'

function useTopPairsTable() {
  const timestamps = useMemo(() => {
    const now = new Date()
    return {
      h24: getUnixTime(subDays(now, 1)),
      d7: getUnixTime(subDays(now, 7)),
    }
  }, [])
  const { data: block24h } = useBlockByTimestampQuery({
    variables: {
      timestamp: timestamps.h24,
    },
    context: {
      blocklytics: true,
    },
  })
  const { data: block7d } = useBlockByTimestampQuery({
    variables: {
      timestamp: timestamps.d7,
    },
    context: {
      blocklytics: true,
    },
  })
  const { data } = useTopPairsQuery({
    variables: {
      block24h: Number(block24h?.blocks[0].number),
      block7d: Number(block7d?.blocks[0].number),
    },
    fetchPolicy: 'no-cache',
    skip: !block24h || !block7d,
  })

  const pairs = useMemo(() => {
    if (!data) return undefined
    const [h24ById, d7ById] = [data.h24, data.d7].map((periodPairs) =>
      periodPairs.reduce<Record<string, TopPairFragment>>((acc, pair) => {
        acc[pair.id] = pair
        return acc
      }, {}),
    )

    return data.now.map((pair) => {
      const h24Pair = h24ById[pair.id]
      const d7Pair = d7ById[pair.id]

      const liquidity = Number(pair.reserveUSD) || 0

      const currentVolume = Number(pair.volumeUSD) || 0
      const volume24h = getPeriodChange(Number(h24Pair?.volumeUSD) || 0, currentVolume)
      const volume7d = getPeriodChange(Number(d7Pair?.volumeUSD) || 0, currentVolume)

      const fees24h = volume24h * TOTAL_FEE
      const apy = liquidity > 0 ? ((volume24h * LP_HOLDERS_FEE * 365) / liquidity) * 100 : 0

      return {
        id: pair.id,
        name: `${formatTokenSymbol(pair.token0.symbol)}-${formatTokenSymbol(pair.token1.symbol)}`,
        liquidity,
        volume24h,
        volume7d,
        fees24h,
        apy,

        token0: pair.token0,
        token1: pair.token1,
      }
    })
  }, [data])
  return useTableData({
    items: pairs,
    sortingOptions: {
      initialKey: 'liquidity',
    },
  })
}

export interface TopPairsTableProps {
  hiddenTitle?: boolean
}

export default function TopPairsTable({ hiddenTitle }: TopPairsTableProps) {
  const { t } = useTranslation()
  const isTablet = useMedia(mq.down(breakpoints.md))
  const isMobile = useMedia(mq.down(breakpoints.sm))
  const { items, sorting, paginate, getItemNumber } = useTopPairsTable()
  return (
    <TopPairsTable.Root>
      {!hiddenTitle && <TableTitle seeAllHref='/info/pairs'>{t('Top Pairs')}</TableTitle>}
      <Table
        paginate={paginate}
        header={
          <Table.HeaderRow>
            {[
              { title: t('Name'), sortKey: 'name' },
              { title: t('Liquidity'), sortKey: 'liquidity' },
              { title: t('Volume (24 hrs)'), sortKey: 'volume24h' },
              !isMobile && { title: t('Volume (7 d)'), sortKey: 'volume7d' },
              !isTablet && { title: t('Fees (24 hr)'), sortKey: 'fees24h' },
              !isTablet && { title: t('1y Fees/\nLiquidity'), sortKey: 'apy' },
            ]
              .filter(Boolean)
              .map((header) => (
                <Table.SortableHeaderCell sortKey={header.sortKey} key={header.title} sorting={sorting}>
                  {header.title}
                </Table.SortableHeaderCell>
              ))}
          </Table.HeaderRow>
        }
      >
        {items ? (
          items.map((item, i) => (
            <Link key={item.id} passHref href={`/info/pairs/${item.token0.id}/${item.token1.id}`}>
              <Table.ItemRow as='a'>
                <Table.ItemCell>
                  {!isMobile && <TopTokensTable.ItemNumber>{getItemNumber(i)}</TopTokensTable.ItemNumber>}
                  <PairCurrencyLogo address0={item.token0.id} address1={item.token1.id} />
                  <TopTokensTable.TokenName>{item.name}</TopTokensTable.TokenName>
                </Table.ItemCell>
                <Table.ItemCell>${formatNumber(item.liquidity)}</Table.ItemCell>
                <Table.ItemCell>${formatNumber(item.volume24h)}</Table.ItemCell>
                {!isMobile && <Table.ItemCell>${formatNumber(item.volume7d)}</Table.ItemCell>}
                {!isTablet && <Table.ItemCell>${formatNumber(item.fees24h)}</Table.ItemCell>}
                {!isTablet && (
                  <Table.ItemCell>
                    <Percentage value={item.apy} />
                  </Table.ItemCell>
                )}
              </Table.ItemRow>
            </Link>
          ))
        ) : (
          <Table.ItemsLoader />
        )}
      </Table>
    </TopPairsTable.Root>
  )
}

TopPairsTable.Root = TopTokensTable.Root
