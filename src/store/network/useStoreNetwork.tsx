import { getCookieOptions } from 'alium-uikit/src/config/getCookieOptions'
import { WEB3NetworkErrors } from 'constants/network/NetworkErrors.contanst'
import { getActualChainId } from 'store/network/lib/getActualChainId'
import { getCurrentNetwork, ICurrentNetwork } from 'store/network/lib/getCurrentNetwork'
import { getNetworkProviderParams } from 'store/network/lib/getNetworkProviderParams'
import { WindowChain } from 'types'
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
const currentNetwork = getCurrentNetwork(currentChainId)

interface StoreAccountState {
  // state
  currentChainId: number
  currentNetwork: ICurrentNetwork
  connectIsFailed: WEB3NetworkErrors | null
  loadConnection: boolean
  connected: boolean
  // actions
  killStoreNetwork: () => void
  initStoreNetwork: () => void
  setChainId: (id: number) => void
  setupNetwork: (id: number) => Promise<boolean>
  setConnectionError: (error: WEB3NetworkErrors | null) => void
  toggleLoadConnection: (load: boolean, account?: string) => void
}

// store for usage outside of react
export const storeNetwork = createVanilla<StoreAccountState>((set, get) => ({
  // state
  currentChainId,
  currentNetwork,
  connectIsFailed: null,
  loadConnection: false,
  connected: false,
  // actions
  toggleLoadConnection: (load: boolean, account?: string) => {
    // TODO : Need refactor this
    if (load && !account) {
      set({ connected: false })
    }
    if (!load && account) {
      set({ connected: true })
    }
    // end

    set({
      loadConnection: load,
    })
  },
  killStoreNetwork: () => {
    storeNetwork.destroy() // destroy all store subscribes
  },
  initStoreNetwork: () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      // switch network from wallet
      ;(window as WindowChain).ethereum.on('chainChanged', (chainId) => {
        get().setChainId(parseInt(chainId, 16))
      })
    }
  },
  setChainId: (id) => {
    set({ connected: false })
    // but bad sync with checkout connection, make timeout
    setTimeout(() => {
      // switch network from app
      const newChainId = getActualChainId(Number(id))
      set({
        currentChainId: newChainId,
        currentNetwork: getCurrentNetwork(newChainId),
      })
      cookies.set(chainIdCookieKey, newChainId, getCookieOptions())
    }, 0)
  },
  setupNetwork: async (id) => {
    /**
     * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
     * @returns {boolean} true if the setup succeeded, false otherwise
     */
    const newChainId = getActualChainId(Number(id))
    const newNetworkProviderParams = getNetworkProviderParams(newChainId)
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await (window as WindowChain).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [newNetworkProviderParams],
        })
        get().setChainId(newChainId)
        return true
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error("Can't setup the network on metamask because window.ethereum is undefined")
    }
    return false
  },
  setConnectionError: (error: WEB3NetworkErrors | null) => {
    set({ connectIsFailed: error })
  },
}))

// store for usage inside of react
export const useStoreNetwork = create<StoreAccountState>(storeNetwork)

// subscribe for changes
useStoreNetwork.subscribe(
  (currentChainId, prevChainId) =>
    console.info(
      `%c chain changed from: "${prevChainId}", to: "${currentChainId}"`,
      'background: #006297; color: #c4ff5c',
    ),
  (state) => state.currentChainId,
)
