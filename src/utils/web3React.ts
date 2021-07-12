import { BscConnector } from '@binance-chain/bsc-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ConnectorNames } from 'alium-uikit/src'
import { networksDev, networksProd } from 'alium-uikit/src/widgets/WalletModal/config'
import { storeNetwork } from 'store/network/useStoreNetwork'
import Web3 from 'web3'

export const getConnectorsByName = (connectorID: ConnectorNames) => {
  const POLLING_INTERVAL = 12000
  const { currentChainId, networkRpcUrl } = storeNetwork.getState()

  const isDev = process.env.APP_ENV === 'development'
  const networks = isDev ? networksDev : networksProd

  const supported = networks.find((network) => network.chainId === currentChainId)
  const supportedId = supported?.chainId

  const injected = new InjectedConnector({ supportedChainIds: [supportedId] })

  const walletconnect = new WalletConnectConnector({
    rpc: { [supportedId]: networkRpcUrl as string },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  })

  const bscConnector = new BscConnector({ supportedChainIds: [supportedId] })

  const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.BSC]: bscConnector
  }

  return { chainId: supportedId, connector: connectorsByName[connectorID] }
}

export const getLibrary = (provider: Web3) => {
  return provider
}
