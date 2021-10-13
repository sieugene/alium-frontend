import { ChevronRightIcon } from 'alium-uikit/src/components/Svg'
import { StyledInternalLink } from 'components/Shared'
import styled from 'styled-components'
import Title from 'views/StrongHoldersPool/components/Title'
import { typography } from 'views/StrongHoldersPool/mixins'
import NftItem from '../NftItem'

export interface NftItemCounterProps {
  counter: number
}

export default function NftItemCounter({ counter }: NftItemCounterProps) {
  return (
    <NftItemCounter.Root>
      <NftItem />
      <NftItemCounter.Info>
        <Title>Bonus NFT</Title>
        <NftItemCounter.Counter>X{counter}</NftItemCounter.Counter>
        <NftItemCounter.MoreDetails href='https://cybercity.game/' target='_blank'>
          More details
          <ChevronRightIcon color='currentColor' />
        </NftItemCounter.MoreDetails>
      </NftItemCounter.Info>
    </NftItemCounter.Root>
  )
}

NftItemCounter.Root = styled.div`
  display: flex;
  align-items: flex-start;
`

NftItemCounter.Counter = styled.div`
  ${typography.h6}
  margin: 4px 0;
  color: #0b1359;
`

NftItemCounter.MoreDetails = styled(StyledInternalLink)`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
`

NftItemCounter.Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`
