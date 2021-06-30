import { isMobile } from 'react-device-detect'
import Binance from './icons/Binance'
import BinanceChain from './icons/BinanceChain'
import Huobi from './icons/Huobi'
import Metamask from './icons/Metamask'
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
    connectorId: isMobileWallet(ConnectorNames.Injected),
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

export const networks: NetworksConfig[] = [
  {
    title: 'Binance',
    icon: Binance,
    label: 'Binance Smart Chain',
    chainId: process.env.NODE_ENV === 'development' ? 97 : 56,
  },
  {
    title: 'Huobi',
    icon: Huobi,
    label: 'Huobi ECO Chain',
    chainId: 128,
  },
]
