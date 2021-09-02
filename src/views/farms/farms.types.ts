import { BigNumber } from 'ethers'

export type PoolInfoFarmResult = {
  accALMPerShare: BigNumber
  allocPoint: BigNumber
  depositFee: BigNumber
  lastRewardBlock: BigNumber
  lpToken: string
  tokenlockShare: BigNumber
} & PoolNumsArray

type PoolNumsArray = [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]
