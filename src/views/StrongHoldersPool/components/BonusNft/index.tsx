import { useMemo } from 'react'
import styled from 'styled-components'
import { NftReward, useNftAllRewards } from 'views/StrongHoldersPool/hooks'
import NftItemCounter from '../NftItemCounter'
import Title from '../Title'

export default function BonusNft() {
  const { data: nftAllRewards } = useNftAllRewards()
  const bonusNft = useMemo<NftReward[]>(() => {
    const rewardsByTokenId: Record<string, NftReward> = {}
    if (nftAllRewards) {
      Object.values(nftAllRewards).forEach((rewards) => {
        rewards.forEach((reward) => {
          const tokenId = reward.tokenId.toString()
          rewardsByTokenId[tokenId] = {
            tokenId: reward.tokenId,
            amount: rewardsByTokenId[tokenId] ? rewardsByTokenId[tokenId].amount.add(reward.amount) : reward.amount,
          }
        })
      })
    }
    return Object.values(rewardsByTokenId)
  }, [nftAllRewards])

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
