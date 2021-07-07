import { getChainId } from 'alium-uikit/src'
import create from 'zustand'
import createVanilla from 'zustand/vanilla'

export interface StoreAccountState {
  currentChainId: number
  initStoreNetwork: () => void
  killStoreNetwork: () => void
  [key: string]: any
}

// store for usage outside of react
export const storeNetwork = createVanilla<StoreAccountState>((set, get) => ({
  currentChainId: getChainId(),
  initStoreNetwork: () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('chainChanged', (chainId) => {
        set({ currentChainId: parseInt(chainId, 16) })
        // window.location.reload()
      })
    }
  },
  changeChainId: (id: string) => {
    set({ currentChainId: Number(id) })
  },
  killStoreNetwork: () => {
    unsub()
  },
}))

// store for usage inside of react
export const useStoreNetwork = create<StoreAccountState>(storeNetwork)

// subscribe for changes
const unsub = useStoreNetwork.subscribe(
  (currentChainId, prevChainId) =>
    console.log(
      `%c chain changed from: "${prevChainId}", to: "${currentChainId}"`,
      'background: #006297; color: #c4ff5c',
    ),
  (state) => state.currentChainId,
)
