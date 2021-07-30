import { CloseItem } from 'components/Modal/BridgeModal'
import { BridgeSuccessIcon } from 'images/bridge/BridgeSuccessIcon'
import React from 'react'
import { ChevronRight } from 'react-feather'
import { storeBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { useInitBridge } from 'views/bridge/hooks/useInitBridge'
import AddTokenBtn from '../AddTokenBtn'
import { View } from './TransferStep'

const Wrapper = styled.div`
  width: 500px;
  min-height: 363px;
  padding: 8px;
`
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Content = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0b1359;
  .title {
    margin-top: 24px;
  }
  b {
    color: #1ea86d;
  }
  .amount {
    margin-top: 4px;
  }
`

const SuccessStep = () => {
  const { cancel } = useInitBridge()
  const toggleModal = storeBridge.getState().toggleModal

  const onDismiss = () => {
    cancel()
  }

  return (
    <Wrapper>
      <Header>
        <CloseItem onClick={onDismiss} />
      </Header>
      <Content>
        <BridgeSuccessIcon />
        <h2 className='title'>Transaction completed</h2>
        <p className='amount'>
          Amount: <b>0.01ALM</b>
        </p>
        <View>
          View on explorer <ChevronRight />
        </View>
        <AddTokenBtn />
      </Content>
    </Wrapper>
  )
}

export default SuccessStep
