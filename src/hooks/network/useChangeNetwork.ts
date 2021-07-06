import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { ConnectorNames, getConnectorId } from 'alium-uikit/src'
import React from 'react'

/**
 * useChangeNetwork - when network be changed in wallet, retry login
 * @param    {activate} login   login by connector name
 */
const useChangeNetwork = (login: (connectorID: ConnectorNames) => Promise<any>) => {
  const { active, error, activate } = useWeb3ReactCore()
  React.useEffect(() => {
    const { ethereum } = window
    if (ethereum && ethereum.on && !active && !error) {
      const currentConnectorId = getConnectorId()
      const handleChainChanged = async () => {
        await login(currentConnectorId)
      }
      ethereum.on('chainChanged', handleChainChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
        }
      }
    }
    return undefined
  }, [active, error, activate])
}

export default useChangeNetwork
