import { useEffect, useRef } from 'react'
import { fetchFarmUserDataAsync } from 'store/farms'
import { storeFarms } from 'store/farms/useStoreFarms'

// User farms data pooling
export const useFarmsPooling = (_account: string) => {
  const timeout = useRef<any>()
  const poolingEnd = useRef(false)
  const account = useRef(_account)

  const setFarmsUserData = storeFarms.getState().setFarmsUserData

  async function subscribe() {
    if (!account.current) {
      return
    }
    if (poolingEnd.current) {
      return
    }
    console.info('Pooling : was started')
    // может быть утечка если зафейлится?
    const fetchedFarms = await fetchFarmUserDataAsync(account.current)
    setFarmsUserData(fetchedFarms)
    console.info('Pooling : was success, retry after 6 seconds')
    await new Promise((resolve) => {
      timeout.current = setTimeout(resolve, 6000)
    })
    // И снова вызовем subscribe() для получения следующего сообщения
    await subscribe()
  }

  const clear = () => {
    console.info('Pooling : was ended')
    poolingEnd.current = true
    clearTimeout(timeout.current)
  }

  useEffect(() => {
    clear()
    // restart
    account.current = _account
    poolingEnd.current = false
    subscribe()

    return () => {
      clear()
    }
  }, [_account])
}
