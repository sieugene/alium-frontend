import { Flex, Tag } from 'alium-uikit/src'
import React from 'react'
import styled from 'styled-components'
const backgroundImageBUSD = '/images/farms/icons/busd.svg'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: string
  quoteToken: string
}

const Wrapper = styled(Flex)``

const BgImg = styled.div`
  background-image: url(/images/farms/icons/bnb.png);
  background-size: contain;
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = () => {
  return (
    <Wrapper justifyContent='space-between' alignItems='center' mb='12px'>
      <BgImg />
      <Flex flexDirection='column' alignItems='flex-end'>
        <Flex justifyContent='center'>
          Core
          <MultiplierTag variant='secondary'>40x</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
