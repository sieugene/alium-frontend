import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { ConnectorNames } from 'alium-uikit/src'
import { removeConnectorId } from 'alium-uikit/src/util/connectorId/removeConnectorId'
import { useCallback } from 'react'
import { useToast } from 'state/hooks'
import { storeNetwork, useStoreNetwork } from 'store/network/useStoreNetwork'
import { clearWalletConnect } from 'utils/connection/walletConnect'
import GTM from 'utils/gtm'
import { getConnectorsByName } from 'utils/web3React'
import { WEB3NetworkErrors } from './../constants/network/NetworkErrors.contanst'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const { toastError } = useToast()
  const sendDataToGTM = useGTMDispatch()
  const { setConnectionError } = useStoreNetwork()

  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      try {
        const { chainId, connector } = getConnectorsByName(connectorID)

        if (connector) {
          await activate(connector, async (error: Error) => {
            if (error instanceof UnsupportedChainIdError) {
              const hasSetup = await storeNetwork.getState().setupNetwork(chainId)
              if (hasSetup) {
                try {
                  await activate(connector, (err) => {
                    toastError(WEB3NetworkErrors.UNSUPPORTED_CHAIN, err.message)
                    removeConnectorId()
                    clearWalletConnect()
                    setConnectionError(WEB3NetworkErrors.UNSUPPORTED_CHAIN)
                    deactivate()
                  })
                } catch (err) {
                  console.error('err :>> ', err)
                }
              } else {
                // if ethereum change network in wallet
                const messageErr =
                  chainId === 1 || chainId === 4 ? WEB3NetworkErrors.CANTSETUP_IN_WALLET : WEB3NetworkErrors.CANTSETUP
                toastError(messageErr)
                setConnectionError(messageErr)
                deactivate()
              }
            } else {
              removeConnectorId()
              if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
                toastError(WEB3NetworkErrors.NOPROVIDER)
              } else if (
                error instanceof UserRejectedRequestErrorInjected ||
                error instanceof UserRejectedRequestErrorWalletConnect
              ) {
                if (connector instanceof WalletConnectConnector) {
                  const walletConnector = connector as WalletConnectConnector
                  walletConnector.walletConnectProvider = null
                }
                toastError(WEB3NetworkErrors.NOAUTH)
              } else {
                // dispatch(setConnectionError({ error }))
                // toastError(error.name, error.message)
              }
            }
          })
          GTM.connectWallet(sendDataToGTM, chainId)
          setConnectionError(null)
        } else {
          // toastError("Can't find connector", 'The connector config is wrong')
        }
      } catch (error) {
        // dispatch(setConnectionError({ error }))
      }
    },
    [activate, sendDataToGTM, setConnectionError, toastError, deactivate],
  )

  const logout = async () => {
    clearWalletConnect()
    await deactivate()
  }
  return { login, logout }
}

export default useAuth
