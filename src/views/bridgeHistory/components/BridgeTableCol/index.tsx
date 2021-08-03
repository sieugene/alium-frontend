import { ArrowRight } from 'images/ArrowRight'
import { FC } from 'react'
import styled from 'styled-components'
import { BridgeHistoryStatuses } from 'views/bridgeHistory/bridgeHistory.types'

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
  div {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
  }
  &:hover {
    background: #f4f5fa;
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
  div {
    width: auto;
    max-width: 90px;
    height: 30px;
    display: flex;
    justify-content: center;
    border-radius: 6px;
    align-items: center;
    font-family: Roboto;
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
`

const Sending = styled.div`
  color: #6c5dd3;
  display: flex;
  align-items: center;
`

const Receiving = styled.div`
  color: #6c5dd3;
  display: flex;
  align-items: center;
`

const Amount = styled.div`
  color: #0b1359;
  display: flex;
  align-items: center;
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
      <Status status={item.status} />
    </Row>
  )
}

const StyledStatus = styled.div<{ status: BridgeHistoryStatuses }>`
  text-align: right;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: ${(props) => {
    switch (props.status) {
      case BridgeHistoryStatuses.Transferred:
        return '#24BA7B'
      case BridgeHistoryStatuses.Cancellation:
        return '#FF4D00'
      case BridgeHistoryStatuses.ClaimToken:
      case BridgeHistoryStatuses.Transfer:
        return '#FFA100'
      default:
        return '#FF4D00'
    }
  }};
`

const Status: FC<{ status: BridgeHistoryStatuses }> = ({ status }) => {
  return <StyledStatus status={status}>{status}</StyledStatus>
}

export default BridgeTableCol
