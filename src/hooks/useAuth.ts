import { ChainId } from '@alium-official/sdk'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
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
  const web3 = process.browser && window.web3
  const { toastError } = useToast()
  const sendDataToGTM = useGTMDispatch()
  const { setConnectionError, toggleLoadConnection } = useStoreNetwork()

  const login = useCallback(
    // offIndicate for eager connect
    async (connectorID: ConnectorNames, offIndicate?: boolean) => {
      try {
        const { chainId, connector } = getConnectorsByName(connectorID)
        toggleLoadConnection(true)

        if (connector) {
          await activate(connector, async (error: Error) => {
            await errorHandlerWithRetry(error, chainId, connector)
          })
          GTM.connectWallet(sendDataToGTM, chainId)
          setConnectionError(null)
        } else {
          !offIndicate && !web3 && toastError(WEB3NetworkErrors.WEB3NOTEXIST)
        }
      } catch (error) {
        // toastError(WEB3NetworkErrors.NOPROVIDER)
        // dispatch(setConnectionError({ error }))
      } finally {
        toggleLoadConnection(false)
      }
    },
    [activate, sendDataToGTM, setConnectionError, toastError, deactivate],
  )

  const retryConnect = async (chainId: ChainId, connector) => {
    const hasSetup = await storeNetwork.getState().setupNetwork(chainId)
    if (hasSetup) {
      try {
        await activate(connector, async (err) => {
          const messageErr = WEB3NetworkErrors.UNSUPPORTED_CHAIN
          await logout()
          // timeout but after activate make clear errors
          setTimeout(() => {
            toastError(messageErr, err.message)
            removeConnectorId()
            setConnectionError(messageErr)
          }, 0)
        })
        setConnectionError(null)
      } catch (err) {
        console.error('err :>> ', err)
      }
    } else {
      // if ethereum change network in wallet
      const messageErr = WEB3NetworkErrors.CANTSETUP
      toastError(messageErr)
      setConnectionError(messageErr)
      await logout()
    }
  }

  const errorHandlerWithRetry = async (error: unknown, chainId: ChainId, connector) => {
    if (error instanceof UnsupportedChainIdError) {
      await retryConnect(chainId, connector)
    } else {
      removeConnectorId()
      if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
        toastError(WEB3NetworkErrors.NOPROVIDER)
      } else if (
        error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorWalletConnect
      ) {
        toastError(WEB3NetworkErrors.NOAUTH)
      } else {
        // dispatch(setConnectionError({ error }))
        // toastError(error.name, error.message)
        // toastError(WEB3NetworkErrors.NOPROVIDER)
      }
    }
  }

  const logout = async () => {
    toggleLoadConnection(true)
    clearWalletConnect()
    await deactivate()
    toggleLoadConnection(false)
  }
  return { login, logout }
}

export default useAuth
