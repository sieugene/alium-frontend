import { ChainId } from '@alium-official/sdk'

// Array of available RPC URLs to connect to
export const networkRpcUrlsList = {
  [ChainId.MAINNET]: process.env.APP_NODES_BSC,
  [ChainId.BSCTESTNET]: process.env.APP_NODES_BSC,
  [ChainId.HECOMAINNET]: process.env.APP_NODES_HECO,
  [ChainId.HECOTESTNET]: process.env.APP_NODES_HECO,
  [ChainId.ETHER_MAINNET]: process.env.APP_NODES_ETHEREUM,
  [ChainId.ETHER_TESTNET]: process.env.APP_NODES_ETHEREUM,
  [ChainId.MATIC_MAINNET]: process.env.APP_NODES_MATIC,
  [ChainId.MATIC_TESTNET]: process.env.APP_NODES_MATIC,
}
