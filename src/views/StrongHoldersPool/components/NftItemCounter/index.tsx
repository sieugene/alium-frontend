import styled from 'styled-components'
import NftItem from '../NftItem'

export interface NftItemCounterProps {
  counter: number
}

export default function NftItemCounter({ counter }: NftItemCounterProps) {
  return (
    <NftItemCounter.Root>
      <NftItem />
      <NftItemCounter.Counter>X{counter}</NftItemCounter.Counter>
    </NftItemCounter.Root>
  )
}

NftItemCounter.Root = styled.div`
  display: flex;
  align-items: flex-start;
`
NftItemCounter.Counter = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.3px;
  color: #0b1359;
  margin-left: 10px;
`
