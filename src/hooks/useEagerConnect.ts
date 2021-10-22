import { getConnectorId } from 'alium-uikit/src/util/connectorId/getConnectorId'
import useAuth from 'hooks/useAuth'
import { useCallback, useEffect } from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { ConnectorNames } from './../alium-uikit/src/util/connectorId/setConnectorId'
import { useReloadSwap } from './network/useReloadSwap'

const _binanceChainListener = async () =>
  new Promise<void>((resolve) => {
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    })
  })

const useEagerConnect = () => {
  const { login, logout } = useAuth()
  useReloadSwap(logout)

  const currentChainId = useStoreNetwork((state) => state.currentChainId)

  const connect = useCallback(async () => {
    const connectorId = getConnectorId()
    if (connectorId) {
      if (connectorId && connectorId === ConnectorNames.BSC && (currentChainId === 56 || currentChainId === 97)) {
        // Currently BSC extension doesn't always inject in time.
        // We must check to see if it exists, and if not, wait for it before proceeding.
        const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')
        if (!isBinanceChainDefined) {
          _binanceChainListener().then(() => login(connectorId))
          return
        }
      }
      await login(connectorId)
    }
  }, [login])

  useEffect(() => {
    if (currentChainId) {
      connect()
    }
  }, [connect, currentChainId])
}

export default useEagerConnect
