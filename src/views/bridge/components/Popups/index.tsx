import { BRIDGE_STEPS, useStoreBridge } from 'store/bridge/useStoreBridge'
import BridgeConfirmTransfer from '../BridgeConfirmTransfer'

const PopupsBridge = () => {
  const step = useStoreBridge((state) => state.step)
  return <div>{BRIDGE_STEPS.CONFIRM_TRANSFER === step && <BridgeConfirmTransfer />}</div>
}

export default PopupsBridge
