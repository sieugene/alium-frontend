import { useWeb3React } from '@web3-react/core'
import { BigNumber, Contract } from 'ethers'
import { useMasterchef, useShpContract, useTokenContract } from 'hooks/useContract'
import times from 'lodash/times'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCallWithGasPrice } from 'utils/useCallWithGasPrice'
import create from 'zustand'

export interface ShpState {
  maxPoolLength?: BigNumber
  fetchMaxPoolLength: (contract: Contract) => any

  currentPoolId?: BigNumber
  currentPoolLoading: boolean
  fetchCurrentPoolId: (contract: Contract) => any

  totalLocked?: BigNumber
  fetchTotalLocked: (contract: Contract, poolsCount: BigNumber) => any
}

export const useShpStore = create<ShpState>((set, get) => ({
  currentPoolLoading: false,
  async fetchMaxPoolLength(contract) {
    set({
      maxPoolLength: await contract.MAX_POOL_LENGTH(),
    })
  },
  async fetchCurrentPoolId(contract) {
    // Simple request deduplication
    if (get().currentPoolLoading) {
      return
    }

    set({
      currentPoolLoading: true,
    })
    set({
      currentPoolId: await contract.getCurrentPoolId(),
      currentPoolLoading: false,
    })
  },
  async fetchTotalLocked(contract, poolsCount) {
    let totalLocked = BigNumber.from(0)
    await Promise.all(
      times(poolsCount.toNumber(), async (poolId) => {
        totalLocked = totalLocked.add(await contract.totalLockedPoolTokens(poolId))
      }),
    )
    set({
      totalLocked,
    })
  },
}))

export function useMaxPoolLength() {
  const contract = useShpContract()
  const maxPoolLength = useShpStore((state) => state.maxPoolLength)
  const fetchMaxPoolLength = useShpStore((state) => state.fetchMaxPoolLength)
  useEffect(() => {
    // maxPoolLength - contract constant
    if (!maxPoolLength && contract) {
      fetchMaxPoolLength(contract)
    }
  }, [contract, fetchMaxPoolLength, maxPoolLength])
  return maxPoolLength
}

export function useCurrentPoolId() {
  const contract = useShpContract()
  const currentPoolId = useShpStore((state) => state.currentPoolId)
  const fetchCurrentPoolId = useShpStore((state) => state.fetchCurrentPoolId)
  useEffect(() => {
    if (contract) {
      fetchCurrentPoolId(contract)
    }
  }, [contract, fetchCurrentPoolId])
  return currentPoolId
}

export function usePoolsCount() {
  const currentPoolId = useCurrentPoolId()
  // add 1 cuz currentPoolId starts with 0
  return useMemo(() => currentPoolId?.add(1), [currentPoolId])
}

export function useTotalLocked() {
  const contract = useShpContract()
  const totalLocked = useShpStore((state) => state.totalLocked)
  const fetchTotalLocked = useShpStore((state) => state.fetchTotalLocked)
  const poolsCount = usePoolsCount()
  useEffect(() => {
    if (contract && poolsCount) {
      fetchTotalLocked(contract, poolsCount)
    }
  }, [contract, fetchTotalLocked, poolsCount])
  return totalLocked
}

export function usePoolLength(poolId?: BigNumber) {
  const contract = useShpContract()
  const [length, setLength] = useState<BigNumber>()
  useEffect(() => {
    if (contract && poolId) {
      contract.poolLength(poolId).then(setLength)
    }
  }, [contract, poolId])
  return length
}

export function usePoolLocked(poolId?: BigNumber) {
  const contract = useShpContract()
  const [locked, setLocked] = useState<BigNumber>()
  useEffect(() => {
    if (contract && poolId) {
      contract.totalLockedPoolTokens(poolId).then(setLocked)
    }
  }, [contract, poolId])
  return locked
}

export function useJoinPool() {
  const masterChefContract = useMasterchef()
  const shpContract = useShpContract()
  const { account } = useWeb3React()
  const lpContract = useTokenContract('0x6f58acfaeb1bfdc9c4959c43adde7a3b63bf019f')
  const { callWithGasPrice } = useCallWithGasPrice()
  const amount = 100000
  return useCallback(async () => {
    if (shpContract && masterChefContract) {
      const tx = await callWithGasPrice(lpContract, 'approve', [masterChefContract.address, amount])
      await tx.wait()
      console.log(await shpContract.lock(account, amount))
    }
  }, [account, callWithGasPrice, lpContract, masterChefContract, shpContract])
}

export function useYourPools() {
  const currentPoolId = useCurrentPoolId()
  const contract = useShpContract()
  const fetchYourPools = useCallback(async () => {
    if (currentPoolId && contract) {
      const promises = []
      let iterator = currentPoolId
      // Fetch all pools
      while (iterator.gte(0)) {
        promises.push(contract.pools(iterator))
        iterator = iterator.sub(1)
      }
      const pools = await Promise.all(promises)
      console.log({ pools })
    }
  }, [contract, currentPoolId])
  useEffect(() => {
    fetchYourPools()
  }, [fetchYourPools])
  return []
}
