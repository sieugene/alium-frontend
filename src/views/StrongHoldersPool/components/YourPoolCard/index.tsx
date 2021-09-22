import { Percent } from '@alium-official/sdk'
import { Button, Skeleton } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { useToggle } from 'react-use'
import styled from 'styled-components'
import { ethersToBigNumber } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import {
  Pool,
  useAccountUser,
  useLeavePool,
  useMaxPoolLength,
  usePoolById,
  usePoolLocked,
  usePoolUsers,
  useRewardTokenInfo,
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
  const [isDetails, toggleDetails] = useToggle(false)
  const { data: pool, mutate: mutatePool } = usePoolById(poolId)
  const { rewardTokenSymbol } = useRewardTokenInfo()
  const { data: poolUsers, mutate: mutateUsers } = usePoolUsers(poolId)
  const { data: poolLocked } = usePoolLocked(poolId)
  const { data: maxPoolLength } = useMaxPoolLength()
  const leavePool = useLeavePool(poolId)
  const accountUser = useAccountUser(poolUsers)
  const usersCount = useMemo(
    () => pool && poolUsers && new BigNumber(poolUsers.length).minus(ethersToBigNumber(pool.leftTracker)),
    [pool, poolUsers],
  )
  const isFullPool = maxPoolLength?.eq(poolUsers?.length || 0)
  const disabledLeave = useMemo(() => {
    return !isFullPool
  }, [isFullPool])
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
              <PickUpFunds />
            </YourPoolCard.Field>
            <YourPoolCard.Field>
              <Title>Bonus NFT</Title>
              <NftItemCounter />
            </YourPoolCard.Field>
          </YourPoolCard.InfoFields>
          <YourPoolCard.InfoActions>
            <Button
              disabled={disabledLeave || !leavePool || accountUser?.paid}
              onClick={async () => {
                if (!window.confirm('Are you sure you want to leave the pool?')) return
                await leavePool()
                mutatePool()
                mutateUsers()
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
            {usersCount ? <YourPoolCard.UsersCounter value={usersCount} /> : <Skeleton />}
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

YourPoolCard.UsersCounter = styled(YourPoolCard.Value)`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: 0.3px;
  color: #1ea76d;
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

function PickUpFunds() {
  const value = useMemo(() => new BigNumber(103400), [])
  return (
    <>
      <Title>Pick up funds</Title>
      <PickUpFunds.Value>
        <PickUpFunds.Counters>
          <YourPoolCard.Value value={value} suffix=' ALM' />
          <PickUpFunds.Profit>+3.4%</PickUpFunds.Profit>
        </PickUpFunds.Counters>
        <NftItemReward />
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

PickUpFunds.Profit = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #1ea76d;
  margin-top: 4px;
`

interface DetailsProps {
  poolId: Pool['id']
}

function Details({ poolId }: DetailsProps) {
  const { data: pool } = usePoolById(poolId)
  const { data: poolLocked } = usePoolLocked(poolId)
  const { data: poolUsers } = usePoolUsers(poolId)
  const accountUser = useAccountUser(poolUsers)
  const poolShare = useMemo(
    () => accountUser && poolLocked && new Percent(accountUser.balance.toString(), poolLocked.toString()),
    [accountUser, poolLocked],
  )
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
          <tr>
            <td>0xf420c82...AA26E</td>
            <td>13.4340 ALM</td>
            <td>5.2238 ALM</td>
          </tr>
          <tr>
            <td>0xf420c82...AA26E</td>
            <td>13.4340 ALM</td>
            <td>5.2238 ALM</td>
          </tr>
          <tr>
            <td>0xf420c82...AA26E</td>
            <td>13.4340 ALM</td>
            <td>5.2238 ALM</td>
          </tr>
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
