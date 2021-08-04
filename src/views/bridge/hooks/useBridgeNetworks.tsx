import { networkFinder, useStoreBridge } from 'store/bridge/useStoreBridge'
import { networkProvidersParamsList } from 'store/network/data/networkProvidersParamsList'
/**
 * Hook return current networks and native currencies
 */
export const useBridgeNetworks = () => {
  const from = useStoreBridge((state) => state.fromNetwork)
  const to = useStoreBridge((state) => state.toNetwork)
  const networkFrom = networkFinder(from)
  const networkTo = networkFinder(to)
  const availableNetworksBridge = [networkFrom?.chainId, networkTo?.chainId]
  // Natives of current networks
  const networkParams = networkProvidersParamsList
  const nativeFrom = networkParams[networkFrom?.chainId]
  const nativeTo = networkParams[networkTo?.chainId]

  return { nativeFrom, nativeTo, networkFrom, networkTo, availableNetworksBridge }
}
