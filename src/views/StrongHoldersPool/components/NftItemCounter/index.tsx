import { ChevronRightIcon } from 'alium-uikit/src/components/Svg'
import { StyledInternalLink } from 'components/Shared'
import styled from 'styled-components'
import Title from 'views/StrongHoldersPool/components/Title'
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
  margin-top: 4px;
  margin-bottom: 4px;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.3px;
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
