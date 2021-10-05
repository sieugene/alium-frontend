import { Token } from '@alium-official/sdk'
import { SwapModal } from 'components/Modal/SwapModal'
import { useActiveWeb3React } from 'hooks'
import { ReactNode } from 'react'
import ConfirmationPendingContent from './ConfirmationPendingContent'
import TransactionSubmittedContent from './TransactionSubmittedContent'

interface ConfirmationModalProps {
  isOpen: boolean
  onDismiss: () => void
  hash: string | undefined
  content: ReactNode
  attemptingTxn: boolean
  pendingText: string
  token?: Token
}

const TransactionConfirmationModal = ({
  isOpen,
  onDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  token,
}: ConfirmationModalProps) => {
  const { chainId } = useActiveWeb3React()

  if (!chainId) return null

  // confirmation screen
  return (
    <SwapModal isOpen={isOpen} onDismiss={onDismiss}>
      {attemptingTxn ? (
        <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent token={token} hash={hash} onDismiss={onDismiss} />
      ) : (
        content
      )}
    </SwapModal>
  )
}

export default TransactionConfirmationModal
