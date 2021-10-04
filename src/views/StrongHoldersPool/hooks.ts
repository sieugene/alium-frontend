import { Percent } from '@alium-official/sdk'
import { AddressZero } from '@ethersproject/constants'
import { parseUnits } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import { SHP_ABI, SHP_NFT_ABI } from 'config/constants/shp'
import { ethers } from 'ethers'
import { useToken } from 'hooks/Tokens'
import { useShpContract, useShpNftContract, useTokenContract } from 'hooks/useContract'
import times from 'lodash/times'
import { useMemo, useState } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { getShpAddress } from 'utils/addressHelpers'
import { multicallWithDecoder } from 'utils/multicall'
import { useCallWithGasPrice } from 'utils/useCallWithGasPrice'
import { getWeb3NoAccount } from 'utils/web3'

const SHP_NAMESPACE = 'shp'
const SHP_NFT_NAMESPACE = 'shp_nft'

export interface Pool {
  withheldFunds: ethers.BigNumber
  leftTracker: ethers.BigNumber
  createdAt: ethers.BigNumber
}

export interface User {
  account: string
  balance: ethers.BigNumber
  paid: boolean
  leftId: ethers.BigNumber
}

export interface Withdrawn {
  poolId: ethers.BigNumber
  account: string
  amount: ethers.BigNumber
}

export interface NftReward {
  tokenId: ethers.BigNumber
  amount: ethers.BigNumber
}

export function getAllPoolsIds(currentPoolId: ethers.BigNumber): ethers.BigNumber[] {
  const ids: ethers.BigNumber[] = []
  let iterator = currentPoolId
  while (iterator.gte(0)) {
    ids.push(iterator)
    iterator = iterator.sub(1)
  }
  return ids
}

const defaultSWROptions: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
}

type ContractFetcherArgs = [string, string, ...any]

const createContractFetcher =
  (contract: ethers.Contract) =>
  <T>(...[_swrNamespace, method, ...args]: ContractFetcherArgs): T =>
    contract[method](...args)

export function useSWRContract<T>(args: ContractFetcherArgs, contract?: ethers.Contract, options?: SWRConfiguration) {
  return useSWR<T>(contract && args ? args : null, createContractFetcher(contract), {
    ...defaultSWROptions,
    ...options,
  })
}

export function useCurrentPoolId() {
  return useSWRContract<ethers.BigNumber>([SHP_NAMESPACE, 'getCurrentPoolId'], useShpContract())
}

export function useMaxPoolLength() {
  return useSWRContract<ethers.BigNumber>([SHP_NAMESPACE, 'MAX_POOL_LENGTH'], useShpContract(), {
    revalidateIfStale: false,
  })
}

export function useRewardToken() {
  return useSWRContract<string>([SHP_NAMESPACE, 'rewardToken'], useShpContract(), {
    revalidateIfStale: false,
  })
}

export function usePoolLocked(poolId?: ethers.BigNumber) {
  return useSWRContract<ethers.BigNumber>(
    poolId ? [SHP_NAMESPACE, 'totalLockedPoolTokens', poolId] : null,
    useShpContract(),
  )
}

export function usePoolUsers(poolId?: ethers.BigNumber) {
  return useSWRContract<User[]>(poolId ? [SHP_NAMESPACE, 'users', poolId] : null, useShpContract())
}

export function usePoolById(poolId?: ethers.BigNumber) {
  return useSWRContract<Pool>(poolId ? [SHP_NAMESPACE, 'pools', poolId] : null, useShpContract())
}

export function usePoolAccountUser(poolId?: ethers.BigNumber) {
  const { data: poolUsers } = usePoolUsers(poolId)
  const { account } = useWeb3React()
  return useMemo(() => poolUsers?.find((user) => user.account === account), [account, poolUsers])
}

export function useRewardTokenInfo() {
  const { data } = useRewardToken()
  const rewardTokenInfo = useToken(data)
  return {
    rewardTokenInfo,
    rewardTokenSymbol: rewardTokenInfo?.symbol || '',
  }
}

export function useRewardTokenContract() {
  const { data } = useRewardToken()
  return useTokenContract(data)
}

export function useRewardTokenBalance() {
  const rewardTokenContract = useRewardTokenContract()
  const { account } = useWeb3React()
  return useSWRContract<ethers.BigNumber>([SHP_NAMESPACE, 'balanceOf', account], rewardTokenContract)
}

export function useRewardTokenAllowance() {
  const rewardTokenContract = useRewardTokenContract()
  const shpContract = useShpContract()
  const { account } = useWeb3React()
  return useSWRContract<ethers.BigNumber>(
    account && shpContract ? [SHP_NAMESPACE, 'allowance', account, shpContract.address] : null,
    rewardTokenContract,
  )
}

export function useTotalLocked() {
  const { data: currentPoolId } = useCurrentPoolId()
  return useSWR<ethers.BigNumber>(
    currentPoolId ? [SHP_NAMESPACE, 'useTotalLocked', currentPoolId] : null,
    async () => {
      let ret: ethers.BigNumber = ethers.BigNumber.from(0)
      const shpAddress = getShpAddress()
      const results: Array<[ethers.BigNumber]> = await multicallWithDecoder(
        SHP_ABI,
        getAllPoolsIds(currentPoolId).map((poolId) => ({
          address: shpAddress,
          name: 'totalLockedPoolTokens',
          params: [poolId],
        })),
      )
      results.forEach(([value]) => {
        ret = ret.add(value)
      })
      return ret
    },
    defaultSWROptions,
  )
}

export function useJoinPool() {
  const contract = useShpContract()
  const { account } = useWeb3React()
  const rewardTokenContract = useRewardTokenContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const approve = useMemo(() => {
    if (!rewardTokenContract || !contract) return
    return async (amount: number) => {
      const tx = await callWithGasPrice(rewardTokenContract, 'approve', [
        contract.address,
        parseUnits(amount.toString()),
      ])
      return tx.wait()
    }
  }, [callWithGasPrice, contract, rewardTokenContract])
  const join = useMemo(() => {
    if (!contract) return
    return async (amount: number) => {
      const tx = await contract.lock(account, parseUnits(amount.toString()))
      return tx.wait()
    }
  }, [account, contract])
  return {
    approve,
    join,
  }
}

export function useYourPools() {
  const { data: currentPoolId } = useCurrentPoolId()
  const { account } = useWeb3React()
  const allPoolsIds = useMemo(() => currentPoolId && getAllPoolsIds(currentPoolId), [currentPoolId])
  return useSWR<ethers.BigNumber[]>(
    allPoolsIds && account ? [SHP_NAMESPACE, 'useYourPools', account, allPoolsIds.length] : null,
    async () => {
      const ids: ethers.BigNumber[] = []
      const shpAddress = getShpAddress()
      const results: Array<[User[]]> = await multicallWithDecoder(
        SHP_ABI,
        allPoolsIds.map((poolId) => ({
          address: shpAddress,
          name: 'users',
          params: [poolId],
        })),
      )
      results.forEach(([users], i) => {
        if (users.find((user) => user.account === account)) {
          ids.push(allPoolsIds[i])
        }
      })
      return ids
    },
    defaultSWROptions,
  )
}

export function useLeavePool(poolId?: ethers.BigNumber) {
  const shpContract = useShpContract()
  const nftContract = useNftContract()
  const [loading, setLoading] = useState(false)
  const leavePool = useMemo(
    () =>
      poolId &&
      shpContract &&
      (async () => {
        try {
          setLoading(true)
          // ALM
          const shpTx: ethers.ContractTransaction = await shpContract.withdraw(poolId)
          await shpTx.wait()
          // TODO: NFT
          // const nftTx: ethers.ContractTransaction = await nftContract.claim()
          // await nftTx.wait()
        } finally {
          setLoading(false)
        }
      }),
    [poolId, shpContract],
  )
  return {
    leavePool,
    loading,
  }
}

export function useIsFullPool(poolId?: ethers.BigNumber) {
  const { data: poolUsers } = usePoolUsers(poolId)
  const { data: maxPoolLength } = useMaxPoolLength()
  return maxPoolLength?.eq(poolUsers?.length || 0)
}

export function usePoolWithdrawals(poolId?: ethers.BigNumber) {
  const contract = useShpContract()
  const web3 = getWeb3NoAccount()
  const { data: poolUsers } = usePoolUsers(poolId)
  const paidUsers = useMemo(() => poolUsers?.filter((user) => user.paid), [poolUsers])
  return useSWR<Withdrawn[]>(
    contract && poolId && paidUsers ? [SHP_NAMESPACE, 'usePoolWithdrawals', poolId, paidUsers.length] : null,
    async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      const filter = contract.filters.Withdrawn(poolId)
      const withdrawals: Withdrawn[] = []
      let iterator = blockNumber
      while (withdrawals.length < paidUsers.length) {
        // TODO: probably it's very slow!
        const fromBlock = iterator - 5000
        const res = await contract.queryFilter(filter, fromBlock, iterator)
        if (res.length > 0) {
          withdrawals.push(...res.map((e) => e.args as any as Withdrawn))
        }
        iterator = fromBlock
      }
      return withdrawals
    },
    defaultSWROptions,
  )
}

export function usePoolWithdrawPosition(poolId?: ethers.BigNumber) {
  const { data: poolUsers } = usePoolUsers(poolId)
  const { data: pool } = usePoolById(poolId)
  return useMemo(
    () => poolUsers && pool && ethers.BigNumber.from(poolUsers.length).sub(pool.leftTracker),
    [pool, poolUsers],
  )
}

export function useCountReward(poolId?: ethers.BigNumber) {
  const { account } = useWeb3React()
  return useSWRContract<ethers.BigNumber>(
    poolId && account ? [SHP_NAMESPACE, 'countReward', poolId, account] : null,
    useShpContract(),
  )
}

export function useCountRewardPercent(poolId?: ethers.BigNumber) {
  const { data: countReward } = useCountReward(poolId)
  const accountUser = usePoolAccountUser(poolId)
  const countRewardPercent = useMemo(
    () =>
      accountUser &&
      countReward &&
      new Percent(countReward.sub(accountUser.balance).toString(), accountUser.balance.toString()),
    [accountUser, countReward],
  )
  const isLoss = useMemo(() => countRewardPercent?.lessThan('0'), [countRewardPercent])
  return {
    countRewardPercent,
    isLoss,
  }
}

export function useNftRewardPoolAddress() {
  return useSWRContract<string>([SHP_NAMESPACE, 'nftRewardPool'], useShpContract(), {
    revalidateIfStale: false,
  })
}

export function useNftContract() {
  const { data: address } = useNftRewardPoolAddress()
  return useShpNftContract(address === AddressZero ? null : address)
}

export function useNftRewardToken() {
  const nftContract = useNftContract()
  return useSWRContract<string>([SHP_NFT_NAMESPACE, 'rewardToken'], nftContract)
}

export function useNftAllRewards() {
  const nftContract = useNftContract()
  const { data: maxPoolLength } = useMaxPoolLength()
  return useSWR<Record<string, NftReward[]>>(
    nftContract && maxPoolLength ? [SHP_NFT_NAMESPACE, 'useNftAllRewards', maxPoolLength] : null,
    async () => {
      const ret: Record<string, NftReward[]> = {}
      const positions = times(maxPoolLength.toNumber(), (i) => i + 1)
      const results: Array<[NftReward[]]> = await multicallWithDecoder(
        SHP_NFT_ABI,
        positions.map((position) => ({
          address: nftContract.address,
          name: 'getReward',
          params: [position],
        })),
      )
      results.forEach(([rewards], i) => {
        ret[positions[i]] = rewards
      })
      return ret
    },
    defaultSWROptions,
  )
}

export function usePoolNftWithdrawRewards(poolId?: ethers.BigNumber) {
  const withdrawPosition = usePoolWithdrawPosition(poolId)
  const { data } = useNftAllRewards()
  return data?.[withdrawPosition?.toString()]
}
