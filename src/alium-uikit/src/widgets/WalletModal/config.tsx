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


const isMobileWallet = (anotherWallet: ConnectorNames) => {
  return isMobile ? ConnectorNames.WalletConnect : anotherWallet
}

const isWeb3Detect = () => {
  const global: any = process.browser && window
  return Boolean(global?.web3)
}

export const wallets: WalletsConfig[] = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'Trust Wallet',
    icon: TrustWallet,
    connectorId: isWeb3Detect() ? ConnectorNames.Injected : isMobileWallet(ConnectorNames.Injected),
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
    connectorId: isMobile && isWeb3Detect() ? ConnectorNames.Injected : ConnectorNames.WalletConnect,
  },
  {
    title: 'Wallet Connect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
  },
  {
    title: 'Binance Chain Wallet',
    icon: BinanceChain,
    connectorId: ConnectorNames.BSC,
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
