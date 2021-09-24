import { Button } from 'alium-uikit/src'
import TransactionCompleted from 'components/Modal/transaction/TransactionCompleted'
import TransferError from 'components/Modal/transaction/TransferError'
import TransferLoader from 'components/Modal/transaction/TransferLoader'
import { useState } from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { getExplorerLink, getExplorerName } from 'utils'
import { useFarmTicket, useHasTicket } from 'views/farms/hooks/useFarmTicket'
import { BuyButton } from '../BuyTicketBtn'
import { TicketLoadingText } from './BuyTicketModal'

const CompletedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 24px;
  p {
    margin: 0;
    margin-bottom: 24px;
  }
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-bottom: 8px;
  }
`
const Amount = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0b1359;
  b {
    color: #1ea86d;
  }
  margin-bottom: 24px;
`
const ViewOn = styled(Button)``

const BuyTicketBuyStep = () => {
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState(false)
  const [success, setsuccess] = useState(false)
  const [txHash, setTxHash] = useState('')
  const { buyTicket } = useFarmTicket()
  const { onCheckHasTicket } = useHasTicket()
  const onRepeat = () => {
    setLoading(false)
    seterror(false)
    setsuccess(false)
    setTxHash('')
  }
  const onBuyTicket = async () => {
    try {
      setLoading(true)
      // const buyresult = await buyTicket()
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(new Error('test'))
        }, 3000)
      })
      // maybe checkout after
      await onCheckHasTicket()
      // setTxHash !
      setsuccess(true)
    } catch (error) {
      seterror(true)
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <TransferLoader>
        <TicketLoadingText>Purchase process…</TicketLoadingText>
      </TransferLoader>
    )
  }
  if (error) {
    return <TransferError onRepeat={onRepeat} style={{ marginTop: 0 }} />
  }
  if (success) {
    const link = getExplorerLink(currentChainId, txHash, 'transaction')
    return (
      <TransactionCompleted withoutHeader withoutWrapper>
        <CompletedWrapper>
          <h2>Successful purchase</h2>
          <Amount>
            Amount: <b>1500 ALM</b>
          </Amount>
          <a href={link} target='_blank'>
            <ViewOn variant='secondary'>View on {getExplorerName(currentChainId)}</ViewOn>
          </a>
        </CompletedWrapper>
      </TransactionCompleted>
    )
  }
  return (
    <TransactionCompleted withoutHeader withoutWrapper>
      <CompletedWrapper>
        <TicketLoadingText>Approved</TicketLoadingText>
        <BuyButton onClick={onBuyTicket}>Buy</BuyButton>
      </CompletedWrapper>
    </TransactionCompleted>
  )
}

export default BuyTicketBuyStep
