import { ConnectorNames, getChainId, getConnectorId } from 'alium-uikit/src'
import useAuth from 'hooks/useAuth'
import { useEffect } from 'react'

const _binanceChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    }),
  )

const useEagerConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorId = getConnectorId()
    const chainId = getChainId()

    if (connectorId) {
      if (connectorId === ConnectorNames.BSC && (chainId === 56 || chainId === 97)) {
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
