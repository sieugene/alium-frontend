import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/farms/farms.types'
import DetailsSection from '../DetailsSection'
import { InfoApr, InfoEarn, InfoRow, InfoTitle, InfoValue, useInfoEarned, useInfoStaked } from '../Info'
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
  almBnbPrice: BigNumber
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, almBnbPrice }) => {
  const earned = useInfoEarned(farm)
  const staked = useInfoStaked({
    farm,
    addLiquidityUrl: '/none',
  })
  return (
    <StyledCard>
      <CardHeading farm={farm} />
      <ContentCard>
        <InfoRow>
          <InfoApr farm={farm} />
        </InfoRow>
        <InfoRow withBg>
          <InfoEarn farm={farm} />
        </InfoRow>
        <InfoRow>
          <InfoTitle>
            {earned.titleNode}
            {earned.displayBalanceNode}
            {earned.earningsBusdNode}
          </InfoTitle>
          <InfoValue>{earned.harvestButtonNode}</InfoValue>
        </InfoRow>
        <InfoRow withBg>
          <InfoTitle>
            <p>{staked.titleNode}</p>
            <p>{staked.displayBalanceNode}</p>
          </InfoTitle>
          <InfoValue>
            {staked.stakingButtonsNode}
            {staked.balanceNode}
          </InfoValue>
        </InfoRow>
        <FooterCard>
          {staked.actionsNode}
          <DetailsSection farm={farm} />
        </FooterCard>
      </ContentCard>
    </StyledCard>
  )
}

export default FarmCard
