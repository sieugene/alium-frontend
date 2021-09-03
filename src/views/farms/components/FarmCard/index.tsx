import { Button, ChevronDownIcon } from 'alium-uikit/src'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/farms/farms.types'
import CardHeading from './CardHeading'

const StyledCard = styled.div`
  width: 354px;
  height: auto;
  background: #ffffff;
  border-radius: 6px;
  padding: 4px 4px 24px 4px;
`

const Content = styled.div`
  padding: 0px 16px 0px 16px;
`

const Info = styled.div<{ withBg?: boolean }>`
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

const Footer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const { t } = useTranslation()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const totalValueFormatted = farm.liquidity?.gt(0)
    ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : ''

  const lpLabel = farm.lpSymbol?.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : t('ALM + Fees')

  const liquidityUrlPathParts = '/test'
  const addLiquidityUrl = `liqudity/${liquidityUrlPathParts}`
  const lpAddress = farm.lpAddresses
  const isPromotedFarm = farm.token.symbol === 'ALM'

  return (
    <StyledCard>
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        isCommunityFarm={farm.isCommunity}
        token={farm.token}
        quoteToken={farm.quoteToken}
      />
      <Content>
        <Info>
          <div className='title'>APR</div>
          <div className='field'>{farm.apr || 0}%</div>
        </Info>
        <Info withBg>
          <div className='title'>Earn</div>
          <div className='field'>{earnLabel}</div>
        </Info>
        <Info>
          <div className='title'>
            ALM earned
            <p>000</p>
            {/* <HarvestAction earnings={earnings} pid={pid} /> */}
          </div>
          <div className='field'>
            <Button variant='secondary'>Harvest</Button>
          </div>
        </Info>
        <Info withBg>
          <div className='title'>ALM-BNB LP Staked</div>
          <div className='field'>-</div>
        </Info>
        <Footer>
          <Button>Enable farm</Button>
          <div className='details'>
            <p>Details</p>
            <ChevronDownIcon />
          </div>
        </Footer>
      </Content>
    </StyledCard>
  )
}

export default FarmCard
