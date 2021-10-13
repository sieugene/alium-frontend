import { ChainId } from '@alium-official/sdk'
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
import { useActiveWeb3React } from 'hooks'
import React, { useCallback } from 'react'
import { useToast } from 'state/hooks'
import { storeNetwork, useStoreNetwork } from 'store/network/useStoreNetwork'
import GTM from 'utils/gtm'
import { getConnectorsByName } from 'utils/web3React'
import { WEB3NetworkErrors } from './../constants/network/NetworkErrors.contanst'

const useAuth = () => {
  const { activate, deactivate, connector } = useWeb3React()
  const web3 = process.browser && window.web3
  const { toastError } = useToast()
  const sendDataToGTM = useGTMDispatch()
  const { setConnectionError, toggleLoadConnection } = useStoreNetwork()

  // Observe success connection (Refactor later)
  const { account, chainId } = useActiveWeb3React()
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const load = useStoreNetwork((state) => state.loadConnection)
  const loginSuccess = React.useMemo(
    () => !load && account && currentChainId === chainId,
    [load, account, currentChainId, chainId],
  )

  React.useEffect(() => {
    if (loginSuccess) {
      toggleLoadConnection(load, account)
    }
  }, [account, load, loginSuccess, toggleLoadConnection])
  // end

  const errorHandlerWithRetry = useCallback(
    async (
      error: unknown,
      chainId: ChainId,
      connector,
      retryConnect: (chainId: ChainId, connector: any) => Promise<void>,
    ) => {
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
          // toastError(WEB3NetworkErrors.NOAUTH)
          await retryConnect(chainId, connector)
        } else {
          // dispatch(setConnectionError({ error }))
          // toastError(error.name, error.message)
          // toastError(WEB3NetworkErrors.NOPROVIDER)
        }
      }
    },
    [toastError],
  )

  const logout = useCallback(async () => {
    toggleLoadConnection(true)
    try {
      clearWalletConnect()
      await deactivate()
      if (connector instanceof WalletConnectConnector) {
        connector.close()
        connector.walletConnectProvider = null
      }
    } catch (error) {
      console.error(error)
    } finally {
      toggleLoadConnection(false)
    }
  }, [connector, deactivate, toggleLoadConnection])

  const retryConnect = useCallback(
    async (chainId: ChainId, connector) => {
      const hasSetup = await storeNetwork.getState().setupNetwork(chainId)

      const isWalletConnect = connector instanceof WalletConnectConnector
      if (hasSetup || isWalletConnect) {
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
    },
    [activate, logout, setConnectionError, toastError],
  )

  const endConnection = useCallback(
    (chainId: any) => {
      GTM.connectWallet(sendDataToGTM, chainId)
      setConnectionError(null)
      toggleLoadConnection(false)
    },
    [sendDataToGTM, setConnectionError, toggleLoadConnection],
  )

  const login = useCallback(
    // offIndicate for eager connect
    async (connectorID: ConnectorNames, offIndicate?: boolean) => {
      const load = storeNetwork.getState().loadConnection
      if (load) return
      try {
        const { chainId, connector } = getConnectorsByName(connectorID)
        toggleLoadConnection(true)

        if (connector) {
          await activate(connector, async (error: Error) => {
            await errorHandlerWithRetry(error, chainId, connector, retryConnect)
            // can long wait, clear here
            endConnection(chainId)
            // end
          })
          endConnection(chainId)
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
    // Infinite loop! (don't add new depend)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activate, sendDataToGTM, setConnectionError, toastError, deactivate],
  )

  return { login, logout }
}

const clearWalletConnect = () => {
  localStorage.removeItem('walletconnect')
}

export default useAuth
