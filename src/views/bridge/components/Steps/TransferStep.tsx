import { useAlmToken } from 'hooks/useAlm'
import { BridgeConfirmIcon } from 'images/bridge/BridgeConfirmIcon'
import React, { useState } from 'react'
import { ChevronRight } from 'react-feather'
import Loader from 'react-loader-spinner'
import { BRIDGE_STEPS, storeBridge } from 'store/bridge/useStoreBridge'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { useBridgeNetworks } from 'views/bridge/hooks/useBridgeNetworks'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  margin-top: 40px;
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-top: 24px;
  }
  p {
    margin-top: 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
`
const StyledLoader = styled(Loader)`
  width: 80px;
  height: 80px;
`
export const View = styled.div`
  cursor: pointer;
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;

  letter-spacing: 1px;

  color: #6c5dd3;
  svg {
    stroke: #6c5dd3;
    width: 18px;
    height: 16px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`

const TransferStep = () => {
  const [loading, setLoading] = useState(false)
  const token = useAlmToken()
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const setChainId = useStoreNetwork((state) => state.setChainId)
  const connected = useStoreNetwork((state) => state.connected)
  const { networkFrom } = useBridgeNetworks()

  const wrongCurrentNetwork = React.useMemo(
    () => networkFrom?.chainId !== currentChainId,
    [currentChainId, networkFrom],
  )

  const changeStep = storeBridge.getState().changeStep
  const updateStepStatus = storeBridge.getState().updateStepStatus

  const emulateApproveProcess = async () => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
        updateStepStatus(BRIDGE_STEPS.TRANSFER, true)
        changeStep(BRIDGE_STEPS.SWITCH_NETWORK)
      }, 2000)
    })
  }

  const networkOrAccountErrors = wrongCurrentNetwork || !connected
  const showLoading = loading && !networkOrAccountErrors

  // If network valid and connected call approve
  React.useEffect(() => {
    if (!networkOrAccountErrors && !loading) {
      setLoading(true)
      emulateApproveProcess().finally(() => {
        setLoading(false)
      })
    }
  }, [networkOrAccountErrors])

  // Validate chainId if current not equal "from" chainId
  React.useEffect(() => {
    if (wrongCurrentNetwork) {
      setChainId(networkFrom?.chainId)
    }
  }, [wrongCurrentNetwork])

  return (
    <Wrapper>
      {showLoading ? (
        <>
          <StyledLoader type='TailSpin' color='#6C5DD3' />

          <h2>Transfer 0.05 {token?.symbol} pending...</h2>
          <p>Transaction is pending...</p>
          <View>
            View on explorer <ChevronRight />
          </View>
        </>
      ) : (
        <ConfirmMessage />
      )}
    </Wrapper>
  )
}

const StyledConfirm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;

    text-align: center;
    letter-spacing: 0.3px;

    color: #0b1359;
  }
`
const ConfirmMessage = () => {
  return (
    <StyledConfirm>
      <BridgeConfirmIcon />
      <p>Confirm the transaction in your wallet</p>
    </StyledConfirm>
  )
}

export default TransferStep
