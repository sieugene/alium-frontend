import React, { FC } from 'react'
import FarmActionModal, { FarmActionModalProps } from './FarmActionModal'

const DepositModal: FC<Omit<FarmActionModalProps, 'title'>> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  farm,
  almPrice,
}) => {
  const title = `Deposit ${tokenName} Tokens`

  return (
    <FarmActionModal
      max={max}
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      tokenName={tokenName}
      farm={farm}
      almPrice={almPrice}
      title={title}
    />
  )
}

export default DepositModal
