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
import { useDispatch } from 'react-redux'
import { setConnectionError } from 'state/application/actions'
import { useToast } from 'state/hooks'
import { storeNetwork } from 'store/network/useStoreNetwork'
import { checkSupportConnect } from 'utils/connection/notifyWeb3'
import { clearWalletConnect } from 'utils/connection/walletConnect'
import GTM from 'utils/gtm'
import { getConnectorsByName } from 'utils/web3React'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const { toastError } = useToast()
  const dispatch = useDispatch()
  const sendDataToGTM = useGTMDispatch()

  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      try {
        const { chainId, connector } = getConnectorsByName(connectorID)
        // Remove Later
        const support = checkSupportConnect(connectorID)
        if (!support) {
          toastError('Provider Error', 'No provider was found. Please change provider')
          return null
        }
        //

        if (connector) {
          await activate(connector, async (error: Error) => {
            if (error instanceof UnsupportedChainIdError) {
              const hasSetup = await storeNetwork.getState().setupNetwork()
              if (hasSetup) {
                try {
                  await activate(connector, (err) => {
                    toastError('Unsupported chain', err.message)
                    removeConnectorId()
                    clearWalletConnect()
                  })
                } catch (err) {
                  console.error('err :>> ', err)
                }
              } else {
                // if ethereum change network in wallet
                const messageErr =
                  chainId === 1 || chainId === 4 ? 'Please change network in your wallet' : 'Please change network'
                toastError(`Can't setup connect`, messageErr)
                deactivate()
              }
            } else {
              removeConnectorId()
              if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
                toastError('Provider Error', 'No provider was found')
              } else if (
                error instanceof UserRejectedRequestErrorInjected ||
                error instanceof UserRejectedRequestErrorWalletConnect
              ) {
                if (connector instanceof WalletConnectConnector) {
                  const walletConnector = connector as WalletConnectConnector
                  walletConnector.walletConnectProvider = null
                }
                toastError('Authorization Error', 'Please authorize to access your account')
              } else {
                dispatch(setConnectionError({ error }))
                // toastError(error.name, error.message)
              }
            }
          })
          GTM.connectWallet(sendDataToGTM, chainId)
        } else {
          // toastError("Can't find connector", 'The connector config is wrong')
        }
      } catch (error) {
        dispatch(setConnectionError({ error }))
      }
    },
    [toastError, activate, sendDataToGTM, deactivate, dispatch],
  )

  const logout = async () => {
    await deactivate()
  }
  return { login, logout }
}

export default useAuth
