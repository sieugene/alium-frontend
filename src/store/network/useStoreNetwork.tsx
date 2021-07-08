import { getCookieOptions } from 'alium-uikit/src/config/getCookieOptions'
import { getActualChainId } from 'store/network/helpers/getActualChainId'
import { getNetworkRpcUrl } from 'store/network/helpers/getNetworkRpcUrl'
import Cookies from 'universal-cookie'
import create from 'zustand'
import createVanilla from 'zustand/vanilla'

const cookies = new Cookies()
const chainIdCookieKey = 'chainId'

const getInitialChainId = (): number => {
  const cookieChainId = cookies.get(chainIdCookieKey)
  return getActualChainId(cookieChainId ? Number(cookieChainId) : process.env.APP_ENV === 'production' ? 56 : 97)
}
const currentChainId = getInitialChainId()

interface StoreAccountState {
  // state
  currentChainId: number
  networkRpcUrl: string
  // actions
  killStoreNetwork: () => void
  initStoreNetwork: () => void
  setChainId: (id: number) => void
}

// store for usage outside of react
export const storeNetwork = createVanilla<StoreAccountState>((set, get) => ({
  currentChainId: getInitialChainId(),
  networkRpcUrl: getNetworkRpcUrl(currentChainId),
  killStoreNetwork: () => {
    storeNetwork.destroy() // destroy all store subscribes
  },
  initStoreNetwork: () => {
    const { setChainId } = get()
    if (typeof window !== 'undefined' && window.ethereum) {
      // switch network from wallet
      window.ethereum.on('chainChanged', (chainId) => {
        setChainId(parseInt(chainId, 16))
      })
    }
  },
  setChainId: (id) => {
    // switch network from app
    const newChainId = getActualChainId(Number(id))
    set({
      currentChainId: newChainId,
      networkRpcUrl: getNetworkRpcUrl(newChainId),
    })
    cookies.set(chainIdCookieKey, newChainId, getCookieOptions())
  },
}))

// store for usage inside of react
export const useStoreNetwork = create<StoreAccountState>(storeNetwork)

// subscribe for changes
useStoreNetwork.subscribe(
  (currentChainId, prevChainId) =>
    console.log(
      `%c chain changed from: "${prevChainId}", to: "${currentChainId}"`,
      'background: #006297; color: #c4ff5c',
    ),
  (state) => state.currentChainId,
)
