import { storeNetwork } from 'store/network/useStoreNetwork'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'

// always return current
export const getWeb3NoAccount = () => {
  const { networkRpcUrl } = storeNetwork.getState()
  const httpProviderOptions: HttpProviderOptions = { timeout: 10000 }
  const httpProvider = new Web3.providers.HttpProvider(networkRpcUrl, httpProviderOptions)
  const web3NoAccount = new Web3(httpProvider)
  return web3NoAccount
}

const web3NoAccount = getWeb3NoAccount()

export default web3NoAccount
