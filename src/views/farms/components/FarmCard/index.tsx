import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/farms/farms.types'
import DetailsSection from '../DetailsSection'
import { EarnsFarm, InfoApr, InfoEarn, InfoRow, InfoTitle, InfoValue, useInfoEarned, useInfoStaked } from '../Info'
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

const FooterCard = styled.div<{ isSingle: boolean }>`
  margin-top: 16px;
  display: flex;
  justify-content: ${(props) => (props.isSingle ? 'flex-end' : 'space-between')};
`

export interface FarmCardProps {
  farm: FarmWithStakedValue
  almPrice: BigNumber
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, almPrice }) => {
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
        <InfoRow style={{ minHeight: '70px' }}>
          <InfoTitle>
            {earned.titleNode}
            <EarnsFarm earningsBusdExist={Boolean(earned.earningsBusdNode)}>
              {earned.displayBalanceNode}
              {earned.earningsBusdNode}
            </EarnsFarm>
          </InfoTitle>
          <InfoValue>{earned.harvestButtonNode}</InfoValue>
        </InfoRow>
        <InfoRow withBg>
          <InfoTitle>
            <p>{staked.titleNode}</p>
            <EarnsFarm earningsBusdExist={Boolean(earned.displayBalanceNode)}>
              <p>{staked.displayBalanceNode}</p>
              <p> {staked.balanceNode}</p>
            </EarnsFarm>
          </InfoTitle>
          <InfoValue>{staked.stakingButtonsNode}</InfoValue>
        </InfoRow>
        <FooterCard isSingle={!staked.actionsNode}>
          {staked.actionsNode}
          <DetailsSection farm={farm} />
        </FooterCard>
      </ContentCard>
    </StyledCard>
  )
}

export default FarmCard
