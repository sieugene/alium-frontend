import { Button } from 'alium-uikit/src'
import TransferError from 'components/Modal/transaction/TransferError'
import TransferLoader from 'components/Modal/transaction/TransferLoader'
import { FC } from 'hoist-non-react-statics/node_modules/@types/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useFarmTicket } from 'views/farms/hooks/useFarmTicket'
import { TicketLoadingText } from './BuyTicketModal'

const WrapperApprove = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;
    margin-bottom: 16px;
  }
  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    text-align: center;
    letter-spacing: 0.3px;

    color: #0b1359;
    margin-bottom: 32px;
  }
`

interface Props {
  nextStep: () => void
}
export const BuyTicketApproveStep: FC<Props> = ({ nextStep }) => {
  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState(false)
  const { approve } = useFarmTicket()

  const onRepeat = () => {
    setLoading(false)
    seterror(false)
  }
  const onApprove = async () => {
    try {
      setLoading(true)
      await approve()
      nextStep()
    } catch (error) {
      seterror(true)
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <TransferLoader withoutWrapper withoutHeader>
        <TicketLoadingText>Confirmation process...</TicketLoadingText>
      </TransferLoader>
    )
  }
  if (error) {
    return <TransferError onRepeat={onRepeat} style={{ marginTop: 0 }} withoutHeader withoutWrapper />
  }
  return (
    <WrapperApprove>
      <p>Only users who have bought a ticket can take part in the pharming program</p>
      <h3>Buy ticket for 1500 ALM</h3>
      <Button onClick={onApprove} disabled={loading}>
        Approve
      </Button>
    </WrapperApprove>
  )
}

export default BuyTicketApproveStep
