import { ChainId } from '@alium-official/sdk'
import { getChainId } from 'alium-uikit/src'
import random from 'lodash/random'

const bscNodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]
const hecoNodes = [process.env.REACT_APP_HECO_NODE_1]
const ethereumNodes = [process.env.REACT_APP_ETHEREUM_NODE_1]
const maticNodes = [process.env.REACT_APP_MATIC_1]

// Array of available nodes to connect to
export const nodes = {
  [ChainId.MAINNET]: bscNodes,
  [ChainId.BSCTESTNET]: bscNodes,
  [ChainId.HECOMAINNET]: hecoNodes,
  [ChainId.HECOTESTNET]: hecoNodes,
  [ChainId.ETHER_MAINNET]: ethereumNodes,
  [ChainId.ETHER_TESTNET]: ethereumNodes,
  [ChainId.MATIC_MAINNET]: maticNodes,
  [ChainId.MATIC_TESTNET]: maticNodes,
}

const getNodeUrl = (chainId?: ChainId) => {
  const id = chainId || getChainId()
  const randomIndex = random(0, nodes[id].length - 1)
  return nodes[id][randomIndex]
}

export default getNodeUrl
