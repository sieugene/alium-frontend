import { BridgeHistoryIcon } from 'images/bridge/BridgeHistoryIcon'
import React from 'react'
import styled from 'styled-components'
import BridgeInput from '../BridgeInput'
import BridgeNetwork from '../BridgeNetwork'
const CardContent = styled.div`
  /* height: 424px; */
  height: auto;
  padding: 26px 24px 32px 24px;
`

const BridgeCard = () => {
  return (
    <CardContent>
      <HistoryText />
      <BridgeNetwork type='fromNetwork' />
      <BridgeInput />
      <BridgeNetwork type='toNetwork' />
    </CardContent>
  )
}

const History = styled.div`
  display: flex;
  align-items: center;
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;

    letter-spacing: 1px;

    color: #8990a5;
  }

  svg {
    margin-right: 9px;
  }
`

const HistoryText = () => {
  return (
    <History>
      <BridgeHistoryIcon />
      <p>History</p>
    </History>
  )
}

export default BridgeCard
