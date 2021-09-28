import React, { FC } from 'react'
import FarmActionModal, { FarmActionModalProps } from './FarmActionModal'

const DepositModal: FC<Omit<FarmActionModalProps, 'title' | 'type'>> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  farm,
  almPrice,
}) => {
  const title = `Stake LP tokens`

  return (
    <FarmActionModal
      max={max}
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      tokenName={tokenName}
      farm={farm}
      almPrice={almPrice}
      title={title}
      type='stake'
    />
  )
}

export default DepositModal
