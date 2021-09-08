import BigNumber from 'bignumber.js'
import React from 'react'
import { Farm } from 'state/types'
import { InfoFarm } from '.'
import HarvestAction from '../HarvestAction'
import StakeAction from '../StakeAction'

export interface FarmWithStakedValue extends Farm {
  apr?: number
}
export interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  account?: string
  addLiquidityUrl?: string
  cakePrice?: BigNumber
  lpLabel?: string
}

const CardActionsContainer: React.FC<FarmCardActionsProps> = ({ farm, addLiquidityUrl, cakePrice, lpLabel }) => {
  const { earnings: earningsAsString = 0 } = farm.userData || {}
  const earnings = new BigNumber(earningsAsString)

  return (
    <div>
      <InfoFarm>
        <HarvestAction pid={farm?.pid} earnings={earnings} />
      </InfoFarm>

      <StakeAction lpLabel={lpLabel} cakePrice={cakePrice} addLiquidityUrl={addLiquidityUrl} farm={farm} />
    </div>
  )
}

export default CardActionsContainer
