import { ChainId, Currency } from '@alium-official/sdk'
import { networkRpcUrlsList } from 'store/network/data/networkRpcUrlsList'
import { AddEthereumChainParameter } from 'types/AddEthereumChainParameter'

export const networkProvidersParamsList: { [key: number]: AddEthereumChainParameter } = {
  [ChainId.MAINNET]: {
    chainId: `0x${ChainId.MAINNET.toString(16)}`,
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: new Currency(18, 'BNB', 'Binance Coin'),
    rpcUrls: networkRpcUrlsList[ChainId.MAINNET],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  [ChainId.BSCTESTNET]: {
    chainId: `0x${ChainId.BSCTESTNET.toString(16)}`,
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: new Currency(18, 'BNB', 'Binance Coin'),
    rpcUrls: networkRpcUrlsList[ChainId.BSCTESTNET],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
  [ChainId.HECOMAINNET]: {
    chainId: `0x${ChainId.HECOMAINNET.toString(16)}`,
    chainName: 'Heco Chain Mainnet',
    nativeCurrency: new Currency(18, 'HT', 'Huobi Token'),
    rpcUrls: networkRpcUrlsList[ChainId.HECOMAINNET],
    blockExplorerUrls: ['https://hecoinfo.com/'],
  },
  [ChainId.HECOTESTNET]: {
    chainId: `0x${ChainId.HECOTESTNET.toString(16)}`,
    chainName: 'Heco Chain Testnet',
    nativeCurrency: new Currency(18, 'HT', 'Huobi Token'),
    rpcUrls: networkRpcUrlsList[ChainId.HECOTESTNET],
    blockExplorerUrls: ['https://testnet.hecoinfo.com/'],
  },
  [ChainId.MATIC_MAINNET]: {
    chainId: `0x${ChainId.MATIC_MAINNET.toString(16)}`,
    chainName: 'Polygon Matic Chain',
    nativeCurrency: new Currency(18, 'MATIC', 'Polygon Matic'),
    rpcUrls: networkRpcUrlsList[ChainId.MATIC_MAINNET],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  [ChainId.MATIC_TESTNET]: {
    chainId: `0x${ChainId.MATIC_TESTNET.toString(16)}`,
    chainName: 'Polygon Matic Chain',
    nativeCurrency: new Currency(18, 'MATIC', 'Polygon Matic'),
    rpcUrls: networkRpcUrlsList[ChainId.MATIC_TESTNET],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },
  [ChainId.ETHER_MAINNET]: {
    chainId: `0x${ChainId.ETHER_MAINNET.toString(16)}`,
    chainName: 'Ethereum Chain',
    nativeCurrency: new Currency(18, 'ETH', 'Ethereum'),
    rpcUrls: networkRpcUrlsList[ChainId.ETHER_MAINNET],
    blockExplorerUrls: ['https://etherscan.io/'],
  },
  [ChainId.ETHER_TESTNET]: {
    chainId: `0x${ChainId.ETHER_TESTNET.toString(16)}`,
    chainName: 'Ethereum Chain',
    nativeCurrency: new Currency(18, 'ETH', 'Ethereum'),
    rpcUrls: networkRpcUrlsList[ChainId.ETHER_TESTNET],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
  },
  [ChainId.ETHER_TESTNET]: {
    chainId: `0x${ChainId.ETHER_TESTNET.toString(16)}`,
    chainName: 'Ethereum Chain',
    nativeCurrency: new Currency(18, 'ETH', 'Ethereum'),
    rpcUrls: networkRpcUrlsList[ChainId.ETHER_TESTNET],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
  },
}
