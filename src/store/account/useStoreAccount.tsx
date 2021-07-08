import create from 'zustand'
import createVanilla from 'zustand/vanilla'

export interface StoreAccountState {
  currentAccountAddress: string
  initStoreAccount: () => void
  killStoreAccount: () => void
  [key: string]: any
}

// store for usage outside of react
export const storeAccount = createVanilla<StoreAccountState>((set, get) => ({
  currentAccountAddress: null,
  initStoreAccount: () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        set({ currentAccountAddress: accounts[0] })
      })
    }
  },
  killStoreAccount: () => {
    unsubscribe()
  },
}))

// store for usage inside of react
export const useStoreAccount = create<StoreAccountState>(storeAccount)

// subscribe for changes
const unsubscribe = useStoreAccount.subscribe(
  (currentAccountAddress, prevAccountAddress) =>
    console.log(
      `%c account changed from: "${prevAccountAddress}", to: "${currentAccountAddress}"`,
      'background: #006297; color: #c4ff5c',
    ),
  (state) => state.currentAccountAddress,
)
