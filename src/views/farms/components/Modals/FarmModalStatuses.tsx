import { ShadowComponent } from 'components/Main/ShadowComponent'
import { BridgeSuccessIcon } from 'images/bridge/BridgeSuccessIcon'
import { BridgeTransferErrorIcon } from 'images/bridge/BridgeTransferErrorIcon'
import React from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { FarmActionModalProps } from './FarmActionModal'
import { ModalFarmBaseWrap } from './modals.styled'

interface ActionFarmProps {
  loading: boolean
  success: boolean
  error: boolean
  children: React.ReactNode
  type: FarmActionModalProps['type']
}

export const FarmModalStatuses = ({ loading, success, error, children, type }: ActionFarmProps) => {
  const hideOn = loading || success || error

  return (
    <FarmModalStatuses.Wrapper>
      {loading && <FarmModalStatuses.ActionFarmLoader />}
      {success && <FarmModalStatuses.ActionFarmSuccess type={type} />}
      {error && <FarmModalStatuses.ActionFarmError />}
      <ShadowComponent hide={hideOn} style={{ width: '100%' }}>
        {children}
      </ShadowComponent>
    </FarmModalStatuses.Wrapper>
  )
}

FarmModalStatuses.ActionFarmLoader = () => {
  return (
    <FarmModalStatuses.Wrapper>
      <FarmModalStatuses.Loading type='TailSpin' color='#6C5DD3' />
      <h3 className='wait'>Wait a bit...</h3>
    </FarmModalStatuses.Wrapper>
  )
}

FarmModalStatuses.ActionFarmSuccess = ({ type }: { type: FarmActionModalProps['type'] }) => {
  const isStake = type === 'stake'
  const title = isStake ? 'Staked' : 'Unstaked'
  const text = `Your funds have been ${isStake ? 'staked' : 'unstaked'} in the farm`
  return (
    <FarmModalStatuses.Wrapper>
      <BridgeSuccessIcon />
      <h2>{title}</h2>
      <p>{text}</p>
    </FarmModalStatuses.Wrapper>
  )
}

FarmModalStatuses.ActionFarmError = () => {
  return (
    <FarmModalStatuses.Wrapper>
      <FarmModalStatuses.IconWrap>
        <BridgeTransferErrorIcon />
      </FarmModalStatuses.IconWrap>
      <h2 className='error-text'>Transaction failed</h2>
      <h2 className='error-text'>Your wallet doesn&apos;t have enough ALM to buy a ticket</h2>
    </FarmModalStatuses.Wrapper>
  )
}

FarmModalStatuses.IconWrap = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 77, 0, 0.1);
  border-radius: 50px;
`

FarmModalStatuses.Wrapper = styled(ModalFarmBaseWrap)`
  min-height: 277px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .wait {
    margin-top: 34px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }

  h2 {
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
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;
  }

  .error-text {
    width: 70%;
    text-align: center;
  }
`

FarmModalStatuses.Loading = styled(Loader)`
  width: 80px;
  height: 80px;
`
