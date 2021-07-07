import { ConnectorNames } from 'alium-uikit/src'
import { isMobile } from 'react-device-detect'

export const checkSupportConnect = (connector: ConnectorNames) => {
  if (!isMobile && connector === ConnectorNames.TOKENPOCKET) {
    return false
  }
  return true
}
