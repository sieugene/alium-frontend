import { Skeleton } from 'alium-uikit/src'
import { ethers } from 'ethers'
import styled, { css } from 'styled-components'
import { ethersToBN, toEther } from 'utils/bigNumber'
import {
  useCountReward,
  useCountRewardProfit,
  useIsFullPool,
  usePoolAccountUser,
  usePoolNftWithdrawRewards,
  useRewardTokenSymbol,
} from 'views/StrongHoldersPool/hooks'
import { isUserPaid } from 'views/StrongHoldersPool/utils'
import YourPoolCard from '.'
import NftItemReward from '../NftItemReward'
import Title from '../Title'

export interface PickUpFundsProps {
  poolId: ethers.BigNumber
}

export default function PickUpFunds({ poolId }: PickUpFundsProps) {
  const rewardTokenSymbol = useRewardTokenSymbol()
  const { data: countReward } = useCountReward(poolId)
  const { countRewardProfit, isLoss } = useCountRewardProfit(poolId)
  const accountUser = usePoolAccountUser(poolId)
  const nftRewards = usePoolNftWithdrawRewards(poolId)
  const isFullPool = useIsFullPool(poolId)
  const isPaid = accountUser && isUserPaid(accountUser)
  return (
    <>
      <Title>Pick up funds</Title>
      <PickUpFunds.Value>
        <PickUpFunds.Counters>
          {countReward ? (
            <YourPoolCard.Value value={toEther(ethersToBN(countReward))} tokenSymbol={rewardTokenSymbol} />
          ) : (
            <Skeleton />
          )}
          {countRewardProfit ? (
            <PickUpFunds.Profit style={{ visibility: isPaid ? 'hidden' : undefined }} isLoss={isLoss}>
              {`${isLoss ? '' : '+'}${countRewardProfit.toFixed()}%`}
            </PickUpFunds.Profit>
          ) : (
            <Skeleton />
          )}
        </PickUpFunds.Counters>
        {!isPaid && isFullPool && nftRewards?.map((_, key) => <NftItemReward key={key} />)}
      </PickUpFunds.Value>
    </>
  )
}

PickUpFunds.Counters = styled.div`
  min-width: 140px;
  max-width: 100%;
`

PickUpFunds.Value = styled.div`
  display: flex;
  align-items: center;

  ${NftItemReward.Root} {
    height: 50px;
  }
`

PickUpFunds.Profit = styled.div<{ isLoss?: boolean }>`
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
