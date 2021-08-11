import { BigintIsh, ChainId, Token } from '@alium-official/sdk'
import { BigNumber, Contract, ethers } from 'ethers'
import memoize from 'fast-memoize'
import { networkRpcUrlsList } from 'store/network/data/networkRpcUrlsList'

export type EtherProvider = ethers.providers.StaticJsonRpcProvider

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
const NETWORK_TIMEOUT = 1000

export const getRPCUrl = (chainId: ChainId, returnAsArray = false) =>
  returnAsArray ? networkRpcUrlsList[chainId || 1] : networkRpcUrlsList[chainId || 1]

const memoized = memoize((url) => new ethers.providers.StaticJsonRpcProvider(url))

const checkRPCHealth = async (url: string): Promise<EtherProvider> => {
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

export const getEthersProvider = async (chainId: number) => {
  const currentRPCUrls = getRPCUrl(chainId, true)
  const rpcURLs = currentRPCUrls

  const provider = (await Promise.all(rpcURLs.map(checkRPCHealth))).filter(
    (p) => !!p,
  )[0] as unknown as Promise<EtherProvider>

  return provider || null
}

export const fetchTokenBalance = async (token: Token, account: string): Promise<BigintIsh> => {
  const ethersProvider = await getEthersProvider(token.chainId)
  return fetchTokenBalanceWithProvider(ethersProvider, token, account)
}

export const fetchTokenBalanceWithProvider = async (ethersProvider: EtherProvider, token: Token, account: string) => {
  const address = token?.address
  if (address === ADDRESS_ZERO) {
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
