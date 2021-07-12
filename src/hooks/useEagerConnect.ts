import { ConnectorNames } from 'alium-uikit/src'
import { getConnectorId } from 'alium-uikit/src/util/connectorId/getConnectorId'
import useAuth from 'hooks/useAuth'
import { useEffect } from 'react'
import { storeNetwork } from 'store/network/useStoreNetwork'
import useChangeNetwork from './network/useChangeNetwork'
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
  useChangeNetwork(login)
  useReloadSwap(logout)

  useEffect(() => {
    const connectorId = getConnectorId()
    const { currentChainId } = storeNetwork.getState()

    if (connectorId) {
      if (connectorId === ConnectorNames.BSC && (currentChainId === 56 || currentChainId === 97)) {
        // Currently BSC extension doesn't always inject in time.
        // We must check to see if it exists, and if not, wait for it before proceeding.
        const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')
        if (!isBinanceChainDefined) {
          _binanceChainListener().then(() => login(connectorId))

          return
        }
      }

      login(connectorId)
    }
  }, [login])
}

export default useEagerConnect
