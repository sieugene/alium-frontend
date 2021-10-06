import { Skeleton } from 'alium-uikit/src'
import { ethers } from 'ethers'
import styled, { css } from 'styled-components'
import { ethersToBigNumber } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import {
  useCountReward,
  useCountRewardPercent,
  useIsFullPool,
  usePoolAccountUser,
  usePoolNftWithdrawRewards,
  useRewardTokenInfo,
} from 'views/StrongHoldersPool/hooks'
import YourPoolCard from '.'
import NftItemReward from '../NftItemReward'
import Title from '../Title'

export interface PickUpFundsProps {
  poolId: ethers.BigNumber
}

export default function PickUpFunds({ poolId }: PickUpFundsProps) {
  const { data: countReward } = useCountReward(poolId)
  const { countRewardPercent, isLoss } = useCountRewardPercent(poolId)
  const { rewardTokenSymbol } = useRewardTokenInfo()
  const accountUser = usePoolAccountUser(poolId)
  const nftRewards = usePoolNftWithdrawRewards(poolId)
  const isFullPool = useIsFullPool(poolId)
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
        {!accountUser?.paid &&
          isFullPool &&
          nftRewards?.map((reward, key) => <NftItemReward tokenId={reward.tokenId} key={key} />)}
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
