import random from 'lodash/random'
import { networkRpcUrlsList } from 'store/network/data/networkRpcUrlsList'

export const getNetworkRpcUrl = (id: number): string => {
  const randomIndex = random(0, networkRpcUrlsList[id].length - 1)
  return networkRpcUrlsList?.[id]?.[randomIndex] ?? ''
}
