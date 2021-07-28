import { getNetworks } from 'alium-uikit/src/widgets/WalletModal/config'
import { storeNetwork } from 'store/network/useStoreNetwork'
import create from 'zustand'
import createVanilla from 'zustand/vanilla'
import { bridgeStorage } from './bridge.storage'

export interface StoreBridgeState {
  fromNetwork: number
  toNetwork: number
  initStoreBridge: () => void
  killStoreBridge: () => void
  setFromNetwork: (chainId?: number) => void
  setToNetwork: (chainId?: number) => void
  toggleNetworks: () => void
}
// Storage
const storage = bridgeStorage()
// Helpers
export const networkFinder = (chainId: number) => {
  const networks = getNetworks()
  return chainId && networks && networks.find((n) => n.chainId === chainId)
}

// store for usage outside of react
export const storeBridge = createVanilla<StoreBridgeState>((set, get) => ({
  fromNetwork: storage.get()?.fromNetwork || storeNetwork.getState().currentChainId || 56,
  toNetwork: storage.get()?.toNetwork || getNetworks()[1]?.chainId || null,
  setFromNetwork: (chainId?: number) => {
    const id = chainId || storeNetwork.getState().currentChainId
    set({
      fromNetwork: id,
    })
  },
  setToNetwork: (chainId: number) => {
    set({
      toNetwork: chainId,
    })
    storage.save()
  },
  toggleNetworks: () => {
    const { fromNetwork, toNetwork } = storeBridge.getState()
    const setChainId = storeNetwork.getState().setChainId
    set({
      fromNetwork: toNetwork,
      toNetwork: fromNetwork,
    })
    setChainId(toNetwork)
  },
  initStoreBridge: () => {
    const setFromNetwork = get().setFromNetwork
    storage.migrate()
    storage.save()

    storeNetwork.subscribe(
      (currentChainId: number, prevChainId: number) => {
        if (currentChainId !== prevChainId) {
          storage.save()
          setFromNetwork(currentChainId)
        }
      },
      (state) => state.currentChainId,
    )
  },
  killStoreBridge: () => {
    storeBridge.destroy()
  },
}))

// store for usage inside of react
export const useStoreBridge = create<StoreBridgeState>(storeBridge)
