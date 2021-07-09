import { Modal } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import SlippageToleranceSetting from './SlippageToleranceSetting'
import TransactionDeadlineSetting from './TransactionDeadlineSetting'

const StyledModal = styled.div`
  max-width: 694px;
  width: 100%;
  z-index: inherit;
`

interface SettingsModalProps {
  onDismiss?: () => void
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const SettingsModal = ({ onDismiss = defaultOnDismiss }: SettingsModalProps) => {
  const { t } = useTranslation()
  return (
    <StyledModal>
      <Modal title={t('settings')} onDismiss={onDismiss}>
        <SlippageToleranceSetting />
        <TransactionDeadlineSetting />
      </Modal>
    </StyledModal>
  )
}

export default SettingsModal
