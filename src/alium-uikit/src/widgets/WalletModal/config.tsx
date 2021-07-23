import { isMobile } from 'react-device-detect'
import Binance from './icons/Binance'
import BinanceChain from './icons/BinanceChain'
import EtherIcon from './icons/EtherIcon'
import Huobi from './icons/Huobi'
import Metamask from './icons/Metamask'
import PolygonMatic from './icons/PolygonMatic'
import TokenPocket from './icons/TokenPocket'
import TrustWallet from './icons/TrustWallet'
import WalletConnect from './icons/WalletConnect'
import { ConnectorNames, NetworksConfig, WalletsConfig } from './types'

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
    mobileConnector = ConnectorNames.Injected,
    mobileAlternativeConnector = ConnectorNames.WalletConnect,
  } = args

  const web3 = isWeb3Detect()
  const browser = !isMobile && web3
  const mobileWithWeb3 = isMobile && web3
  const mobileWithoutWeb3 = isMobile && !web3
  console.log('-------------------')
  console.log('browser?', browser)
  console.log('mobileWithWeb3?', mobileWithWeb3)
  console.log('mobileWithoutWeb3?', mobileWithoutWeb3)
  console.log('-------------------')

  if (browser) {
    return browserConnector
  }
  if (mobileWithWeb3) {
    // can't detect wallet name, for mobile only walletconnect
    return ConnectorNames.WalletConnect
    // return mobileConnector
  }
  if (mobileWithoutWeb3) {
    return mobileAlternativeConnector
  }
  return null
}

// When load isMobile not working, bad init, fix wallets as function
export const wallets = (): WalletsConfig[] => [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: connector(),
  },
  {
    title: 'Trust Wallet',
    icon: TrustWallet,
    connectorId: connector(),
    mobile: true,
  },
  // {
  //   title: 'Math Wallet',
  //   icon: MathWallet,
  //   connectorId: ConnectorNames.Injected,
  // },
  {
    title: 'Token Pocket',
    icon: TokenPocket,
    connectorId: connector({
      mobileConnector: ConnectorNames.Injected,
      browserConnector: ConnectorNames.WalletConnect,
    }),
  },
  {
    title: 'Wallet Connect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
  },
  {
    title: 'Binance Chain Wallet',
    icon: BinanceChain,
    connectorId: connector({
      mobileConnector: ConnectorNames.WalletConnect,
      mobileAlternativeConnector: ConnectorNames.WalletConnect,
      browserConnector: ConnectorNames.BSC,
    }),
  },
]

export const networksProd: NetworksConfig[] = [
  {
    title: 'Binance',
    icon: Binance,
    label: 'Binance Smart Chain',
    chainId: 56,
    supportConnectors: [ConnectorNames.BSC, ConnectorNames.WalletConnect, ConnectorNames.Injected],
  },
  {
    title: 'Huobi',
    icon: Huobi,
    label: 'Huobi ECO Chain',
    chainId: 128,
    supportConnectors: [ConnectorNames.Injected],
  },
  {
    title: 'Polygon',
    icon: PolygonMatic,
    label: 'Polygon Matic Chain',
    chainId: 137,
    supportConnectors: [ConnectorNames.Injected],
  },
  {
    title: 'Ethereum',
    icon: EtherIcon,
    label: 'Ethereum Chain',
    chainId: 1,
    supportConnectors: [ConnectorNames.Injected],
  },
]

export const networksDev: NetworksConfig[] = [
  {
    title: 'Binance',
    icon: Binance,
    label: 'Binance Smart Chain',
    chainId: 97,
    supportConnectors: [ConnectorNames.BSC, ConnectorNames.WalletConnect, ConnectorNames.Injected],
  },
  {
    title: 'Huobi',
    icon: Huobi,
    label: 'Huobi ECO Chain',
    chainId: 256,
    supportConnectors: [ConnectorNames.Injected],
  },
  {
    title: 'Polygon',
    icon: PolygonMatic,
    label: 'Polygon Matic Chain',
    chainId: 80001,
    supportConnectors: [ConnectorNames.Injected],
  },
  {
    title: 'Ethereum',
    icon: EtherIcon,
    label: 'Ethereum Chain',
    chainId: 4,
    supportConnectors: [ConnectorNames.Injected],
  },
]
