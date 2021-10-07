import { ethers } from 'ethers'
import { useMemo } from 'react'
import styled from 'styled-components'
import { useIsFullPool, useNftAllRewards, usePoolWithdrawPosition } from 'views/StrongHoldersPool/hooks'
import { NftReward } from 'views/StrongHoldersPool/types'
import NftItemCounter from '../NftItemCounter'
import Title from '../Title'

export interface BonusNftProps {
  poolId?: ethers.BigNumber
}

export default function BonusNft({ poolId }: BonusNftProps) {
  const isFullPool = useIsFullPool(poolId)
  const withdrawPosition = usePoolWithdrawPosition(poolId)
  const { data: nftAllRewards } = useNftAllRewards()
  const bonusNft = useMemo<NftReward[]>(() => {
    const rewardsByTokenId: Record<string, NftReward> = {}

    if (nftAllRewards && withdrawPosition) {
      Object.keys(nftAllRewards).forEach((position) => {
        const isAlreadyClaimed = isFullPool && withdrawPosition.toNumber() < Number(position)

        nftAllRewards[position].forEach((reward) => {
          const tokenId = reward.tokenId.toString()
          const rewardAmount = isAlreadyClaimed ? ethers.BigNumber.from(0) : reward.amount

          if (rewardsByTokenId[tokenId]) {
            rewardsByTokenId[tokenId].amount = rewardsByTokenId[tokenId].amount.add(rewardAmount)
            return
          }

          rewardsByTokenId[tokenId] = {
            tokenId: reward.tokenId,
            amount: rewardAmount,
          }
        })
      })
    }

    return Object.values(rewardsByTokenId)
  }, [isFullPool, nftAllRewards, withdrawPosition])

  return bonusNft.length > 0 ? (
    <>
      <Title>Bonus NFT</Title>
      <BonusNft.Items>
        {bonusNft.map((reward) => (
          <NftItemCounter key={reward.tokenId.toString()} tokenId={reward.tokenId} counter={reward.amount.toNumber()} />
        ))}
      </BonusNft.Items>
    </>
  ) : null
}

BonusNft.Items = styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 8px;
  }
`
