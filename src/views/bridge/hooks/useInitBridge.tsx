import {
  BRIDGE_STEPS,
  storeBridge,
  storeBridgeDefault,
  StoreBridgeState,
  useStoreBridge,
} from 'store/bridge/useStoreBridge'

// init store for current bridge history (CREATE, CONTINUE)
interface Params {
  step?: BRIDGE_STEPS
  showModal?: boolean
  statuses?: StoreBridgeState['stepStatuses']
  from?: number
  to?: number
}
/**
 * Init bridge with store, make install with input params or default from store and uninstall
 */
export const useInitBridge = () => {
  // Store
  const toggleModal = storeBridge.getState().toggleModal
  const changeStep = storeBridge.getState().changeStep
  const setStepStatuses = storeBridge.getState().setStepStatuses
  const setFromNetwork = storeBridge.getState().setFromNetwork
  const setToNetwork = storeBridge.getState().setToNetwork
  const modalOpen = useStoreBridge((state) => state.modalOpen)
  const stepStatuses = useStoreBridge((state) => state.stepStatuses)
  const fromNetwork = useStoreBridge((state) => state.fromNetwork)
  const toNetwork = useStoreBridge((state) => state.toNetwork)
  // Init
  const install = ({ step, showModal, statuses, from, to }: Params) => {
    // Params
    const modalActive = showModal !== undefined ? showModal : modalOpen
    const currentStep = step !== undefined ? step : BRIDGE_STEPS.TRANSFER
    const currentStatuses = statuses || stepStatuses
    const fromChainId = from || fromNetwork
    const toChainId = to || toNetwork

    toggleModal(modalActive)
    changeStep(currentStep)
    setStepStatuses(currentStatuses)
    setFromNetwork(fromChainId)
    setToNetwork(toChainId)
  }
  // Reverse operation with REQUIRED all params
  const uninstall = (params: Required<Params>) => {
    install(params)
  }
  // cancel modal
  const cancel = () => {
    const {
      step,
      stepStatuses: statuses,
      fromNetwork: from,
      toNetwork: to,
      modalOpen: showModal,
    } = storeBridgeDefault()

    install({ step, statuses, from, to, showModal })
  }
  return { install, uninstall, cancel }
}
