import { ChainId } from '@alium-official/sdk'
import { networkRpcUrlsList } from 'store/network/data/networkRpcUrlsList'
import { AddEthereumChainParameter } from 'types/AddEthereumChainParameter'

export const networkProvidersParamsList: { [key: number]: AddEthereumChainParameter } = {
  [ChainId.MAINNET]: {
    chainId: `0x${ChainId.MAINNET.toString(16)}`,
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: networkRpcUrlsList[ChainId.MAINNET],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  [ChainId.BSCTESTNET]: {
    chainId: `0x${ChainId.BSCTESTNET.toString(16)}`,
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: networkRpcUrlsList[ChainId.BSCTESTNET],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
  [ChainId.HECOMAINNET]: {
    chainId: `0x${ChainId.HECOMAINNET.toString(16)}`,
    chainName: 'Heco Chain Mainnet',
    nativeCurrency: {
      name: 'Huobi Token',
      symbol: 'HT',
      decimals: 18,
    },
    rpcUrls: networkRpcUrlsList[ChainId.HECOMAINNET],
    blockExplorerUrls: ['https://hecoinfo.com/'],
  },
  [ChainId.HECOTESTNET]: {
    chainId: `0x${ChainId.HECOTESTNET.toString(16)}`,
    chainName: 'Heco Chain Testnet',
    nativeCurrency: {
      name: 'Huobi Token',
      symbol: 'HT',
      decimals: 18,
    },
    rpcUrls: networkRpcUrlsList[ChainId.HECOTESTNET],
    blockExplorerUrls: ['https://testnet.hecoinfo.com/'],
  },
  [ChainId.MATIC_MAINNET]: {
    chainId: `0x${ChainId.MATIC_MAINNET.toString(16)}`,
    chainName: 'Polygon Matic Chain',
    nativeCurrency: {
      name: 'Polygon Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: networkRpcUrlsList[ChainId.MATIC_MAINNET],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  [ChainId.MATIC_TESTNET]: {
    chainId: `0x${ChainId.MATIC_TESTNET.toString(16)}`,
    chainName: 'Polygon Matic Chain',
    nativeCurrency: {
      name: 'Polygon Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: networkRpcUrlsList[ChainId.MATIC_TESTNET],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },
  [ChainId.ETHER_MAINNET]: {
    chainId: `0x${ChainId.ETHER_MAINNET.toString(16)}`,
    chainName: 'Ethereum Chain',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: networkRpcUrlsList[ChainId.ETHER_MAINNET],
    blockExplorerUrls: ['https://etherscan.io/'],
  },
  [ChainId.ETHER_TESTNET]: {
    chainId: `0x${ChainId.ETHER_TESTNET.toString(16)}`,
    chainName: 'Ethereum Chain',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: networkRpcUrlsList[ChainId.ETHER_TESTNET],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
  },
  [ChainId.ETHER_TESTNET]: {
    chainId: `0x${ChainId.ETHER_TESTNET.toString(16)}`,
    chainName: 'Ethereum Chain',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: networkRpcUrlsList[ChainId.ETHER_TESTNET],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
  },
}
