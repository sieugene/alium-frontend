import TransferError from 'components/Modal/transaction/TransferError'
import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

interface TransactionErrorContentProps {
  message: string
  onDismiss: () => void
  onRepeat: () => void
}

const StyledTransferError = styled(TransferError)`
  width: 100%;
  min-height: 363px;
`

const TransactionErrorContent = ({ message, onDismiss, onRepeat }: TransactionErrorContentProps) => {
  const theme = useContext(ThemeContext)
  return <StyledTransferError onRepeat={onRepeat} onClose={onDismiss} withoutWrapper />
}

export default TransactionErrorContent
