import { Button, Skeleton } from 'alium-uikit/src'
import ConnectionLoad from 'alium-uikit/src/components/ConnectionLoad'
import { ethers } from 'ethers'
import useToast from 'hooks/useToast'
import { useToggle } from 'react-use'
import styled, { css } from 'styled-components'
import { ethersToBigNumber } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import {
  useCountRewardPercent,
  useIsFullPool,
  useLeavePool,
  usePoolAccountUser,
  usePoolById,
  usePoolLocked,
  usePoolUsers,
  usePoolWithdrawPosition,
  useRewardTokenInfo,
} from 'views/StrongHoldersPool/hooks'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import BonusNft from '../BonusNft'
import Card from '../Card'
import DetailsButton from '../DetailsButton'
import FormattedValue from '../FormattedValue'
import Title from '../Title'
import Details from './Details'
import PickUpFunds from './PickUpFunds'

export interface YourPoolCardProps {
  poolId: ethers.BigNumber
}

export default function YourPoolCard({ poolId }: YourPoolCardProps) {
  const { toastError } = useToast()
  const [isDetails, toggleDetails] = useToggle(false)
  const { mutate: mutatePool } = usePoolById(poolId)
  const { rewardTokenSymbol } = useRewardTokenInfo()
  const { mutate: mutatePoolUsers } = usePoolUsers(poolId)
  const { data: poolLocked } = usePoolLocked(poolId)
  const { leavePool, loading: leavePoolLoading } = useLeavePool(poolId)
  const { isLoss } = useCountRewardPercent(poolId)
  const accountUser = usePoolAccountUser(poolId)
  const withdrawPosition = usePoolWithdrawPosition(poolId)
  const isFullPool = useIsFullPool(poolId)
  return (
    <>
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
                <BonusNft />
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
              {withdrawPosition ? (
                <YourPoolCard.UsersCounter isLoss={isLoss} value={ethersToBigNumber(withdrawPosition)} />
              ) : (
                <Skeleton />
              )}
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
      <ConnectionLoad load={leavePoolLoading} />
    </>
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
  font-size: 24px;
  line-height: 30px;

  @media ${down(breakpoints.lg)} {
    font-size: 18px;
    line-height: 24px;
  }
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

    ${YourPoolCard.InfoFields} {
      & > * + * {
        margin-top: 16px;
      }
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
