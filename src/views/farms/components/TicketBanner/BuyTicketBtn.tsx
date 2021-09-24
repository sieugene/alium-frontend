import { Button } from 'alium-uikit/src'
import React, { useState } from 'react'
import styled from 'styled-components'
import BuyTicketModal from './modals/BuyTicketModal'

export const BuyButton = styled(Button)`
  background: #1ea76d;
  &:hover {
    background: #3c9c73 !important;
  }
`

export const BuyTicketBtn = () => {
  const [modalOpen, setmodalOpen] = useState(false)
  const show = () => {
    setmodalOpen(true)
  }
  const onDismiss = () => {
    setmodalOpen(false)
  }
  return (
    <>
      <BuyTicketModal modalOpen={modalOpen} onDismiss={onDismiss} />
      <BuyButton onClick={show}>To buy a ticket</BuyButton>
    </>
  )
}
