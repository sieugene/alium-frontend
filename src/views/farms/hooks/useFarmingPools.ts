import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useRefresh from 'hooks/useRefresh'
import { useEffect, useMemo } from 'react'
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync } from 'store/farms'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { farms } from './../../../config/constants/farms'
import { useStoreFarms } from './../../../store/farms/useStoreFarms'

export const usePollFarmsPublicData = () => {
  const setFarms = useStoreFarms((state) => state.setFarms)
  const farmsLoading = useStoreFarms((state) => state.farmsLoading)
  const setLoading = useStoreFarms((state) => state.toggleFarmsFetched)
  const farmsList = useFarms()

  useEffect(() => {
    ;(async () => {
      if (farmsLoading) return
      setLoading(true)
      const farmsConfig = farms
      const farmsFetched = await fetchFarmsPublicDataAsync(farmsConfig)

      setFarms(farmsFetched)
      setLoading(false)
    })()
  }, [])

  return farmsList
}

export const usePollFarmsWithUserData = (includeArchive = false) => {
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()
  // hooks
  const setFarmsUserData = useStoreFarms((state) => state.setFarmsUserData)
  const farmsLoading = useStoreFarms((state) => state.farmsLoading)
  const farmsUserDataLoading = useStoreFarms((state) => state.farmsUserDataLoading)
  const setLoading = useStoreFarms((state) => state.toggleUserDataFarmsFetched)
  usePollFarmsPublicData()
  // state
  const loading = useMemo(() => !account || farmsLoading, [account, farmsLoading])

  useEffect(() => {
    ;(async () => {
      if (loading || farmsUserDataLoading) return
      setLoading(true)

      const farmsConfig = farms
      const pids = farmsConfig.map((farmToFetch) => farmToFetch.pid)

      const fetchedFarms = await fetchFarmUserDataAsync(account, pids)
      setFarmsUserData(fetchedFarms)

      setLoading(false)
    })()
  }, [loading, slowRefresh])
}

export const useFarms = () => {
  const farms = useStoreFarms((state) => state.farms)
  return farms
}

export const useFarmFromPid = (pid: number) => {
  const farm = useStoreFarms((state) => state.farms.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromLpSymbol = (lpSymbol: string) => {
  const farm = useStoreFarms((state) => state.farms.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid: number) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  }
}

// Return the base token price for a farm, from a given pid
export const useBnbPriceFromPid = (pid: number): BigNumber => {
  const farm = useFarmFromPid(pid)
  // @ts-ignore
  return farm?.token.almBnbPrice && new BigNumber(farm.token.almBnbPrice)
}

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromLpSymbol(symbol)
  const farmTokenPriceInUsd = useBnbPriceFromPid(farm.pid)
  let lpTokenPrice = BIG_ZERO

  if (farm.lpTotalSupply && farm.lpTotalInQuoteToken) {
    // Total value of base token in LP
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal)
    // Double it to get overall value in LP
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(new BigNumber(farm.lpTotalSupply))
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
  }

  return lpTokenPrice
}
