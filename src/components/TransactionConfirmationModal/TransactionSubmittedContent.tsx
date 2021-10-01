import { Token } from '@alium-official/sdk'
import { TransactionAddTokenWithSuccess } from 'components/Modal/transaction/TransactionCompleted'

interface TransactionSubmittedContentProps {
  onDismiss: () => void
  hash: string | undefined
  token?: Token
}

const TransactionSubmittedContent = ({ onDismiss, hash, token }: TransactionSubmittedContentProps) => {
  return <TransactionAddTokenWithSuccess txHash={hash} cancel={onDismiss} token={token} />
}

export default TransactionSubmittedContent
