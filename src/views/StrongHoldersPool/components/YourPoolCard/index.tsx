import { Percent } from '@alium-official/sdk'
import { Button, Skeleton } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import useToast from 'hooks/useToast'
import { useMemo } from 'react'
import { useToggle } from 'react-use'
import styled, { css } from 'styled-components'
import { ethersToBigNumber } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import {
  Pool,
  useCountReward,
  useCountRewardPercent,
  useLeavePool,
  useMaxPoolLength,
  usePoolAccountUser,
  usePoolById,
  usePoolLocked,
  usePoolUsers,
  usePoolWithdrawals,
  useRewardTokenInfo,
  Withdrawn,
} from 'views/StrongHoldersPool/hooks'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import Card from '../Card'
import DetailsButton from '../DetailsButton'
import FormattedValue from '../FormattedValue'
import NftItemCounter from '../NftItemCounter'
import NftItemReward from '../NftItemReward'
import PoolDetailsInfo from '../PoolDetailsInfo'
import Title from '../Title'

export interface YourPoolCardProps {
  poolId: Pool['id']
}

export default function YourPoolCard({ poolId }: YourPoolCardProps) {
  const { toastError } = useToast()
  const [isDetails, toggleDetails] = useToggle(false)
  const { data: pool, mutate: mutatePool } = usePoolById(poolId)
  const { rewardTokenSymbol } = useRewardTokenInfo()
  const { data: poolUsers, mutate: mutatePoolUsers } = usePoolUsers(poolId)
  const { data: poolLocked } = usePoolLocked(poolId)
  const { data: maxPoolLength } = useMaxPoolLength()
  const { leavePool, loading: leavePoolLoading } = useLeavePool(poolId)
  const { isLoss } = useCountRewardPercent(poolId)
  const accountUser = usePoolAccountUser(poolId)
  const usersCount = useMemo(
    () => pool && poolUsers && new BigNumber(poolUsers.length).minus(ethersToBigNumber(pool.leftTracker)),
    [pool, poolUsers],
  )
  const isFullPool = maxPoolLength?.eq(poolUsers?.length || 0)
  return (
    <YourPoolCard.Root>
      <YourPoolCard.Summary>
        <YourPoolCard.Info>
          <YourPoolCard.InfoFields>
            <YourPoolCard.Field>
              <Title>Your contribution</Title>
              {accountUser ? (
                <YourPoolCard.Value
                  value={getBalanceAmount(ethersToBigNumber(accountUser.balance))}
                  suffix={' ' + rewardTokenSymbol}
                />
              ) : (
                <Skeleton />
              )}
            </YourPoolCard.Field>
            <YourPoolCard.Field>
              <PickUpFunds poolId={poolId} />
            </YourPoolCard.Field>
            <YourPoolCard.Field>
              <Title>Bonus NFT</Title>
              <NftItemCounter />
            </YourPoolCard.Field>
          </YourPoolCard.InfoFields>
          <YourPoolCard.InfoActions>
            <Button
              disabled={!isFullPool || !leavePool || accountUser?.paid || leavePoolLoading}
              onClick={async () => {
                if (!window.confirm('Are you sure you want to leave the pool?')) return
                try {
                  await leavePool()
                  await mutatePool()
                  await mutatePoolUsers()
                } catch (error) {
                  console.error(error)
                  toastError(error.data?.message || error.message)
                }
              }}
            >
              Leave the pool
            </Button>
            <DetailsButton isOpen={isDetails} onClick={toggleDetails} />
          </YourPoolCard.InfoActions>
        </YourPoolCard.Info>
        <YourPoolCard.PoolCounters>
          <YourPoolCard.Field>
            <Title>Users In the pool</Title>
            {usersCount ? <YourPoolCard.UsersCounter isLoss={isLoss} value={usersCount} /> : <Skeleton />}
          </YourPoolCard.Field>
          <YourPoolCard.Field>
            <Title>Pool Amount</Title>
            {poolLocked ? (
              <YourPoolCard.Value
                value={getBalanceAmount(ethersToBigNumber(poolLocked))}
                suffix={' ' + rewardTokenSymbol}
              />
            ) : (
              <Skeleton />
            )}
          </YourPoolCard.Field>
        </YourPoolCard.PoolCounters>
      </YourPoolCard.Summary>
      {isDetails && (
        <YourPoolCard.Details>
          <Details poolId={poolId} />
        </YourPoolCard.Details>
      )}
    </YourPoolCard.Root>
  )
}

YourPoolCard.Info = styled.div`
  padding-top: 16px;
`

YourPoolCard.Field = styled.div`
  ${Title} {
    margin-bottom: 8px;
  }
`

YourPoolCard.InfoFields = styled.div`
  margin-bottom: 32px;
  & > * + * {
    margin-top: 24px;
  }
`

YourPoolCard.InfoActions = styled.div`
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 24px;
  }
`

YourPoolCard.Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

YourPoolCard.Value = styled(FormattedValue)`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
`

YourPoolCard.PoolCounters = styled.div`
  display: grid;
  gap: 20px;
  border: 1px solid #f4f5fa;
  border-radius: 6px;
  padding: 16px 24px 16px 16px;
`

YourPoolCard.UsersCounter = styled(YourPoolCard.Value)<{ isLoss?: boolean }>`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: 0.3px;
  color: #1ea76d;

  ${(props) =>
    props.isLoss &&
    css`
      color: #ff4d00;
    `}
`

YourPoolCard.Details = styled.div`
  padding-top: 32px;
`

YourPoolCard.Root = styled(Card)`
  padding: 24px 24px 32px;
  position: relative;

  @media ${down(breakpoints.lg)} {
    padding: 12px 8px 24px;

    ${YourPoolCard.Summary} {
      flex-direction: column-reverse;
      align-items: stretch;
    }

    ${YourPoolCard.Info},
    ${YourPoolCard.Details} {
      padding: 16px 16px 0;
    }

    ${YourPoolCard.PoolCounters} {
      grid-template-columns: 1fr 1fr;
      padding: 16px;
      gap: 8px;
      align-items: start;
    }

    ${YourPoolCard.UsersCounter} {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 24px;
      letter-spacing: 0.3px;
    }

    ${YourPoolCard.InfoActions} {
      & > * + * {
        margin-left: 58px;
      }
    }
  }
`

interface PickUpFundsProps {
  poolId: Pool['id']
}

function PickUpFunds({ poolId }: PickUpFundsProps) {
  const { data: countReward } = useCountReward(poolId)
  const { countRewardPercent, isLoss } = useCountRewardPercent(poolId)
  const { rewardTokenSymbol } = useRewardTokenInfo()
  const accountUser = usePoolAccountUser(poolId)
  return (
    <>
      <Title>Pick up funds</Title>
      <PickUpFunds.Value>
        <PickUpFunds.Counters>
          {countReward ? (
            <YourPoolCard.Value
              value={getBalanceAmount(ethersToBigNumber(countReward))}
              suffix={' ' + rewardTokenSymbol}
            />
          ) : (
            <Skeleton />
          )}
          {countRewardPercent ? (
            <PickUpFunds.Profit style={{ visibility: accountUser?.paid ? 'hidden' : undefined }} isLoss={isLoss}>{`${
              isLoss ? '' : '+'
            } ${countRewardPercent.toFixed()}%`}</PickUpFunds.Profit>
          ) : (
            <Skeleton />
          )}
        </PickUpFunds.Counters>
        {/* TODO: NFT */}
        {/* <NftItemReward /> */}
      </PickUpFunds.Value>
    </>
  )
}

PickUpFunds.Counters = styled.div``

PickUpFunds.Value = styled.div`
  display: flex;
  align-items: flex-start;

  ${NftItemReward.Root} {
    height: 50px;
  }
`

PickUpFunds.Profit = styled.div<{ isLoss?: boolean }>`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #1ea76d;
  margin-top: 4px;

  ${(props) =>
    props.isLoss &&
    css`
      color: #ff4d00;
    `}
`

interface DetailsProps {
  poolId: Pool['id']
}

function Details({ poolId }: DetailsProps) {
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
