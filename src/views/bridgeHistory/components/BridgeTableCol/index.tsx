import { ArrowRight } from 'images/ArrowRight'
import React, { FC } from 'react'
import styled from 'styled-components'
import { BridgeHistoryStatuses } from 'views/bridgeHistory/bridgeHistory.types'
import BridgeStatusItem from '../BridgeStatusItem'

const Row = styled.div`
  border-bottom: 1px solid #ebedf9;
  display: grid;
  grid-template-columns: 2fr 3fr 1.5fr 1.5fr 1.5fr 1.5fr;
  @media screen and (max-width: 1240px) {
    grid-template-columns: 1.5fr 2.5fr 1.5fr 1.5fr 1.5fr 1.5fr;
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: 4fr 1.5fr 1.5fr 1.5fr 1.5fr;
  }
  grid-gap: 16px;
  min-height: 64px;
  align-items: center;
  padding: 16px;
  @media screen and (max-width: 768px) {
    border-bottom: none;
    display: flex;
    grid-template-columns: none;
    grid-gap: 0px;
    flex-direction: column;
    align-items: flex-end;
    padding: 0;
  }
  div {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
  }
  &:hover {
    background: #f4f5fa;
    @media screen and (max-width: 768px) {
      background: transparent;
    }
  }
`

const Date = styled.div`
  display: flex;
  min-width: 124px;
  flex-direction: column;
  align-items: baseline;
  @media screen and (max-width: 1240px) {
    width: 80px;
    min-width: 0px;
  }
  @media screen and (max-width: 1024px) {
    width: auto;
  }
  @media screen and (max-width: 768px) {
    align-items: flex-end;
    margin-bottom: 8px;
  }
`

const Direction = styled.div<{ desktop: boolean }>`
  ${(props) => (props.desktop ? 'display: flex' : 'display: none')};
  align-items: center;
  svg {
    margin-right: 8px;
    margin-left: 8px;
  }
  @media screen and (max-width: 1024px) {
    ${(props) => (props.desktop ? 'display: none' : 'display: flex')};
  }
  @media screen and (max-width: 768px) {
    ${(props) => (props.desktop ? 'display: flex' : 'display: none')};
  }
  div {
    width: auto;
    max-width: 90px;
    height: 30px;
    display: flex;
    justify-content: center;
    border-radius: 6px;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    padding: 5px 8px 5px 8px;
    white-space: nowrap;
  }
  .from {
    color: #24ba7b;
    background: #dfefed;
  }
  .to {
    color: #6c5dd3;
    background: #e9e7f8;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
  }
`

const Sending = styled.div`
  color: #6c5dd3;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
  }
`

const Receiving = styled.div`
  color: #6c5dd3;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
  }
`

const Amount = styled.div`
  color: #0b1359;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
  }
`

export interface RowItem {
  date: string
  direction: {
    from: string
    to: string
  }
  sendingTx: string
  receivingTx: string
  amount: string
  status: BridgeHistoryStatuses
}

interface Props {
  item: RowItem
}

const BridgeTableCol: FC<Props> = ({ item }) => {
  return (
    <Row>
      <Date>
        {item.date}
        <Direction desktop={false}>
          <div className='from'>{item.direction.from}</div>
          <ArrowRight />
          <div className='to'>{item.direction.to}</div>
        </Direction>
      </Date>
      <Direction desktop={true}>
        <div className='from'>{item.direction.from}</div>
        <ArrowRight />
        <div className='to'>{item.direction.to}</div>
      </Direction>
      <Sending>{item.sendingTx}</Sending>
      <Receiving>{item.receivingTx}</Receiving>
      <Amount>{item.amount}</Amount>
      <BridgeStatusItem status={item.status} />
    </Row>
  )
}

export default BridgeTableCol
