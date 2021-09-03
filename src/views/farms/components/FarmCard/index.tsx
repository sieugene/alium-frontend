import { Button, Card, Flex, Text } from 'alium-uikit/src'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/farms/farms.types'
import CardHeading from './CardHeading'

const StyledCard = styled(Card)`
  align-self: baseline;
  width: 354px;
  height: 404px;
`

const FarmCardInnerContainer = styled(Flex)``

const ExpandingWrapper = styled.div`
  padding: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
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
  const earnLabel = farm.dual ? farm.dual.earnLabel : t('CAKE + Fees')

  const liquidityUrlPathParts = '/test'
  const addLiquidityUrl = `liqudity/${liquidityUrlPathParts}`
  const lpAddress = farm.lpAddresses
  const isPromotedFarm = farm.token.symbol === 'CAKE'

  return (
    <StyledCard>
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        isCommunityFarm={farm.isCommunity}
        token={farm.token}
        quoteToken={farm.quoteToken}
      />

      <Flex justifyContent='space-between' alignItems='center'>
        <Text>APR:</Text>
        <Text bold style={{ display: 'flex', alignItems: 'center' }}>
          <Button variant='secondary'>Harvest</Button>
        </Text>
      </Flex>
      <Flex justifyContent='space-between'>
        <Text>Earn:</Text>
        <Text bold>{earnLabel}</Text>
      </Flex>
      <div>CardActionContainter</div>

      <ExpandingWrapper>
        <Button>Enable farm</Button>
        {showExpandableSection && <div>DetailsSection</div>}
      </ExpandingWrapper>
    </StyledCard>
  )
}

export default FarmCard
