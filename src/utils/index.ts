import { ChainId, Currency, CurrencyAmount, JSBI, Percent, ROUTER_ADDRESS, Token } from '@alium-official/sdk'
import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Provider, Web3Provider } from '@ethersproject/providers'
import { ROUTER_ABI } from 'config/contracts'
import { TokenAddressMap } from 'state/lists/hooks'
import { storeNetwork } from 'store/network/useStoreNetwork'
import { AliumVestingAbi, NFT_VESTING } from 'views/InvestorsAccount/constants'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

const ETHERSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '',
  [ChainId.BSCTESTNET]: 'testnet',
  [ChainId.HECOMAINNET]: '',
  [ChainId.HECOTESTNET]: 'testnet',
  [ChainId.ETHER_MAINNET]: '',
  [ChainId.ETHER_TESTNET]: 'testnet',
  [ChainId.MATIC_MAINNET]: '',
  [ChainId.MATIC_TESTNET]: 'testnet',
}

const EXPLORER_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: 'bscscan.com',
  [ChainId.BSCTESTNET]: 'testnet.bscscan.com',
  [ChainId.HECOMAINNET]: 'hecoinfo.com',
  [ChainId.HECOTESTNET]: 'testnet.hecoinfo.com',
  [ChainId.ETHER_MAINNET]: 'etherscan.io',
  [ChainId.ETHER_TESTNET]: 'rinkeby.etherscan.io',
  [ChainId.MATIC_MAINNET]: 'polygonscan.com',
  [ChainId.MATIC_TESTNET]: 'mumbai.polygonscan.com',
}

const EXPLORER_NAMES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: 'BscScan',
  [ChainId.BSCTESTNET]: 'BscScan Testnet',
  [ChainId.HECOMAINNET]: 'HecoScan',
  [ChainId.HECOTESTNET]: 'HecoScan Testnet',
  [ChainId.ETHER_MAINNET]: 'Etherscan',
  [ChainId.ETHER_TESTNET]: 'Etherscan Rinkeby Testnet',
  [ChainId.MATIC_MAINNET]: 'PolygonScan',
  [ChainId.MATIC_TESTNET]: 'PolygonScan Mumbai Testnet',
}

export const getExplorerName = (chainId: ChainId) => {
  const name = EXPLORER_NAMES[chainId]
  return name
}

export function getEtherscanLink(chainId: ChainId, data: string, type: 'transaction' | 'token' | 'address'): string {
  const prefix = `https://${ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[56]}bscscan.com`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

export function getExplorerLink(chainId: ChainId, data: string, type: 'transaction' | 'token' | 'address'): string {
  const url = EXPLORER_URLS[chainId] || EXPLORER_URLS[ChainId.MAINNET]
  // const prefix = `https://${EXPLORER_PREFIXES[chainId] || EXPLORER_PREFIXES[ChainId.MAINNET]}${url}`
  const prefix = `https://${url}`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// add 30% to default gas price
export async function calculateGasPrice(provider: Provider): Promise<BigNumber> {
  const defaultGasPrice = await provider.getGasPrice()

  return defaultGasPrice.mul(BigNumber.from(10000).add(BigNumber.from(3000))).div(BigNumber.from(10000))
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(Math.floor(num)), JSBI.BigInt(10000))
}

export function calculateSlippageAmount(value: CurrencyAmount, slippage: number): [JSBI, JSBI] {
  if (slippage < 0 || slippage > 10000) {
    throw Error(`Unexpected slippage value: ${slippage}`)
  }
  return [
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000)),
  ]
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

// account is optional
export function getRouterContract(chainId: ChainId, library: Web3Provider, account?: string): Contract {
  return getContract(chainId && ROUTER_ADDRESS[chainId], ROUTER_ABI, library, account)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(defaultTokens: TokenAddressMap, currency?: Currency): boolean {
  const { nativeCurrency } = storeNetwork.getState().networkProviderParams
  if (currency === nativeCurrency) return true
  return Boolean(currency instanceof Token && defaultTokens[currency.chainId]?.[currency.address])
}

export async function getAccountTotalBalance(account, library): Promise<number> {
  const contract = getContract(NFT_VESTING, AliumVestingAbi, library, account)
  const { 0: totalBalanceRaw } = await contract.getTotalBalanceOf(account)
  return Number(totalBalanceRaw.toString())
}
