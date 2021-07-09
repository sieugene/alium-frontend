import { CalculateIcon, IconButton, useModal } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import { FC } from 'react'
import ApyCalculatorModal from './ApyCalculatorModal'

export interface ApyButtonProps {
  lpLabel?: string
  cakePrice?: BigNumber
  apy?: BigNumber
  addLiquidityUrl?: string
}

const ApyButton: FC<ApyButtonProps> = ({ lpLabel, cakePrice, apy, addLiquidityUrl }) => {
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal lpLabel={lpLabel} cakePrice={cakePrice} apy={apy} addLiquidityUrl={addLiquidityUrl} />,
  )

  return (
    <IconButton onClick={onPresentApyModal} variant='text' size='sm' ml='4px'>
      <CalculateIcon />
    </IconButton>
  )
}

export default ApyButton
