import React, { useState } from 'react'
import { ChevronRight } from 'react-feather'
import Loader from 'react-loader-spinner'
import { BRIDGE_STEPS, storeBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'

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
const View = styled.div`
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
  }
  display: flex;
  justify-content: center;
  align-items: center;
`

const TransferStep = () => {
  const [loading, setLoading] = useState(true)
  const changeStep = storeBridge.getState().changeStep
  const updateStepStatus = storeBridge.getState().updateStepStatus
  const emulateApproveProcess = async () => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
        setLoading(false)
      }, 2000)
    })
  }
  React.useEffect(() => {
    emulateApproveProcess()
  }, [])
  React.useEffect(() => {
    if (!loading) {
      changeStep(BRIDGE_STEPS.SWITCH_NETWORK)
      updateStepStatus(BRIDGE_STEPS.TRANSFER, true)
    }
  }, [loading])
  return (
    <Wrapper>
      <StyledLoader type='TailSpin' color='#6C5DD3' />

      <h2>Transfer 0.05 DAI pending...</h2>
      <p>Transaction is pending...</p>
      <View>
        View on explorer <ChevronRight />
      </View>
    </Wrapper>
  )
}

export default TransferStep
