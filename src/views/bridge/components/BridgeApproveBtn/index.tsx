import { BigNumber } from 'ethers'
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
  const { toastError } = useToast()
  const showError = useCallback((msg) => {
    if (msg) {
      toastError(msg)
    }
  }, [])
  const valid = useCallback(() => {
    if (amount.lte(0)) {
      showError('Please specify amount')
      return false
    }
    if (balance.lt(amount)) {
      showError('Not enough balance')
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
            toastError(
              `There is problem with the token unlock. 
			   Try to revoke previous approval if 
			   any on https://revoke.cash/`,
            )
          } else {
            logError(error)
          }
        } else {
          showError('Impossible to perform the operation. Reload the application and try again.')
        }
      })
    }
  }, [unlockLoading, buttonDisabled, valid, showError, approve])
  return (
    <>
      <BridgeTransferButton onClick={onClick} {...props} disabled={unlockLoading}>
        {buttonDisabled ? 'Unlocked' : 'Unlock'}
      </BridgeTransferButton>
    </>
  )
}

export default BridgeApproveBtn
