import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useRefresh from 'hooks/useRefresh'
import { useEffect, useMemo } from 'react'
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync } from 'store/farms'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { farms } from './../../../config/constants/farms'
import { storeFarms, useStoreFarms } from './../../../store/farms/useStoreFarms'

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
  // farms
  const farmsList = usePollFarmsPublicData()
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
  return { farmsList, farmsUserDataLoading }
}

// refact this later (vanilla like method) <-- maybe in store
export const farmUserDataUpdate = async (account: string, currentPids?: number[]) => {
  const setFarmsUserData = storeFarms.getState().setFarmsUserData
  const setLoading = storeFarms.getState().toggleUserDataFarmsFetched
  try {
    setLoading(true)
    const fetchedFarms = await fetchFarmUserDataAsync(account, currentPids)
    setFarmsUserData(fetchedFarms)
  } catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }
}

export const useFarms = () => {
  const farms = useStoreFarms((state) => state.farms)
  return farms
}

export const useFarmsLoading = () => {
  const farmsLoading = useStoreFarms((state) => state.farmsLoading)
  const farmsUserDataLoading = useStoreFarms((state) => state.farmsUserDataLoading)
  return farmsLoading || farmsUserDataLoading
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

export const usePriceCakeBusd = (): BigNumber => {
  const cakeBnbFarm = useFarmFromPid(1)

  const cakePriceBusdAsString = cakeBnbFarm.token.busdPrice

  const cakePriceBusd = useMemo(() => {
    return new BigNumber(cakePriceBusdAsString)
  }, [cakePriceBusdAsString])

  return cakePriceBusd
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const farm = useFarmFromPid(pid)
  return farm && new BigNumber(farm.token.busdPrice)
}

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromLpSymbol(symbol)
  const farmTokenPriceInUsd = usePriceCakeBusd()
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

export function useUserFarmStakedOnly(isActive: boolean): [boolean, (stakedOnly: boolean) => void] {
  // const dispatch = useDispatch<AppDispatch>()
  // const userFarmStakedOnly = useSelector<AppState, AppState['user']['userFarmStakedOnly']>((state) => {
  //   return state.user.userFarmStakedOnly
  // })

  // const setUserFarmStakedOnly = useCallback(
  //   (stakedOnly: boolean) => {
  //     const farmStakedOnly = stakedOnly ? FarmStakedOnly.TRUE : FarmStakedOnly.FALSE
  //     dispatch(updateUserFarmStakedOnly({ userFarmStakedOnly: farmStakedOnly }))
  //   },
  //   [dispatch],
  // )

  // return [
  //   userFarmStakedOnly === FarmStakedOnly.ON_FINISHED ? !isActive : userFarmStakedOnly === FarmStakedOnly.TRUE,
  //   setUserFarmStakedOnly,
  // ]
  return [false, null]
}
