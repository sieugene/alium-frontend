import { getCookieOptions } from 'alium-uikit/src/config/getCookieOptions'
import { getActualChainId } from 'store/network/helpers/getActualChainId'
import { getNetworkProviderParams } from 'store/network/helpers/getNetworkProviderParams'
import { getNetworkRpcUrl } from 'store/network/helpers/getNetworkRpcUrl'
import { WindowChain } from 'types'
import { AddEthereumChainParameter } from 'types/AddEthereumChainParameter'
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
  networkProviderParams: AddEthereumChainParameter
  // actions
  killStoreNetwork: () => void
  initStoreNetwork: () => void
  setChainId: (id: number) => void
  setupNetwork: () => Promise<boolean>
}

// store for usage outside of react
export const storeNetwork = createVanilla<StoreAccountState>((set, get) => ({
  currentChainId,
  networkRpcUrl: getNetworkRpcUrl(currentChainId),
  networkProviderParams: getNetworkProviderParams(currentChainId),
  killStoreNetwork: () => {
    storeNetwork.destroy() // destroy all store subscribes
  },
  initStoreNetwork: () => {
    const { setChainId } = get()
    if (typeof window !== 'undefined' && window.ethereum) {
      // switch network from wallet
      ;(window as WindowChain).ethereum.on('chainChanged', (chainId) => {
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
      networkProviderParams: getNetworkProviderParams(newChainId),
    })
    cookies.set(chainIdCookieKey, newChainId, getCookieOptions())
  },
  setupNetwork: async () => {
    /**
     * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
     * @returns {boolean} true if the setup succeeded, false otherwise
     */
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await (window as WindowChain).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [get().networkProviderParams],
        })
        return true
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error("Can't setup the network on metamask because window.ethereum is undefined")
    }
    return false
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
