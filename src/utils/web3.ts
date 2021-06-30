import { getChainId } from '@alium-official/uikit'
import getNodeUrl from 'utils/getRpcUrl'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'

const chainId = getChainId()
const RPC_URL = getNodeUrl(chainId)
// @ts-ignore
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

export { getWeb3NoAccount }
export default web3NoAccount
