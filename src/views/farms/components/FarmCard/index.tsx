import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/farms/farms.types'
import CardActionsContainer from './CardActionsContainer'
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

export const InfoFarm = styled.div<{ withBg?: boolean }>`
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  ${(props) => props.withBg && 'background: #f4f5fa;'}

  .title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
  .field {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  almBnbPrice: BigNumber
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, almBnbPrice }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const lpLabel = farm.lpSymbol?.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : t('ALM + Fees')

  return (
    <StyledCard>
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        isCommunityFarm={farm.isCommunity}
        token={farm.token}
        quoteToken={farm.quoteToken}
      />
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
          almBnbPrice={almBnbPrice}
          addLiquidityUrl='/none'
        />
      </ContentCard>
    </StyledCard>
  )
}

export default FarmCard
