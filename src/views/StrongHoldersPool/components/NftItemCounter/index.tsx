import styled from 'styled-components'
import NftItem from '../NftItem'

export default function NftItemCounter() {
  return (
    <NftItemCounter.Root>
      <NftItem />
      <NftItemCounter.Counter>X8</NftItemCounter.Counter>
    </NftItemCounter.Root>
  )
}

NftItemCounter.Root = styled.div`
  display: flex;
  align-items: flex-start;
`
NftItemCounter.Counter = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.3px;
  color: #0b1359;
  margin-left: 10px;
`
