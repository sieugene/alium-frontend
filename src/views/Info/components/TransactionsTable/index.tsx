import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { useTransactionsQuery } from 'views/Info/generated'
import { mapBurn, mapMint, mapSwap, TransactionType } from 'views/Info/utils/transactions'
import Table, { useTableData } from '../Table'
import TableTitle from '../TableTitle'
import TransactionRow from './TransactionRow'
import TransactionTypeSelect from './TransactionTypeSelect'

function useTransactionsTable() {
  const { data } = useTransactionsQuery()
  const { t } = useTranslation()
  const [type, setType] = useState<TransactionType>(TransactionType.ALL)
  const transactions = useMemo(() => {
    if (!data) return undefined
    return [
      ...(type === TransactionType.ALL || type === TransactionType.MINT ? data.mints.map(mapMint) : []),
      ...(type === TransactionType.ALL || type === TransactionType.SWAP ? data.swaps.map(mapSwap) : []),
      ...(type === TransactionType.ALL || type === TransactionType.BURN ? data.burns.map(mapBurn) : []),
    ]
  }, [data, type])
  const tableData = useTableData({
    items: transactions,
    sortingOptions: {
      initialKey: 'timestamp',
    },
  })

  const typeOptions = useMemo<Array<{ title: string; value: TransactionType }>>(
    () => [
      {
        title: t('All'),
        value: TransactionType.ALL,
      },
      {
        title: t('Swaps'),
        value: TransactionType.SWAP,
      },
      {
        title: t('Adds'),
        value: TransactionType.MINT,
      },
      {
        title: t('Removes'),
        value: TransactionType.BURN,
      },
    ],
    [t],
  )

  const onChangeType = useCallback(
    (type: TransactionType) => {
      setType(type)
      // reset pagination
      tableData.paginate.onPageChanged(1)
    },
    [tableData.paginate],
  )

  return {
    ...tableData,
    type,
    typeOptions,
    onChangeType,
  }
}

export default function TransactionsTable() {
  const { t } = useTranslation()
  const isTablet = useMedia(mq.down(breakpoints.md))
  const { items, sorting, paginate, type, typeOptions, onChangeType } = useTransactionsTable()
  return (
    <TransactionsTable.Root>
      <TableTitle>{t('Transactions')}</TableTitle>
      <Table
        paginate={paginate}
        header={
          <Table.HeaderRow>
            <Table.HeaderCell>
              <TransactionTypeSelect options={typeOptions} value={type} onChange={onChangeType} />
            </Table.HeaderCell>
            {[
              { title: t('Total value'), sortKey: 'amountUSD' },
              !isTablet && { title: t('Token amount'), sortKey: 'amountToken0' },
              !isTablet && { title: t('Token amount'), sortKey: 'amountToken1' },
              !isTablet && { title: t('Account'), sortKey: 'sender' },
              { title: t('Time'), sortKey: 'timestamp' },
            ]
              .filter(Boolean)
              .map((header) => (
                <Table.SortableHeaderCell key={header.sortKey} sortKey={header.sortKey} sorting={sorting}>
                  {header.title}
                </Table.SortableHeaderCell>
              ))}
          </Table.HeaderRow>
        }
      >
        {items ? items.map((item, key) => <TransactionRow transaction={item} key={key} />) : <Table.ItemsLoader />}
      </Table>
    </TransactionsTable.Root>
  )
}

TransactionsTable.Root = styled.div`
  ${Table.Row} {
    grid-template-columns: 1.6fr repeat(5, 1fr);
  }

  @media ${mq.down(breakpoints.md)} {
    ${Table.Row} {
      grid-template-columns: 2.6fr repeat(2, 1fr);
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    ${Table.Row} {
      grid-template-columns: 1.6fr repeat(2, 1fr);
    }
  }
`
