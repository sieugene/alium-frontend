import { Percent } from '@alium-official/sdk'
import { Skeleton } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import styled from 'styled-components'
import { ethersToBigNumber } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import {
  Pool,
  usePoolAccountUser,
  usePoolById,
  usePoolLocked,
  usePoolUsers,
  usePoolWithdrawals,
  useRewardTokenInfo,
  Withdrawn,
} from 'views/StrongHoldersPool/hooks'
import PoolDetailsInfo from '../PoolDetailsInfo'

export interface DetailsProps {
  poolId: Pool['id']
}

export default function Details({ poolId }: DetailsProps) {
  const { data: pool } = usePoolById(poolId)
  const { data: poolLocked } = usePoolLocked(poolId)
  const { data: withdrawals } = usePoolWithdrawals(poolId)
  const { data: poolUsers } = usePoolUsers(poolId)
  const { rewardTokenSymbol } = useRewardTokenInfo()
  const accountUser = usePoolAccountUser(poolId)
  const poolShare = useMemo(
    () => accountUser && poolLocked && new Percent(accountUser.balance.toString(), poolLocked.toString()),
    [accountUser, poolLocked],
  )
  const withdrawalByAccount = useMemo(() => {
    const ret: Record<Withdrawn['account'], Withdrawn> = {}
    withdrawals?.forEach((withdrawal) => {
      ret[withdrawal.account] = withdrawal
    })
    return ret
  }, [withdrawals])
  return (
    <Details.Root>
      <PoolDetailsInfo
        leftId={accountUser?.leftId && ethersToBigNumber(accountUser.leftId)}
        poolShare={poolShare}
        createdAt={pool?.createdAt && ethersToBigNumber(pool.createdAt)}
      />
      <Details.HistoryTitle>History</Details.HistoryTitle>
      <Details.HistoryTable>
        <thead>
          <tr>
            <th>Wallet</th>
            <th>Added</th>
            <th>Withdraw</th>
          </tr>
        </thead>
        <tbody>
          {poolUsers?.map((user) => {
            const wallet = `${user.account.substring(0, 9)}...${user.account.substring(user.account.length - 5)}`
            const withdrawal = withdrawalByAccount?.[user.account]
            const added = `${getBalanceAmount(ethersToBigNumber(user.balance))
              .decimalPlaces(4, BigNumber.ROUND_FLOOR)
              .toFormat()} ${rewardTokenSymbol}`
            return (
              <tr key={user.account}>
                <td>{wallet}</td>
                <td>{added}</td>
                {user.paid ? (
                  <td>
                    {withdrawal ? (
                      `${getBalanceAmount(ethersToBigNumber(withdrawal.amount))
                        .decimalPlaces(4, BigNumber.ROUND_FLOOR)
                        .toFormat()} ${rewardTokenSymbol}`
                    ) : (
                      <Skeleton animation='waves' />
                    )}
                  </td>
                ) : (
                  <td>-</td>
                )}
              </tr>
            )
          })}
        </tbody>
      </Details.HistoryTable>
    </Details.Root>
  )
}

Details.Root = styled.div``

Details.HistoryTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.3px;
  color: #6c5dd3;
  margin: 24px 0 16px;
`

Details.HistoryTable = styled.table`
  width: 100%;

  thead {
    border-bottom: 1px solid #f4f5fa;
  }

  th {
    padding: 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #0b1359;
    text-align: left;
  }

  td,
  th {
    &:last-child {
      text-align: right;
    }
  }

  td {
    padding: 6px 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
    vertical-align: middle;

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  tr {
    &:nth-child(even) {
      background: #f4f5fa;
    }
  }
`
