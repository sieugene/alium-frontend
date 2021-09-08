import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/farms/farms.types'
import CardHeading from './CardHeading'

const StyledCard = styled.div`
  width: 354px;
  height: 100%;
  background: #ffffff;
  border-radius: 6px;
  padding: 4px 4px 24px 4px;
  position: relative;
`

export const ContentCard = styled.div`
  padding: 0px 16px 0px 16px;
`

const FooterCard = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`

export interface FarmCardProps {
  farm: FarmWithStakedValue
  cakePrice: BigNumber
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, cakePrice }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const lpLabel = farm.lpSymbol?.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : t('ALM + Fees')

  return (
    <StyledCard>
      <CardHeading farm={farm} />
      <ContentCard>
        <InfoFarm>
          <div className='title'>APR</div>
          <div className='field'>{farm.apr || 0}%</div>
        </InfoFarm>
        <InfoFarm withBg>
          <div className='title'>Earn</div>
          <div className='field'>{earnLabel}</div>
        </InfoFarm>
        <CardActionsContainer
          farm={farm}
          lpLabel={lpLabel}
          account={account}
          cakePrice={cakePrice}
          addLiquidityUrl='/none'
        />
      </ContentCard>
    </StyledCard>
  )
}

export default FarmCard
