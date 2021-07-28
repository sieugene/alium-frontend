import React from 'react'
import styled from 'styled-components'
import BridgeContainer from './BridgeContainer'
import BridgeConnectWallet from './components/BridgeConnectWallet'

const H2 = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: 0.3px;

  color: #0b1359;
  margin-bottom: 24px;
  @media screen and (max-width: 500px) {
    font-size: 28px;
    line-height: 36px;
	text-align: center;
  }
`

const Card = styled.div`
  width: 100%;

  @media screen and (max-width: 1440px) {
    /* width: 100%; */
  }

  background: #ffffff;
  border-radius: 6px;
`

const Bridge = () => {
  return (
    <BridgeContainer>
      <H2>Bridge</H2>
      <Card>
        <BridgeConnectWallet>content</BridgeConnectWallet>
      </Card>
    </BridgeContainer>
  )
}

export default Bridge
