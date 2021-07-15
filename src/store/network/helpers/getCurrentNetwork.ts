import { ChainId } from '@alium-official/sdk'
import { VAMPIRE_ADDRESS } from 'config/vampiring/VAMPIRE_ADDRESS'
import { liquidityProviderTokensItem, VAMPIRE_LP_TOKENS } from 'config/vampiring/VAMPIRE_LP_TOKENS'
import random from 'lodash/random'
import { networkProvidersParamsList } from 'store/network/data/networkProvidersParamsList'
import { networkRpcUrlsList } from 'store/network/data/networkRpcUrlsList'
import { AddEthereumChainParameter } from 'types/AddEthereumChainParameter'

export interface currentNetwork {
  id: number
  rpcUrl: string
  providerParams: AddEthereumChainParameter
  address: {
    vampiring: string
  }
  liquidityProviderTokens: liquidityProviderTokensItem[]
}

export const getCurrentNetwork = (currentChainId: number): currentNetwork => {
  const id: ChainId = currentChainId in ChainId ? currentChainId : ChainId.MAINNET

  return {
    id,
    rpcUrl: networkRpcUrlsList[id][random(0, networkRpcUrlsList[id].length - 1)],
    providerParams: networkProvidersParamsList[id],
    address: {
      vampiring: VAMPIRE_ADDRESS[id],
    },
    liquidityProviderTokens: VAMPIRE_LP_TOKENS[id],
  }
}
