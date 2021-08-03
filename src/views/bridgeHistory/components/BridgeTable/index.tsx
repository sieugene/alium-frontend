import React from 'react'
import styled from 'styled-components'
import { BridgeHistoryStatuses } from 'views/bridgeHistory/bridgeHistory.types'
import BridgeTableCol, { RowItem } from '../BridgeTableCol'
import BridgeTableHeader from '../BridgeTableHeader'

const Table = styled.div`
  padding: 24px;
  @media screen and (max-width: 768px) {
    padding: 16px;
  }
  /* @media screen and (max-width: 375px) {
    padding: 6px;
  } */
`

const Desktop = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const Mobile = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`

const Content = styled.div`
  display: flex;
  border-bottom: 1px solid #ebedf9;
  justify-content: space-between;
  padding-bottom: 21px;
  padding-top: 16px;
`

const BridgeTable = () => {
  const headers = ['Date', 'Direction', 'Sending tx', 'Receiving tx', 'Amount', 'Status']
  const items: RowItem[] = [
    {
      date: '29 Jun 2021, 12:54',
      direction: {
        from: 'Mainnet',
        to: 'xDAI Chain',
      },
      sendingTx: '0xeb67...722e',
      receivingTx: '0xf692...ae2c',
      amount: '0.05 DAI',
      status: BridgeHistoryStatuses.Transferred,
    },
    {
      date: '29 Jun 2021, 12:54',
      direction: {
        from: 'Mainnet',
        to: 'xDAI Chain',
      },
      sendingTx: '0xeb67...722e',
      receivingTx: '0xf692...ae2c',
      amount: '0.05 DAI',
      status: BridgeHistoryStatuses.Cancellation,
    },
    {
      date: '29 Jun 2021, 12:54',
      direction: {
        from: 'Mainnet',
        to: 'xDAI Chain',
      },
      sendingTx: '0xeb67...722e',
      receivingTx: '0xf692...ae2c',
      amount: '0.05 DAI',
      status: BridgeHistoryStatuses.ClaimToken,
    },
    {
      date: '29 Jun 2021, 12:54',
      direction: {
        from: 'Mainnet',
        to: 'xDAI Chain',
      },
      sendingTx: '0xeb67...722e',
      receivingTx: '0xf692...ae2c',
      amount: '0.05 DAI',
      status: BridgeHistoryStatuses.Transfer,
    },
  ]
  return (
    <Table>
      <Desktop>
        <BridgeTableHeader items={headers} />

        {items?.map((item, index) => (
          <BridgeTableCol item={item} key={index.toString()} />
        ))}
      </Desktop>
      <Mobile>
        {items?.map((item, index) => (
          <Content key={index.toString()}>
            <BridgeTableHeader items={headers} />
            <BridgeTableCol item={item} />
          </Content>
        ))}
      </Mobile>
    </Table>
  )
}

export default BridgeTable
