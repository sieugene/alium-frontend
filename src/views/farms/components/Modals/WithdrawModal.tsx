import React, { FC } from 'react'
import FarmActionModal, { FarmActionModalProps } from './FarmActionModal'

const WithdrawModal: FC<Omit<FarmActionModalProps, 'title'>> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  farm,
  almPrice,
}) => {
  const title = `Withdraw ${tokenName}`
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
    />
  )
}

export default WithdrawModal
