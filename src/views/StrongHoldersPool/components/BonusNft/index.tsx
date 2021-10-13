import { ethers } from 'ethers'
import { useMemo } from 'react'
import styled from 'styled-components'
import { useIsFullPool, useNftAllRewards, usePoolWithdrawPosition } from 'views/StrongHoldersPool/hooks'
import NftItemCounter from '../NftItemCounter'

export interface BonusNftProps {
  poolId?: ethers.BigNumber
}

export default function BonusNft({ poolId }: BonusNftProps) {
  const isFullPool = useIsFullPool(poolId)
  const withdrawPosition = usePoolWithdrawPosition(poolId)
  const { data: nftAllRewards } = useNftAllRewards()
  const nftCounter = useMemo<ethers.BigNumber | undefined>(() => {
    if (nftAllRewards && withdrawPosition) {
      let ret = ethers.BigNumber.from(0)
      Object.keys(nftAllRewards).forEach((position) => {
        const isAlreadyClaimed = isFullPool && withdrawPosition.toNumber() < Number(position)
        nftAllRewards[position].forEach((reward) => {
          ret = ret.add(isAlreadyClaimed ? ethers.BigNumber.from(0) : reward.amount)
        })
      })
      return ret
    }
  }, [isFullPool, nftAllRewards, withdrawPosition])

  return nftCounter ? <NftItemCounter counter={nftCounter.toNumber()} /> : <></>
}

BonusNft.Items = styled.div`
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 8px;
  }
`
