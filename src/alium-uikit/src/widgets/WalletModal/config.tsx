import { isDev } from 'config'
import { bridgeNetworksChains } from 'constants/bridge/bridge.networks'
import { isMobile } from 'react-device-detect'
import Binance from './icons/Binance'
import BinanceChain from './icons/BinanceChain'
import EtherIcon from './icons/EtherIcon'
import Huobi from './icons/Huobi'
import Metamask from './icons/Metamask'
import OntoWallet from './icons/OntoWallet'
import PolygonMatic from './icons/PolygonMatic'
import TokenPocket from './icons/TokenPocket'
import TrustWallet from './icons/TrustWallet'
import WalletConnect from './icons/WalletConnect'
import { ConnectorNames, NetworksConfig, WalletsConfig, WalletShowOn } from './types'

const isWeb3Detect = () => {
  const global: any = process.browser && window
  return Boolean(global?.web3)
}

interface ConnectorArgs {
  browserConnector?: ConnectorNames
  mobileConnector?: ConnectorNames
  mobileAlternativeConnector?: ConnectorNames
}

const connector = (args: ConnectorArgs = {}) => {
  const {
    browserConnector = ConnectorNames.Injected,
    mobileConnector,
    mobileAlternativeConnector = ConnectorNames.WalletConnect,
  } = args

  const web3 = isWeb3Detect()

  const browser = !isMobile && web3
  const mobileWithWeb3 = isMobile && web3
  const mobileWithoutWeb3 = isMobile && !web3

  if (browser) {
    return browserConnector
  }
  if (mobileWithWeb3) {
    // can't detect wallet name, for mobile only walletconnect
    // return ConnectorNames.WalletConnect
    return mobileConnector || ConnectorNames.WalletConnect
  }
  if (mobileWithoutWeb3) {
    return mobileAlternativeConnector
  }
  return null
}

// When load isMobile not working, bad init, fix wallets as function
export const wallets = (): WalletsConfig[] => [
  {
    type: 'metamask',
    icon: Metamask,
    connectorId: connector({
      mobileConnector: ConnectorNames.Injected,
    }),
  },
  {
    type: 'trustWallet',
    icon: TrustWallet,
    connectorId: connector({
      mobileConnector: ConnectorNames.Injected,
      browserConnector: ConnectorNames.WalletConnect,
    }),
    showOn: WalletShowOn.mobile,
  },
  // {
  //   type: 'mathWallet',
  //   icon: MathWallet,
  //   connectorId: ConnectorNames.Injected,
  // },
  {
    type: 'tokenPocket',
    icon: TokenPocket,
    connectorId: connector({
      mobileConnector: ConnectorNames.Injected,
      browserConnector: ConnectorNames.WalletConnect,
    }),
  },
  {
    type: 'walletConnect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
  },
  {
    type: 'binanceChain',
    icon: BinanceChain,
    connectorId: connector({
      mobileConnector: ConnectorNames.WalletConnect,
      mobileAlternativeConnector: ConnectorNames.WalletConnect,
      browserConnector: ConnectorNames.BSC,
    }),
    showOn: WalletShowOn.desktop,
  },
  {
    type: 'ontoWallet',
    icon: OntoWallet,
    connectorId: ConnectorNames.WalletConnect,
  },
]

export const networksProd: NetworksConfig[] = [
  {
    type: 'binance',
    icon: Binance,
    chainId: 56,
    supportConnectors: [ConnectorNames.BSC, ConnectorNames.WalletConnect, ConnectorNames.Injected],
    direction: 'bsc',
  },
  {
    type: 'huobi',
    icon: Huobi,
    chainId: 128,
    supportConnectors: [ConnectorNames.Injected, ConnectorNames.WalletConnect],
    direction: 'heco',
  },
  {
    type: 'polygon',
    icon: PolygonMatic,
    chainId: 137,
    supportConnectors: [ConnectorNames.Injected, ConnectorNames.WalletConnect],
    direction: 'polygon',
  },
  {
    type: 'ethereum',
    icon: EtherIcon,
    chainId: 1,
    supportConnectors: [ConnectorNames.Injected, ConnectorNames.WalletConnect],
    direction: 'eth',
  },
]
export const networksDev: NetworksConfig[] = [
  {
    type: 'binance',
    icon: Binance,
    chainId: 97,
    supportConnectors: [ConnectorNames.BSC, ConnectorNames.WalletConnect, ConnectorNames.Injected],
    direction: 'bsc',
  },
  {
    type: 'huobi',
    icon: Huobi,
    chainId: 256,
    supportConnectors: [ConnectorNames.Injected, ConnectorNames.WalletConnect],
    direction: 'heco',
  },
  {
    type: 'polygon',
    icon: PolygonMatic,
    chainId: 80001,
    supportConnectors: [ConnectorNames.Injected, ConnectorNames.WalletConnect],
    direction: 'polygon_test',
  },
  {
    type: 'ethereum',
    icon: EtherIcon,
    chainId: 4,
    supportConnectors: [ConnectorNames.Injected, ConnectorNames.WalletConnect],
    direction: 'rinkeby',
  },
]

export const getNetworks = () => {
  return isDev ? networksDev : networksProd
}

export const getBridgeNetworks = (): NetworksConfig[] => {
  const networks = getNetworks()
  return networks.reduce((configs, network) => {
    const exist = bridgeNetworksChains.find((bridge) => bridge === network.chainId)
    if (exist) {
      configs.push(network)
    }
    return configs
  }, [])
}
