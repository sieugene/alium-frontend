import { BigNumber, Contract, ethers } from 'ethers'
import memoize from 'fast-memoize'

export const networkLabels = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Görli',
  42: 'Kovan',
  56: 'BSC',
  77: 'Sokol',
  100: 'xDai',
  97: 'BSC testnet',
  256: 'HECO testnet',
  80001: 'POLYGON testnet',
}

export const LOCAL_STORAGE_KEYS = {
  DONT_SHOW_CLAIMS: 'dont-show-claims',
  MAINNET_RPC_URL: 'mainnet-rpc-url',
  HECO_RPC_URL: 'heco-rpc-url',
  XDAI_RPC_URL: 'xdai-rpc-url',
  BSC_RPC_URL: 'bsc-rpc-url',
  BSC_TESTNET_RPC_URL: 'bsc-testnet-rpc-url',
  POLYGON_TESTNET_RPC_URL: 'polygon-testnet-rpc-url',
  ROPSTEN_TESTNET_RPC_URL: 'ropsten-testnet-rpc-url',
  RINKEBY_TESTNET_RPC_URL: 'rinkeby-testnet-rpc-url',
  KOVAN_RPC_URL: 'kovan-rpc-url',
  SOKOL_RPC_URL: 'sokol-rpc-url',
  NEVER_SHOW_CLAIMS: 'never-show-claims',
  INFINITE_UNLOCK: 'infinite-unlock',
  CUSTOM_TOKENS: 'customTokens',
  DISABLE_BALANCE_WHILE_TOKEN_FETCH: 'disable-balance-while-token-fetch',
  BRIDGE_DIRECTION: 'bridge-direction',
}

const {
  MAINNET_RPC_URL,
  KOVAN_RPC_URL,
  BSC_RPC_URL,
  BSC_TESTNET_RPC_URL,
  HECO_RPC_URL,
  POLYGON_TESTNET_RPC_URL,
  SOKOL_RPC_URL,
  XDAI_RPC_URL,
  ROPSTEN_TESTNET_RPC_URL,
  RINKEBY_TESTNET_RPC_URL,
} = LOCAL_STORAGE_KEYS

const RPC_URL = {
  1: MAINNET_RPC_URL,
  3: ROPSTEN_TESTNET_RPC_URL,
  4: RINKEBY_TESTNET_RPC_URL,
  42: KOVAN_RPC_URL,
  56: BSC_RPC_URL,
  77: SOKOL_RPC_URL,
  100: XDAI_RPC_URL,
  256: HECO_RPC_URL,
  97: BSC_TESTNET_RPC_URL,
  80001: POLYGON_TESTNET_RPC_URL,
}

export const getNetworkLabel = (chainId) => networkLabels[chainId] || 'Unknown'

const REACT_APP_XDAI_RPC_URL = 'https://rpc.xdaichain.com https://dai.poa.network'
const REACT_APP_HECO_RPC_URL = 'https://http-testnet.hecochain.com'
const REACT_APP_SOKOL_RPC_URL = 'https://sokol.poa.network'
const REACT_APP_MAINNET_RPC_URL =
  'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 https://mainnet-nethermind.blockscout.com/'
const REACT_APP_KOVAN_RPC_URL = 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161 https://kovan.poa.network/'
const REACT_APP_BSC_RPC_URL = 'https://bsc-dataseed.binance.org/'
const REACT_APP_BSC_TESTNET_RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const REACT_APP_POLYGON_TESTNET_RPC_URL = 'https://rpc-mumbai.maticvigil.com'
const REACT_APP_ROPSTEN_TESTNET_RPC_URL = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
const REACT_APP_RINKEBY_TESTNET_RPC_URL = 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'

export const networkNames = {
  1: 'ETH Mainnet',
  42: 'Kovan Testnet',
  56: 'Binance Smart Chain',
  97: 'Binance Smart Chain Testnet',
  77: 'Sokol Testnet',
  100: 'xDai Chain',
  256: 'HECO testnet',
  80001: 'POLYGON testnet',
  3: 'ROPSTEN testnet',
  4: 'RINKEBY testnet',
}

export const chainUrls = {
  1: {
    rpc: REACT_APP_MAINNET_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/eth/mainnet',
    chainId: 1,
    name: networkNames[1],
  },
  42: {
    rpc: REACT_APP_KOVAN_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/eth/kovan',
    chainId: 42,
    name: networkNames[42],
  },
  56: {
    rpc: REACT_APP_BSC_RPC_URL.split(' '),
    explorer: 'https://bscscan.com',
    chainId: 56,
    name: networkNames[56],
  },
  97: {
    rpc: REACT_APP_BSC_TESTNET_RPC_URL.split(' '),
    explorer: 'https://testnet.bscscan.com/',
    chainId: 97,
    name: networkNames[97],
  },
  80001: {
    rpc: REACT_APP_POLYGON_TESTNET_RPC_URL.split(' '),
    explorer: 'https://mumbai.polygonscan.com/',
    chainId: 80001,
    name: networkNames[80001],
  },
  77: {
    rpc: REACT_APP_SOKOL_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/poa/sokol',
    chainId: 77,
    name: networkNames[77],
  },
  100: {
    rpc: REACT_APP_XDAI_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/xdai/mainnet',
    chainId: 100,
    name: networkNames[100],
  },
  256: {
    rpc: REACT_APP_HECO_RPC_URL.split(' '),
    explorer: 'https://testnet.hecoinfo.com',
    chainId: 256,
    name: networkNames[256],
  },
  3: {
    rpc: REACT_APP_ROPSTEN_TESTNET_RPC_URL.split(' '),
    explorer: 'https://ropsten.etherscan.io/',
    chainId: 3,
    name: networkNames[3],
  },
  4: {
    rpc: REACT_APP_RINKEBY_TESTNET_RPC_URL.split(' '),
    explorer: 'https://rinkeby.etherscan.io/',
    chainId: 4,
    name: networkNames[4],
  },
}

export const getRPCUrl = (chainId, returnAsArray = false) =>
  returnAsArray ? chainUrls[chainId || 1].rpc : chainUrls[chainId || 1].rpc[0]

const NETWORK_TIMEOUT = 1000

const memoized = memoize((url) => new ethers.providers.StaticJsonRpcProvider(url))

const checkRPCHealth = async (url) => {
  if (!url) return null
  const tempProvider = memoized(url)
  if (!tempProvider) return null
  try {
    await Promise.race([
      // eslint-disable-next-line no-underscore-dangle
      tempProvider._networkPromise,
      setTimeout(() => Promise.reject(new Error('Network timeout')).catch(() => null), NETWORK_TIMEOUT),
    ])
    return tempProvider
  } catch (err) {
    // logError({ providerSetError: err.message })
    return null
  }
}

export const getEthersProvider = async (chainId) => {
  const label = getNetworkLabel(chainId).toUpperCase()
  const sessionHealthyURL = `HEALTHY-RPC-URL-${label}`
  const localRPCUrl = window.localStorage.getItem(RPC_URL[chainId])
  const currentRPCUrls = getRPCUrl(chainId, true)
  const rpcURLs = localRPCUrl?.length > 0 ? [localRPCUrl, ...currentRPCUrls] : currentRPCUrls

  const provider =
    (await checkRPCHealth(sessionStorage.getItem(sessionHealthyURL))) ||
    (await Promise.all(rpcURLs.map(checkRPCHealth))).filter((p) => !!p)[0]
  sessionStorage.setItem(sessionHealthyURL, provider.connection.url)
  return provider || null
}

export const fetchTokenBalance = async (token, account) => {
  const ethersProvider = await getEthersProvider(token.chainId)
  return fetchTokenBalanceWithProvider(ethersProvider, token, account)
}

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const fetchTokenBalanceWithProvider = async (ethersProvider, { address, mode }, account) => {
  if (address === ADDRESS_ZERO && mode === 'NATIVE') {
    return ethersProvider.getBalance(account)
  }
  if (!account || !address || address === ADDRESS_ZERO || !ethersProvider) {
    return BigNumber.from(0)
  }
  try {
    const abi = ['function balanceOf(address) view returns (uint256)']
    const tokenContract = new Contract(address, abi, ethersProvider)
    const balance = await tokenContract.balanceOf(account)
    return balance
  } catch (error) {}

  return BigNumber.from(0)
}
