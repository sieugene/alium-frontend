const Header = styled.div`
  display: flex;
  align-items: center;
`

const Step = styled.div<{ active: boolean; success: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  cursor: pointer;
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 10px;
    text-align: center;
    letter-spacing: 1px;
    color: #8990a5;
    padding-bottom: 4px;
  }
  .title {
    white-space: nowrap;
    display: flex;
    align-items: center;
    h2 {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      letter-spacing: 0.3px;
      color: ${(props) => (props.success ? '#1EA76D' : '#6c5dd3')};
      margin-right: 7px;
    }

    padding-bottom: 12px;
  }
  transition: 0.3s all ease;
  border-bottom: 1px solid ${(props) => (props.active ? '#6c5dd3' : 'transparent')};
`
import { BridgeCheckIcon } from 'images/bridge/BridgeCheckIcon'
import React from 'react'
import { BRIDGE_STEPS, storeBridge, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'

const BridgeStepsHeader = () => {
  const changeStep = storeBridge.getState().changeStep
  const currentStep = useStoreBridge((state) => state.step)
  const stepStatuses = useStoreBridge((state) => state.stepStatuses)

  const steps = [
    {
      step: BRIDGE_STEPS.TRANSFER,
      title: 'Transfer',
    },
    {
      step: BRIDGE_STEPS.SWITCH_NETWORK,
      title: 'Switch network',
    },
    {
      step: BRIDGE_STEPS.CLAIM_TOKEN,
      title: 'Claim token',
    },
  ]
  return (
    <Header>
      {steps.map(({ step, title }) => (
        <Step
          key={step}
          active={step === currentStep}
          success={stepStatuses[step]}
          // onClick={() => {
          //   changeStep(step)
          // }}
        >
          <p>{step} STEP</p>
          <div className='title'>
            <h2>{title}</h2>
            {stepStatuses[step] && <BridgeCheckIcon />}
          </div>
        </Step>
      ))}
    </Header>
  )
}

export default BridgeStepsHeader
