import { FarmConfig } from 'config/constants/types'
import { FarmWithUserData } from 'state/types'
import fetchFarms from './fetchFarms'
import fetchFarmsPrices from './fetchFarmsPrices'
import {
  fetchFarmUserAllowances,
  fetchFarmUserEarnings,
  fetchFarmUserStakedBalances,
  fetchFarmUserTokenBalances,
} from './fetchFarmUser'
import { storeFarms } from './useStoreFarms'

// Public data
export const fetchFarmsPublicDataAsync = async (farmsList: FarmConfig[]) => {
  const farmsFetched = await fetchFarms(farmsList)
  //
  const farmsWithPrices = await fetchFarmsPrices(farmsFetched)
  // Filter out price helper LP config farms
  const farmsWithoutHelperLps = farmsWithPrices.filter((farm) => {
    return farm.pid || farm.pid === 0
  })
  return farmsWithoutHelperLps
}

// Farm Data with user data
export const fetchFarmUserDataAsync = async (account: string, currentPids?: number[]): Promise<FarmWithUserData[]> => {
  const farms = storeFarms.getState().farms
  const farmsConfig = farms
  const pids = currentPids || farmsConfig.map((farmToFetch) => farmToFetch.pid)

  const farmsToFetch = farms.filter((farmConfig) => pids.includes(farmConfig.pid))
  const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch)
  const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch)
  const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsToFetch)
  const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch)

  return userFarmAllowances.map((farmAllowance, index) => {
    return {
      pid: farmsToFetch[index].pid,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })
}
