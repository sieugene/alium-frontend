import { ConnectorNames, removeConnectorId } from '@alium-official/uikit'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { useCallback } from 'react'
import { setupNetwork } from '../utils/wallet'
import { connectorsByName } from '../utils/web3React'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback(async (connectorID: ConnectorNames) => {
    try {
      const connector = connectorsByName[connectorID]
      if (connector) {
        await activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            }
          } else {
            removeConnectorId()
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              console.error('Provider Error', 'No provider was found')
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              console.error('Authorization Error', 'Please authorize to access your account')
            } else {
              console.error(error.name, error.message)
            }
          }
        })
      } else {
        console.error("Can't find connector", 'The connector config is wrong')
      }
    } catch (error) {
      console.error(error.name, error.message)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { login, logout: deactivate }
}

export default useAuth
