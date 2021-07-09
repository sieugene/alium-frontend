import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { ConnectorNames } from 'alium-uikit/src'
import { getConnectorId } from 'alium-uikit/src/util/connectorId/getConnectorId'
import { useCallback, useEffect } from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'

/**
 * useChangeNetwork - when network be changed in wallet, retry login
 * @param    {activate} login   login by connector name
 */
const useChangeNetwork = (login: (connectorID: ConnectorNames) => Promise<any>) => {
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const { active, error, activate } = useWeb3ReactCore()
  const connect = useCallback(async () => {
    const currentConnectorId = getConnectorId()
    await login(currentConnectorId)
  }, [login])

  useEffect(() => {
    if (currentChainId) {
      connect()
    }
  }, [connect, currentChainId])

  useEffect(() => {
    const { ethereum } = window
    if (ethereum?.on && !active && !error) {
      ethereum.on('chainChanged', connect)
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', connect)
        }
      }
    }
    return undefined
  }, [active, error, activate, connect])
}

export default useChangeNetwork
