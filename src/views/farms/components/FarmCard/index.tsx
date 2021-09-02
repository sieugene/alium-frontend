import { Button, Card, Flex, Text } from 'alium-uikit/src'
import React, { useState } from 'react'
import styled from 'styled-components'
import CardHeading from './CardHeading'

const StyledCard = styled(Card)`
  align-self: baseline;
`

const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
`

const ExpandingWrapper = styled.div`
  padding: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
`

interface FarmCardProps {}

const FarmCard: React.FC<FarmCardProps> = (props) => {
  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const totalValueFormatted = ''

  const lpLabel = 'PANCAKE'
  const multiplier = 'multiplier'
  const earnLabel = 'CAKE + Fees'

  const isPromotedFarm = 'CAKE'

  return (
    <StyledCard>
      <FarmCardInnerContainer>
        <CardHeading
          lpLabel={lpLabel}
          multiplier={multiplier}
          isCommunityFarm={true}
          token={'token'}
          quoteToken={'tokenquote'}
        />

        <Flex justifyContent='space-between' alignItems='center'>
          <Text>{'APR'}:</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' }}>
            <Button variant='secondary'>Harvest</Button>
          </Text>
        </Flex>
        <Flex justifyContent='space-between'>
          <Text>{'Earn'}:</Text>
          <Text bold>{earnLabel}</Text>
        </Flex>
        <div>CardActionContainter</div>
      </FarmCardInnerContainer>

      <ExpandingWrapper>
        <Button>Enable farm</Button>
        {showExpandableSection && <div>DetailsSection</div>}
      </ExpandingWrapper>
    </StyledCard>
  )
}

export default FarmCard
