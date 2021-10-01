import React, { FC } from 'react'
import FarmActionModal, { FarmActionModalProps } from './FarmActionModal'

const WithdrawModal: FC<Omit<FarmActionModalProps, 'title' | 'type'>> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  farm,
  almPrice,
}) => {
  const title = `Unstake LP tokens`
  return (
    <FarmActionModal
      max={max}
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      tokenName={tokenName}
      farm={farm}
      almPrice={almPrice}
      title={title}
      withoutRoi
      type='unstake'
    />
  )
}

export default WithdrawModal
