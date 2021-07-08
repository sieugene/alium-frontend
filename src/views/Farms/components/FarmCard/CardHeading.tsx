import { Flex, Heading, Image, Tag } from 'alium-uikit/src'
import { CommunityTag, CoreTag } from 'components/Tags'
import { FC } from 'react'
import styled from 'styled-components'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: FC<ExpandableSectionProps> = ({ lpLabel, multiplier, isCommunityFarm, farmImage, tokenSymbol }) => {
  return (
    <Wrapper justifyContent='space-between' alignItems='center' mb='12px'>
      <Image src={`/images/farms/${farmImage}.svg`} alt={tokenSymbol} width={64} height={64} />
      <Flex flexDirection='column' alignItems='flex-end'>
        <Heading mb='4px'>{lpLabel}</Heading>
        <Flex justifyContent='center'>
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <MultiplierTag variant='secondary'>{multiplier}</MultiplierTag>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
