import BridgeModal from 'components/Modal/BridgeModal'
import { BRIDGE_STEPS, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { useInitBridge } from 'views/bridge/hooks/useInitBridge'
import BridgeStepsHeader from '../../BridgeStepsHeader'
import ClaimTokenStep from '../../Steps/ClaimTokenStep'
import SuccessStep from '../../Steps/SuccessStep'
import SwitchNetworkStep from '../../Steps/SwitchNetworkStep'
import TransferStep from '../../Steps/TransferStep'

const Wrapper = styled.div`
  width: 500px;
  min-height: 473px;
  padding: 40px 24px 24px 24px;
`

const BridgeTransferProcess = () => {
  const currentStep = useStoreBridge((state) => state.step)
  const { cancel } = useInitBridge()
  const modalOpen = useStoreBridge((state) => state.modalOpen)

  const onDismiss = () => {
    cancel()
  }

  return (
    <BridgeModal isOpen={modalOpen} onDismiss={onDismiss}>
      {currentStep !== BRIDGE_STEPS.SUCCESS && (
        <Wrapper>
          <BridgeStepsHeader />
          {currentStep === BRIDGE_STEPS.TRANSFER && <TransferStep />}
          {currentStep === BRIDGE_STEPS.SWITCH_NETWORK && <SwitchNetworkStep />}
          {currentStep === BRIDGE_STEPS.CLAIM_TOKEN && <ClaimTokenStep />}
        </Wrapper>
      )}
      {currentStep === BRIDGE_STEPS.SUCCESS && <SuccessStep />}
    </BridgeModal>
  )
}

export default BridgeTransferProcess
