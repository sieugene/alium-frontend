import { ConnectorNames, getConnectorId } from '@alium-official/uikit'
import useAuth from 'hooks/useAuth'
import { useEffect } from 'react'

const useEagerConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorId = getConnectorId()

    // Disable eager connect for BSC Wallet. Currently the BSC Wallet extension does not inject BinanceChain
    // into the Window object in time causing it to throw an error
    // TODO: Figure out an elegant way to listen for when the BinanceChain object is ready
    if (connectorId && connectorId !== ConnectorNames.BSC) {
      login(connectorId)
    }
  }, [login])
}

export default useEagerConnect
