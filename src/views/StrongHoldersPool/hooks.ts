import { parseUnits } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import { BigNumber, Contract } from 'ethers'
import { useToken } from 'hooks/Tokens'
import { useShpContract, useTokenContract } from 'hooks/useContract'
import { useEffect, useMemo } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { useCallWithGasPrice } from 'utils/useCallWithGasPrice'

export interface Pool {
  id: BigNumber
  withheldFunds: BigNumber
  leftTracker: BigNumber
  createdAt: BigNumber
}

export interface User {
  account: string
  balance: BigNumber
  paid: boolean
  leftId: BigNumber
}

export function getAllPoolsIds(currentPoolId: BigNumber): BigNumber[] {
  const ids: BigNumber[] = []
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

const createContractFetcher =
  (contract: Contract) =>
  <T>(method, ...args): T =>
    contract[method](...args)

export function useShpSWR<T>(methodAndArgs: [string, ...any], options?: SWRConfiguration) {
  const contract = useShpContract()
  return useSWR<T>(contract && methodAndArgs ? methodAndArgs : null, createContractFetcher(contract), {
    ...defaultSWROptions,
    ...options,
  })
}

export function useCurrentPoolId() {
  return useShpSWR<BigNumber>(['getCurrentPoolId'])
}

export function useMaxPoolLength() {
  return useShpSWR<BigNumber>(['MAX_POOL_LENGTH'], {
    revalidateIfStale: false,
  })
}

export function useRewardToken() {
  return useShpSWR<string>(['rewardToken'], {
    revalidateIfStale: false,
  })
}

export function usePoolLocked(poolId?: BigNumber) {
  return useShpSWR<BigNumber>(poolId ? ['totalLockedPoolTokens', poolId] : null)
}

export function usePoolUsers(poolId?: BigNumber) {
  return useShpSWR<User[]>(poolId ? ['users', poolId] : null)
}

export function useAccountUser(poolUsers?: User[]) {
  const { account } = useWeb3React()
  return useMemo(() => poolUsers?.find((user) => user.account === account), [account, poolUsers])
}

export function usePoolById(poolId?: BigNumber) {
  return useShpSWR<Pool>(poolId ? ['pools', poolId] : null)
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
  return useSWR<BigNumber>(
    rewardTokenContract ? ['balanceOf', account] : null,
    createContractFetcher(rewardTokenContract),
    defaultSWROptions,
  )
}

export function useRewardTokenAllowance() {
  const rewardTokenContract = useRewardTokenContract()
  const shpContract = useShpContract()
  const { account } = useWeb3React()
  return useSWR<BigNumber>(
    rewardTokenContract && account && shpContract ? ['allowance', account, shpContract.address] : null,
    createContractFetcher(rewardTokenContract),
    defaultSWROptions,
  )
}

export function useTotalLocked() {
  const contract = useShpContract()
  const { data: currentPoolId } = useCurrentPoolId()
  return useSWR<BigNumber>(
    contract && currentPoolId ? ['useTotalLocked', currentPoolId] : null,
    async () => {
      const lockedInPools: BigNumber[] = await Promise.all(
        getAllPoolsIds(currentPoolId).map((poolId) => contract.totalLockedPoolTokens(poolId)),
      )
      return lockedInPools.reduce((acc, locked) => acc.add(locked), BigNumber.from(0))
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

export function useYourPoolsIds() {
  const contract = useShpContract()
  const { account } = useWeb3React()
  const { data: currentPoolId } = useCurrentPoolId()
  return useSWR<BigNumber[]>(
    contract && currentPoolId ? ['useYourPoolIds', account, currentPoolId] : null,
    async () => {
      const ids: BigNumber[] = []
      const poolsUsers = await Promise.all(
        getAllPoolsIds(currentPoolId).map(async (poolId) => ({
          users: (await contract.users(poolId)) as User[],
          poolId,
        })),
      )
      poolsUsers.forEach((item) => {
        if (item.users.find((user) => user.account === account)) {
          ids.push(item.poolId)
        }
      })
      return ids
    },
    defaultSWROptions,
  )
}

export function useLeavePool(poolId?: BigNumber) {
  const contract = useShpContract()
  const fetcher = useMemo(() => contract && createContractFetcher(contract), [contract])
  useEffect(() => {
    if (contract) {
      const filter = contract.filters.Withdrawn()
      contract.queryFilter(filter).then(console.log)
    }
  }, [contract])
  return useMemo(() => poolId && fetcher && (() => fetcher('withdraw', poolId)), [fetcher, poolId])
}
