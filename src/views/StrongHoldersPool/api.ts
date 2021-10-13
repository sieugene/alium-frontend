import { SHP_ABI, SHP_NFT_ABI } from 'config/constants/shp'
import { ethers } from 'ethers'
import { times } from 'lodash'
import { multicallWithDecoder } from 'utils/multicall'
import { NftReward, Pool, User, Withdrawn } from './types'
import { findUserByAccount } from './utils'

export function getMaxPoolLength(shpContract: ethers.Contract): Promise<ethers.BigNumber> {
  return shpContract.MAX_POOL_LENGTH()
}

export function getCurrentPoolId(shpContract: ethers.Contract): Promise<ethers.BigNumber> {
  return shpContract.getCurrentPoolId()
}

export function getRewardToken(shpContract: ethers.Contract): Promise<string> {
  return shpContract.rewardToken()
}

export function getPoolLocked(shpContract: ethers.Contract, poolId: ethers.BigNumber): Promise<ethers.BigNumber> {
  return shpContract.totalLockedPoolTokens(poolId)
}

export function getPoolUsers(shpContract: ethers.Contract, poolId: ethers.BigNumber): Promise<User[]> {
  return shpContract.users(poolId)
}

export function getPool(shpContract: ethers.Contract, poolId: ethers.BigNumber): Promise<Pool> {
  return shpContract.pools(poolId)
}

export function lock(
  shpContract: ethers.Contract,
  account: string,
  amount: ethers.BigNumber,
): Promise<ethers.ContractTransaction> {
  return shpContract.lock(account, amount)
}

export function countReward(
  shpContract: ethers.Contract,
  poolId: ethers.BigNumber,
  account: string,
): Promise<ethers.BigNumber> {
  return shpContract.countReward(poolId, account)
}

export function getNftRewardPool(shpContract: ethers.Contract): Promise<string> {
  return shpContract.nftRewardPool()
}

export function getTotalLocked(shpAddress: string, ids: ethers.BigNumber[]) {
  return multicallWithDecoder<Array<[ethers.BigNumber]>>(
    SHP_ABI,
    ids.map((id) => ({
      address: shpAddress,
      name: 'totalLockedPoolTokens',
      params: [id],
    })),
  )
}

export function getPools(shpAddress: string, ids: ethers.BigNumber[]) {
  return multicallWithDecoder<Array<Pool>>(
    SHP_ABI,
    ids.map((id) => ({
      address: shpAddress,
      name: 'pools',
      params: [id],
    })),
  )
}

export async function getYourPools(shpAddress: string, ids: ethers.BigNumber[], account: string) {
  const ret: ethers.BigNumber[] = []
  const results: Array<[User[]]> = await multicallWithDecoder(
    SHP_ABI,
    ids.map((id) => ({
      address: shpAddress,
      name: 'users',
      params: [id],
    })),
  )
  results.forEach(([users], i) => {
    if (findUserByAccount(users, account)) {
      ret.push(ids[i])
    }
  })
  return ret
}

export async function getPoolWithdrawals(
  shpContract: ethers.Contract,
  poolId: ethers.BigNumber,
  paidCount: number,
  currentBlockNumber: number,
) {
  const filter = shpContract.filters.Withdrawn(poolId)
  const withdrawals: Withdrawn[] = []
  let iterator = currentBlockNumber
  while (withdrawals.length < paidCount) {
    // TODO: probably it's very slow!
    // https://github.com/binance-chain/bsc/issues/113
    const fromBlock = iterator - 5000
    const res = await shpContract.queryFilter(filter, fromBlock, iterator)
    if (res.length > 0) {
      withdrawals.push(...res.map((e) => e.args as any as Withdrawn))
    }
    iterator = fromBlock
  }
  return withdrawals
}

export function withdraw(shpContract: ethers.Contract, poolId: ethers.BigNumber): Promise<ethers.ContractTransaction> {
  return shpContract.withdraw(poolId)
}

export function nftClaim(nftContract: ethers.Contract): Promise<ethers.ContractTransaction> {
  return nftContract.claim()
}

export function getNftLogs(nftContract: ethers.Contract, account: string): Promise<ethers.BigNumber[]> {
  return nftContract.getLogs(account)
}

export async function getAllNftRewards(nftContract: ethers.Contract, maxPoolLength: ethers.BigNumber) {
  const ret: Record<string, NftReward[]> = {}
  const positions = times(maxPoolLength.toNumber(), (i) => i + 1)
  const results = await multicallWithDecoder<Array<[NftReward[]]>>(
    SHP_NFT_ABI,
    positions.map((position) => ({
      address: nftContract.address,
      name: 'getReward',
      params: [position],
    })),
  )
  results.forEach(([rewards], i) => {
    const nonZeroRewards = rewards.filter((reward) => reward.amount.gt(0))
    if (nonZeroRewards.length > 0) {
      ret[positions[i]] = nonZeroRewards
    }
  })
  return ret
}
