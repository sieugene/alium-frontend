import { parseUnits } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import { BigNumber, BigNumberish } from 'ethers'
import { useToken } from 'hooks/Tokens'
import { useShpContract, useTokenContract } from 'hooks/useContract'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getAllPoolsIds, shpSelectors, useShpStore } from 'store/shp'
import { useCallWithGasPrice } from 'utils/useCallWithGasPrice'

export const bnEqualityFn = (prev?: BigNumber, next?: BigNumber) => prev?.eq(next)

export function useMaxPoolLength() {
  const contract = useShpContract()
  const maxPoolLength = useShpStore((state) => state.maxPoolLength, bnEqualityFn)
  const fetchMaxPoolLength = useShpStore((state) => state.fetchMaxPoolLength)
  const refetch = useMemo(() => contract && (() => fetchMaxPoolLength(contract)), [contract, fetchMaxPoolLength])
  useEffect(() => {
    if (!maxPoolLength) {
      refetch?.()
    }
  }, [maxPoolLength, refetch])
  return { maxPoolLength, refetch }
}

export function useRewardToken() {
  const contract = useShpContract()
  const rewardToken = useShpStore((state) => state.rewardToken)
  const fetchRewardToken = useShpStore((state) => state.fetchRewardToken)
  const refetch = useMemo(() => contract && (() => fetchRewardToken(contract)), [contract, fetchRewardToken])
  useEffect(() => {
    if (!rewardToken) {
      refetch?.()
    }
  }, [refetch, rewardToken])
  return {
    rewardToken: useToken(rewardToken),
    refetch,
  }
}

export function useCurrentPoolId() {
  const contract = useShpContract()
  const currentPoolId = useShpStore((state) => state.currentPoolId, bnEqualityFn)
  const fetchCurrentPoolId = useShpStore((state) => state.fetchCurrentPoolId)
  const refetch = useMemo(() => contract && (() => fetchCurrentPoolId(contract)), [contract, fetchCurrentPoolId])
  useEffect(() => {
    refetch?.()
  }, [refetch])
  return { currentPoolId, refetch }
}

export function usePoolsCount() {
  const { currentPoolId } = useCurrentPoolId()
  // add 1 cuz currentPoolId starts with 0
  return useMemo(() => currentPoolId?.add(1), [currentPoolId])
}

export function useTotalLocked() {
  const contract = useShpContract()
  const totalLocked = useShpStore(shpSelectors.totalLocked)
  const fetchTotalLocked = useShpStore((state) => state.fetchTotalLocked)
  const { currentPoolId } = useCurrentPoolId()
  const refetch = useMemo(
    () => contract && currentPoolId && (() => fetchTotalLocked(contract, currentPoolId)),
    [contract, currentPoolId, fetchTotalLocked],
  )
  useEffect(() => {
    refetch?.()
  }, [refetch])
  return { totalLocked, refetch }
}

export function usePoolLength(poolId?: BigNumber) {
  const contract = useShpContract()
  const lengthByPoolId = useShpStore((state) => state.lengthByPoolId)
  const fetchPoolLength = useShpStore((state) => state.fetchPoolLength)
  const refetch = useMemo(
    () => contract && poolId && (() => fetchPoolLength(contract, poolId)),
    [contract, fetchPoolLength, poolId],
  )
  useEffect(() => {
    refetch?.()
  }, [refetch])
  return {
    poolLength: lengthByPoolId[poolId?.toString()],
    refetch,
  }
}

export function usePoolLocked(poolId?: BigNumber) {
  const contract = useShpContract()
  const lockedByPoolId = useShpStore((state) => state.lockedByPoolId)
  const fetchPoolLocked = useShpStore((state) => state.fetchPoolLocked)
  const refetch = useMemo(
    () => contract && poolId && (() => fetchPoolLocked(contract, poolId)),
    [contract, fetchPoolLocked, poolId],
  )
  useEffect(() => {
    refetch?.()
  }, [refetch])
  return {
    poolLocked: lockedByPoolId[poolId?.toString()],
    refetch,
  }
}

export function useJoinPool() {
  const contract = useShpContract()
  const { account } = useWeb3React()
  const { rewardToken } = useRewardToken()
  const tokenContract = useTokenContract(rewardToken?.address)
  const { callWithGasPrice } = useCallWithGasPrice()
  const approve = useMemo(() => {
    if (!tokenContract || !contract) return
    return async (amount: number) => {
      const tx = await callWithGasPrice(tokenContract, 'approve', [contract.address, toWei(amount)])
      return tx.wait()
    }
  }, [callWithGasPrice, contract, tokenContract])
  const join = useMemo(() => {
    if (!contract) return
    return async (amount: number) => {
      const tx = await contract.lock(account, toWei(amount))
      return tx.wait()
    }
  }, [account, contract])
  return {
    approve,
    join,
  }
}

export function useYourPools() {
  const { currentPoolId } = useCurrentPoolId()
  const contract = useShpContract()
  const fetchYourPools = useCallback(async () => {
    if (currentPoolId && contract) {
      const pools = await Promise.all(getAllPoolsIds(currentPoolId).map((poolId) => contract.pools(poolId)))
      console.log({ pools })
    }
  }, [contract, currentPoolId])
  useEffect(() => {
    fetchYourPools()
  }, [fetchYourPools])
  return []
}

export function useRewardTokenBalance() {
  const { rewardToken } = useRewardToken()
  const tokenContract = useTokenContract(rewardToken?.address)
  const [balance, setBalance] = useState<BigNumber>()
  const { account } = useWeb3React()
  const refetch = useMemo(
    () => tokenContract && (() => tokenContract.balanceOf(account).then(setBalance)),
    [account, tokenContract],
  )
  useEffect(() => {
    refetch?.()
  }, [refetch])
  return { balance, refetch }
}

export function toWei(ether: BigNumberish) {
  return parseUnits(ether.toString())
}

export function toEther(wei: BigNumber): BigNumber {
  return wei.div(BigNumber.from(10).pow(18))
}
