import { Text } from 'alium-uikit/src'
import TransferLoader from 'components/Modal/transaction/TransferLoader'
import { AutoColumn } from '../Column'

interface ConfirmationPendingContentProps {
  onDismiss: () => void
  pendingText: string
}

const ConfirmationPendingContent = ({ onDismiss, pendingText }: ConfirmationPendingContentProps) => {
  return (
    <TransferLoader onCancel={onDismiss}>
      <AutoColumn gap='12px' justify='center' style={{ marginTop: 24 }}>
        <AutoColumn gap='12px' justify='center'>
          <Text fontSize='14px'>
            <strong>{pendingText}</strong>
          </Text>
        </AutoColumn>
        <Text fontSize='14px'>Confirm this transaction in your wallet</Text>
      </AutoColumn>
    </TransferLoader>
  )
}

export default ConfirmationPendingContent
