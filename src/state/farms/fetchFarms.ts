import { FarmConfig } from 'config/constants/types'
import fetchFarm from './fetchFarm'

const fetchFarms = async (farmsToFetch: FarmConfig[]) => {
  const data = await Promise.all(
    farmsToFetch.map(async (farmConfig) => {
      const farm = await fetchFarm(farmConfig)
      // realize
      // const farmsWithPrices = await fetchFarmsPrices(farms)

      return farm
    }),
  )
  return data
}

export default fetchFarms
