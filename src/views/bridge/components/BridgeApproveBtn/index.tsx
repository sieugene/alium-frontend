import { BigNumber } from 'ethers'
import { useTranslation } from 'next-i18next'
import React, { FC, useCallback } from 'react'
import { useToast } from 'state/hooks'
import { isRevertedError } from 'utils/bridge/amb'
import { logError } from 'utils/bridge/helpers'
import { BridgeTransferButton } from '../BridgeTransferButton'

interface ApproveProps {
  desktop?: boolean
  mobile?: boolean
  amount: BigNumber
  balance: BigNumber
  unlockLoading: boolean
  buttonDisabled: boolean
  approve: () => Promise<void>
}

const BridgeApproveBtn: FC<ApproveProps> = ({ amount, balance, unlockLoading, buttonDisabled, approve, ...props }) => {
  const { t } = useTranslation()
  const { toastError } = useToast()

  const showError = useCallback((msg) => {
    if (msg) {
      toastError(msg)
    }
  }, [])

  const valid = useCallback(() => {
    if (amount.lte(0)) {
      showError(t('common.messages.pleaseSpecify'))
      return false
    }
    if (balance.lt(amount)) {
      showError(t('common.messages.notEnough'))
      return false
    }
    return true
  }, [amount, balance, showError])

  const onClick = useCallback(() => {
    if (!unlockLoading && !buttonDisabled && valid()) {
      approve().catch((error) => {
        if (error?.message) {
          if (
            isRevertedError(error) ||
            (error.data && (error.data.includes('Bad instruction fe') || error.data.includes('Reverted')))
          ) {
            toastError(t('common.messages.thereIsProblemToken'))
          } else {
            logError(error)
          }
        } else {
          showError(t('common.messages.impossibleToPerform'))
        }
      })
    }
  }, [unlockLoading, buttonDisabled, valid, showError, approve])

  return (
    <BridgeTransferButton onClick={onClick} {...props} disabled={unlockLoading}>
      {buttonDisabled ? t('common.button.unlocked') : t('common.button.unlock')}
    </BridgeTransferButton>
  )
}

export default BridgeApproveBtn
