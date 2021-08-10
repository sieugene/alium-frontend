import { getNetworks } from 'alium-uikit/src/widgets/WalletModal/config'
import { BigNumber } from 'ethers'
import { storeNetwork } from 'store/network/useStoreNetwork'
import { BridgeToken } from 'utils/bridge/entities/BridgeToken'
import create from 'zustand'
import createVanilla from 'zustand/vanilla'
import { bridgeStorage } from './bridge.storage'

export enum BRIDGE_STEPS {
  'CONFIRM_TRANSFER' = 0,
  'TRANSFER' = 1,
  'SWITCH_NETWORK' = 2,
  'CLAIM_TOKEN' = 3,
  'SUCCESS' = 4,
}
export interface StoreBridgeState {
  step: BRIDGE_STEPS
  stepStatuses: {
    [key in BRIDGE_STEPS]: boolean
  }
  fromNetwork: number
  toNetwork: number
  modalOpen: boolean
  setStepStatuses: (stepStatuses: StoreBridgeState['stepStatuses']) => void
  updateStepStatus: (step: BRIDGE_STEPS, status: boolean) => void
  toggleModal: (show: boolean) => void
  changeStep: (step: BRIDGE_STEPS) => void
  initStoreBridge: () => void
  killStoreBridge: () => void
  setFromNetwork: (chainId?: number) => void
  setToNetwork: (chainId?: number) => void
  toggleNetworks: () => void
  setTokens: (tokens: StoreBridgeState['tokens']) => void
  setAmounts: (amounts: StoreBridgeState['amounts']) => void
  setTransactionMessage: (transactionMessage: any) => void
  setTransactionText: (transactionText: string) => void
  tokens: {
    fromToken: BridgeToken | null
    toToken: BridgeToken | null
  }
  amounts: {
    fromAmount: BigNumber
    toAmount: BigNumber
  }
  txHash: string | null
  setTxHash: (hash: string | null) => void
  transactionText: string
  transactionMessage: any
}
// Storage
const storage = bridgeStorage()
// Helpers
export const networkFinder = (chainId: number) => {
  const networks = getNetworks()
  return chainId && networks && networks.find((n) => n.chainId === chainId)
}

export const storeBridgeDefault = () => {
  return {
    // fromNetwork: storeNetwork.getState().currentChainId,
    transactionText: '',
    transactionMessage: null,
    txHash: '',
    fromNetwork: getNetworks()[0]?.chainId,
    toNetwork: getNetworks()[1]?.chainId || null,
    modalOpen: false,
    step: BRIDGE_STEPS.CONFIRM_TRANSFER,
    stepStatuses: {
      [BRIDGE_STEPS.CONFIRM_TRANSFER]: false,
      [BRIDGE_STEPS.TRANSFER]: false,
      [BRIDGE_STEPS.SWITCH_NETWORK]: false,
      [BRIDGE_STEPS.CLAIM_TOKEN]: false,
      [BRIDGE_STEPS.SUCCESS]: false,
    },
    tokens: {
      fromToken: null,
      toToken: null,
    },
    amounts: {
      fromAmount: BigNumber.from(0),
      toAmount: BigNumber.from(0),
    },
  }
}

// store for usage outside of react
export const storeBridge = createVanilla<StoreBridgeState>((set, get) => ({
  ...storeBridgeDefault(),
  setTransactionMessage: (transactionMessage: any) => {
    set({ transactionMessage })
  },
  setTransactionText: (transactionText: string) => {
    set({ transactionText })
  },
  setTokens: (tokens: StoreBridgeState['tokens']) => {
    set({ tokens })
  },
  setAmounts: (amounts: StoreBridgeState['amounts']) => {
    set({ amounts })
  },
  setTxHash: (txHash: string | null) => {
    set({ txHash })
  },
  setStepStatuses: (stepStatuses) => {
    set({ stepStatuses })
  },
  updateStepStatus: (step: BRIDGE_STEPS, status: boolean) => {
    const stepStatuses = storeBridge.getState().stepStatuses
    stepStatuses[step] = status
    set({ stepStatuses })
  },
  toggleModal: (show: boolean) => {
    set({ modalOpen: show })
  },
  changeStep: (step: BRIDGE_STEPS) => {
    set({ step })
  },
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
    // const setFromNetwork = get().setFromNetwork
    storage.migrate()
    storage.save()
    // not need every change update?
    // storeNetwork.subscribe(
    //   (currentChainId: number, prevChainId: number) => {
    //     if (currentChainId !== prevChainId) {
    //       storage.save()
    //       setFromNetwork(currentChainId)
    //     }
    //   },
    //   (state) => state.currentChainId,
    // )
  },
  killStoreBridge: () => {
    storeBridge.destroy()
  },
}))

// store for usage inside of react
export const useStoreBridge = create<StoreBridgeState>(storeBridge)
