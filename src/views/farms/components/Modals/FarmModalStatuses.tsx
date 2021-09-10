import { ShadowComponent } from 'components/Main/ShadowComponent'
import { BridgeSuccessIcon } from 'images/bridge/BridgeSuccessIcon'
import { BridgeTransferErrorIcon } from 'images/bridge/BridgeTransferErrorIcon'
import React, { FC } from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { ModalFarmBaseWrap } from './modals.styled'

const StatusWrapper = styled(ModalFarmBaseWrap)`
  min-height: 277px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .wait {
    margin-top: 34px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-top: 24px;
  }
  p {
    margin-top: 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
`

const StyledLoader = styled(Loader)`
  width: 80px;
  height: 80px;
`

interface ActionFarmProps {
  loading: boolean
  success: boolean
  error: boolean
  children: React.ReactNode
}
export const FarmModalStatuses: FC<ActionFarmProps> = ({ loading, success, error, children }) => {
  const hideOn = loading || success || error

  return (
    <StatusWrapper>
      {loading && <ActionFarmLoader />}
      {success && <ActionFarmSuccess />}
      {error && <ActionFarmError />}
      <ShadowComponent hide={hideOn} style={{ width: '100%' }}>
        {children}
      </ShadowComponent>
    </StatusWrapper>
  )
}

const ActionFarmLoader = () => {
  return (
    <StatusWrapper>
      <StyledLoader type='TailSpin' color='#6C5DD3' />
      <h3 className='wait'>Wait a bit...</h3>
    </StatusWrapper>
  )
}

const ActionFarmSuccess = () => {
  return (
    <StatusWrapper>
      <BridgeSuccessIcon />
      <h2>Staked</h2>
      <p>Your funds have been staked in the farm</p>
    </StatusWrapper>
  )
}

const Icon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 77, 0, 0.1);
  border-radius: 50px;
`

const ActionFarmError = () => {
  return (
    <StatusWrapper>
      <Icon>
        <BridgeTransferErrorIcon />
      </Icon>
      <h2 className='error'>Transaction failed</h2>
    </StatusWrapper>
  )
}
