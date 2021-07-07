import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { ConnectorNames, getConnectorId } from 'alium-uikit/src'
import React from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'

/**
 * useChangeNetwork - when network be changed in wallet, retry login
 * @param    {activate} login   login by connector name
 */
const useChangeNetwork = (login: (connectorID: ConnectorNames) => Promise<any>) => {
  const { currentChainId } = useStoreNetwork()
  const { active, error, activate } = useWeb3ReactCore()
  const connect = React.useCallback(async () => {
    const currentConnectorId = getConnectorId()
    await login(currentConnectorId)
  }, [login])
  
  React.useEffect(() => {
    if (currentChainId) {
      connect()
    }
  }, [connect, currentChainId])

  React.useEffect(() => {
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
  }, [active, error, activate])
}

export default useChangeNetwork
