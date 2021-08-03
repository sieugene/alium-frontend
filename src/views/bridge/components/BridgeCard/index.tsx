import { BridgeHistoryIcon } from 'images/bridge/BridgeHistoryIcon'
import Link from 'next/link'
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

const History = styled.a`
  display: flex;
  align-items: center;
  width: fit-content;
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
    <Link href='/bridge/history'>
      <History href='/bridge/history'>
        <BridgeHistoryIcon />
        <p>History</p>
      </History>
    </Link>
  )
}

export default BridgeCard
