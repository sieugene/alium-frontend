import { useEffect, useRef } from 'react'
import { fetchFarmUserDataAsync } from 'store/farms'
import { storeFarms } from 'store/farms/useStoreFarms'
import useSWR from 'swr'

// User farms data pooling
export const useFarmsPooling = (_account: string) => {
  const account = useRef(_account)
  const setFarmsUserData = storeFarms.getState().setFarmsUserData
  async function fetcher() {
    if (!account.current) {
      return
    }
    console.log('Pooling : start')
    const fetchedFarms = await fetchFarmUserDataAsync(account.current)
    setFarmsUserData(fetchedFarms)
    console.log('Pooling : end')
  }
  useSWR('farms/pooling', fetcher, { refreshInterval: 6000 })
  useEffect(() => {
    account.current = _account
  }, [_account])
}
