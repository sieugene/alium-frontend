import { Percent } from '@alium-official/sdk'
import { parseUnits } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import * as ethers from 'ethers'
import { useToken } from 'hooks/Tokens'
import { useShpContract, useTokenContract } from 'hooks/useContract'
import { useMemo } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { useCallWithGasPrice } from 'utils/useCallWithGasPrice'
import { getWeb3NoAccount } from 'utils/web3'

export interface Pool {
  id: ethers.BigNumber
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

const createContractFetcher =
  (contract: ethers.Contract) =>
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
  return useShpSWR<ethers.BigNumber>(['getCurrentPoolId'])
}

export function useMaxPoolLength() {
  return useShpSWR<ethers.BigNumber>(['MAX_POOL_LENGTH'], {
    revalidateIfStale: false,
  })
}

export function useRewardToken() {
  return useShpSWR<string>(['rewardToken'], {
    revalidateIfStale: false,
  })
}

export function usePoolLocked(poolId?: ethers.BigNumber) {
  return useShpSWR<ethers.BigNumber>(poolId ? ['totalLockedPoolTokens', poolId] : null)
}

export function usePoolUsers(poolId?: ethers.BigNumber) {
  return useShpSWR<User[]>(poolId ? ['users', poolId] : null)
}

export function usePoolById(poolId?: ethers.BigNumber) {
  return useShpSWR<Pool>(poolId ? ['pools', poolId] : null)
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
  return useSWR<ethers.BigNumber>(
    rewardTokenContract ? ['balanceOf', account] : null,
    createContractFetcher(rewardTokenContract),
    defaultSWROptions,
  )
}

export function useRewardTokenAllowance() {
  const rewardTokenContract = useRewardTokenContract()
  const shpContract = useShpContract()
  const { account } = useWeb3React()
  return useSWR<ethers.BigNumber>(
    rewardTokenContract && account && shpContract ? ['allowance', account, shpContract.address] : null,
    createContractFetcher(rewardTokenContract),
    defaultSWROptions,
  )
}

export function useTotalLocked() {
  const contract = useShpContract()
  const { data: currentPoolId } = useCurrentPoolId()
  return useSWR<ethers.BigNumber>(
    contract && currentPoolId ? ['useTotalLocked', currentPoolId] : null,
    async () => {
      const lockedInPools: ethers.BigNumber[] = await Promise.all(
        getAllPoolsIds(currentPoolId).map((poolId) => contract.totalLockedPoolTokens(poolId)),
      )
      return lockedInPools.reduce((acc, locked) => acc.add(locked), ethers.BigNumber.from(0))
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
  return useSWR<ethers.BigNumber[]>(
    contract && currentPoolId ? ['useYourPoolIds', account, currentPoolId] : null,
    async () => {
      const ids: ethers.BigNumber[] = []
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

export function useLeavePool(poolId?: ethers.BigNumber) {
  const contract = useShpContract()
  const fetcher = useMemo(() => contract && createContractFetcher(contract), [contract])
  return useMemo(
    () =>
      poolId &&
      fetcher &&
      (async () => {
        const tx: ethers.ContractTransaction = await fetcher('withdraw', poolId)
        return tx.wait()
      }),
    [fetcher, poolId],
  )
}

export function usePoolWithdrawals(poolId?: ethers.BigNumber) {
  const contract = useShpContract()
  const web3 = getWeb3NoAccount()
  const { data: poolUsers } = usePoolUsers(poolId)
  const paidUsers = useMemo(() => poolUsers?.filter((user) => user.paid), [poolUsers])
  return useSWR<Withdrawn[]>(
    contract && poolId && paidUsers ? ['withdrawals', poolId, paidUsers.length] : null,
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

export function useCountReward(poolId?: ethers.BigNumber) {
  const { account } = useWeb3React()
  return useShpSWR<ethers.BigNumber>(poolId && account ? ['countReward', poolId, account] : null)
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
