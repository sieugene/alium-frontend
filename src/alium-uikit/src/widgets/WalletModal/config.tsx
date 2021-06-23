import Metamask from './icons/Metamask'
import MathWallet from './icons/MathWallet'
import TokenPocket from './icons/TokenPocket'
import TrustWallet from './icons/TrustWallet'
import WalletConnect from './icons/WalletConnect'
import BinanceChain from './icons/BinanceChain'
import Binance from './icons/Binance'
import Huobi from './icons/Huobi'

import { WalletsConfig, ConnectorNames, NetworksConfig } from './types'
import { isMobile } from 'react-device-detect'

const isMobileWallet = (anotherWallet: ConnectorNames) => {
  return isMobile ? ConnectorNames.WalletConnect : anotherWallet
}

const isWeb3Detect = () => {
  const global: any = window
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
    chainId: 56,
  },
  {
    title: 'Huobi',
    icon: Huobi,
    label: 'Huobi ECO Chain',
    chainId: 128,
  },
]
