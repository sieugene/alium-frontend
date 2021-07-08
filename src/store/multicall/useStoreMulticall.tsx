import { toCallKey } from 'store/multicall/helpers/actions'
import create from 'zustand'
import createVanilla from 'zustand/vanilla'

export interface StoreMulticallState {
  callListeners?: {
    // on a per-chain basis
    [chainId: number]: {
      // stores for each call key the listeners' preferences
      [callKey: string]: {
        // stores how many listeners there are per each blocks per fetch preference
        [blocksPerFetch: number]: number
      }
    }
  }

  callResults: {
    [chainId: number]: {
      [callKey: string]: {
        data?: string | null
        blockNumber?: number
        fetchingBlockNumber?: number
      }
    }
  }
  [key: string]: any
}

// store for usage outside of react
export const storeMulticall = createVanilla<StoreMulticallState>((set, get) => ({
  callResults: {},
  addMulticallListeners: ({ calls, chainId, options: { blocksPerFetch = 1 } = {} }) => {
    const state = get()
    const listeners: StoreMulticallState['callListeners'] = state.callListeners
      ? state.callListeners
      : (state.callListeners = {})
    listeners[chainId] = listeners[chainId] ?? {}
    calls.forEach((call) => {
      const callKey = toCallKey(call)
      listeners[chainId][callKey] = listeners[chainId][callKey] ?? {}
      listeners[chainId][callKey][blocksPerFetch] = (listeners[chainId][callKey][blocksPerFetch] ?? 0) + 1
    })
    // debugger
    set({ callListeners: listeners })
  },
  removeMulticallListeners: ({ chainId, calls, options: { blocksPerFetch = 1 } = {} }) => {
    const state = get()
    const listeners: StoreMulticallState['callListeners'] = state.callListeners
      ? state.callListeners
      : (state.callListeners = {})

    if (!listeners[chainId]) return
    calls.forEach((call) => {
      const callKey = toCallKey(call)
      if (!listeners[chainId][callKey]) return
      if (!listeners[chainId][callKey][blocksPerFetch]) return

      if (listeners[chainId][callKey][blocksPerFetch] === 1) {
        delete listeners[chainId][callKey][blocksPerFetch]
      } else {
        listeners[chainId][callKey][blocksPerFetch]--
      }
    })
	// debugger
    set({ callListeners: listeners })
  },
  fetchingMulticallResults: ({ chainId, fetchingBlockNumber, calls }) => {
    const state = get()
    state.callResults[chainId] = state.callResults[chainId] ?? {}
    calls.forEach((call) => {
      const callKey = toCallKey(call)
      const current = state.callResults[chainId][callKey]
      if (!current) {
        state.callResults[chainId][callKey] = {
          fetchingBlockNumber,
        }
      } else {
        if ((current.fetchingBlockNumber ?? 0) >= fetchingBlockNumber) return
        state.callResults[chainId][callKey].fetchingBlockNumber = fetchingBlockNumber
      }
    })
	// debugger
    set({ callResults: state.callResults })
  },
  errorFetchingMulticallResults: ({ fetchingBlockNumber, chainId, calls }) => {
    const state = get()
    state.callResults[chainId] = state.callResults[chainId] ?? {}
    calls.forEach((call) => {
      const callKey = toCallKey(call)
      const current = state.callResults[chainId][callKey]
      if (!current) return // only should be dispatched if we are already fetching
      if (current.fetchingBlockNumber === fetchingBlockNumber) {
        delete current.fetchingBlockNumber
        current.data = null
        current.blockNumber = fetchingBlockNumber
      }
    })
	// debugger
    set({ callResults: state.callResults })
  },
  updateMulticallResults: ({ chainId, results, blockNumber }) => {
    const state = get()
    state.callResults[chainId] = state.callResults[chainId] ?? {}
    Object.keys(results).forEach((callKey) => {
      const current = state.callResults[chainId][callKey]
      if ((current?.blockNumber ?? 0) > blockNumber) return
      state.callResults[chainId][callKey] = {
        data: results[callKey],
        blockNumber,
      }
    })
	// debugger
    set({ callResults: state.callResults })
  },
}))

// store for usage inside of react
export const useStoreMulticall = create<StoreMulticallState>(storeMulticall)
