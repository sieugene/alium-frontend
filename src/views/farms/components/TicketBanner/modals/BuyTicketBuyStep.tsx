import { Button } from 'alium-uikit/src'
import TransactionCompleted from 'components/Modal/transaction/TransactionCompleted'
import TransferError from 'components/Modal/transaction/TransferError'
import TransferLoader from 'components/Modal/transaction/TransferLoader'
import { useState } from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { getExplorerLink, useExplorerName } from 'utils'
import { useFarmTicket } from 'views/farms/hooks/useFarmTicket'
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
  const { explorerName } = useExplorerName(currentChainId)
  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState(false)
  const [success, setsuccess] = useState(false)
  const [txHash, setTxHash] = useState('')
  const { buyTicket } = useFarmTicket()
  const onRepeat = () => {
    setLoading(false)
    seterror(false)
    setsuccess(false)
    setTxHash('')
  }
  const onBuyTicket = async () => {
    try {
      setLoading(true)
      const transaction = await buyTicket()
      const buyResult = await transaction?.wait()
      setTxHash(buyResult?.transactionHash)
      setsuccess(true)
    } catch (error) {
      seterror(true)
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <TransferLoader withoutWrapper withoutHeader>
        <TicketLoadingText>Purchase process…</TicketLoadingText>
      </TransferLoader>
    )
  }
  if (error) {
    return <TransferError onRepeat={onRepeat} style={{ marginTop: 0 }} withoutWrapper withoutHeader />
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
            <ViewOn variant='secondary'>View on {explorerName}</ViewOn>
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
