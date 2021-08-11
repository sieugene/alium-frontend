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
  networkBalancer: (from?: number, to?: number) => void
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

const balanceChains = (from?: number, to?: number) => {
  const networks = getNetworks()
  const defaultChain: number = networks[0].chainId
  const hecoChain: number = networks[1].chainId

  const _from: number = from || storeBridge.getState().fromNetwork || defaultChain
  const _to: number = to || storeBridge.getState().toNetwork || defaultChain
  const chains = [_from, _to]

  // No bsc cases
  const BSC_NOT_EXIST = !chains.includes(defaultChain)
  const NO_BSC_FROM_AND_TO_PARAMS_NOT_EQUAL = Boolean(BSC_NOT_EXIST && from && to && from !== to)
  const NO_BSC_TO_PARAM = Boolean(BSC_NOT_EXIST && to)
  const NO_BSC_FROM_PARAM = Boolean(BSC_NOT_EXIST && from)
  // Default cases
  const FROM_AND_TO_EQUAL = _from === _to

  switch (true) {
    case NO_BSC_FROM_AND_TO_PARAMS_NOT_EQUAL:
      return {
        fromNetwork: from,
        toNetwork: to,
      }
    case NO_BSC_TO_PARAM:
      return {
        fromNetwork: defaultChain,
        toNetwork: to,
      }
    case NO_BSC_FROM_PARAM:
      return {
        fromNetwork: _from,
        toNetwork: defaultChain,
      }
    case FROM_AND_TO_EQUAL:
      return { fromNetwork: _from, toNetwork: hecoChain }

    default:
      return {
        fromNetwork: _from,
        toNetwork: _to,
      }
  }
}

export const storeBridgeDefault = () => {
  return {
    fromNetwork: storeNetwork.getState().currentChainId,
    toNetwork: null,
    transactionText: '',
    transactionMessage: null,
    txHash: '',
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
  networkBalancer: (from?: number, to?: number) => {
    const chains = balanceChains(from, to)
    set({ ...chains })
  },

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
    const networkBalancer = get().networkBalancer
    networkBalancer(chainId)
  },
  setToNetwork: (chainId: number) => {
    const networkBalancer = get().networkBalancer
    networkBalancer(null, chainId)
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
    const balancer = get().networkBalancer
    balancer()
    storage.migrate()
    storage.save()
    // not need every change update?
    storeNetwork.subscribe(
      (currentChainId: number, prevChainId: number) => {
        if (currentChainId !== prevChainId) {
          const currentStep = get().step
          if (currentStep === BRIDGE_STEPS.CONFIRM_TRANSFER) {
            balancer(currentChainId)
          }
          storage.save()
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
