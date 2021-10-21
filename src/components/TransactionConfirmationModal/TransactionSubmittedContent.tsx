import { Token } from '@alium-official/sdk'
import { TransactionAddTokenWithSuccess } from 'components/Modal/transaction/TransactionCompleted'

interface TransactionSubmittedContentProps {
  onDismiss: () => void
  hash: string | undefined
  token?: Token
  amount?: string
}

const TransactionSubmittedContent = ({ onDismiss, hash, token, amount }: TransactionSubmittedContentProps) => {
  return <TransactionAddTokenWithSuccess amount={amount || ''} txHash={hash} cancel={onDismiss} token={token} />
}

export default TransactionSubmittedContent
