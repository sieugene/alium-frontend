import { useEffect, useState } from 'react'
import { useStoreAccount } from 'store/account/useStoreAccount'
import { useStoreNetwork } from 'store/network/useStoreNetwork'

export const InitStores = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  const initStoreAccount = useStoreAccount((state) => state.initStoreAccount)
  const killStoreAccount = useStoreAccount((state) => state.killStoreAccount)
  const initStoreNetwork = useStoreNetwork((state) => state.initStoreNetwork)
  const killStoreNetwork = useStoreNetwork((state) => state.killStoreNetwork)

  if (!isInitialized) {
    initStoreAccount()
    initStoreNetwork()
    setIsInitialized(true)
  }

  useEffect(() => {
    return () => {
      killStoreAccount()
      killStoreNetwork()
    }
  }, [killStoreAccount, killStoreNetwork])

  return null
}
