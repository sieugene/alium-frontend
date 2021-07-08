import { storeNetwork } from 'store/network/useStoreNetwork'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'

const { networkRpcUrl } = storeNetwork.getState()
const httpProviderOptions: HttpProviderOptions = { timeout: 10000 }
const httpProvider = new Web3.providers.HttpProvider(networkRpcUrl, httpProviderOptions)
const web3NoAccount = new Web3(httpProvider)

export const getWeb3NoAccount = () => {
  return web3NoAccount
}

export default web3NoAccount
