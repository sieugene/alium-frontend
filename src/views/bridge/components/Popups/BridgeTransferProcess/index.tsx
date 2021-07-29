import BridgeModal from 'components/Modal/BridgeModal'
import { BRIDGE_STEPS, storeBridge, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import BridgeStepsHeader from '../../BridgeStepsHeader'
import SwitchNetworkStep from '../../Steps/SwitchNetworkStep'
import TransferStep from '../../Steps/TransferStep'

const Wrapper = styled.div`
  width: 500px;
  min-height: 473px;
  padding: 40px 24px 24px 24px;
`

const BridgeTransferProcess = () => {
  const currentStep = useStoreBridge((state) => state.step)
  const toggleModal = storeBridge.getState().toggleModal
  const changeStep = storeBridge.getState().changeStep
  const modalOpen = useStoreBridge((state) => state.modalOpen)

  const onDismiss = () => {
    toggleModal(false)
  }
  const confirm = () => {
    changeStep(BRIDGE_STEPS.TRANSFER)
  }

  return (
    <BridgeModal isOpen={modalOpen} onDismiss={onDismiss}>
      <Wrapper>
        <BridgeStepsHeader />
        {currentStep === BRIDGE_STEPS.TRANSFER && <TransferStep />}
        {currentStep === BRIDGE_STEPS.SWITCH_NETWORK && <SwitchNetworkStep />}
      </Wrapper>
    </BridgeModal>
  )
}

export default BridgeTransferProcess
