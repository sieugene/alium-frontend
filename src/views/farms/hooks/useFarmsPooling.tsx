import { fetchFarmUserDataAsync } from 'store/farms'
import { storeFarms } from 'store/farms/useStoreFarms'
import useSWR from 'swr'

// User farms data pooling
export const useFarmsPooling = (account?: string) => {
  const setFarmsUserData = storeFarms.getState().setFarmsUserData
  useSWR(
    account ? ['farms/pooling', account] : null,
    async () => {
      const fetchedFarms = await fetchFarmUserDataAsync(account)
      setFarmsUserData(fetchedFarms)
    },
    { refreshInterval: 6000 },
  )
}
