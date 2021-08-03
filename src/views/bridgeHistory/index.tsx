import styled from 'styled-components'
import { BridgeWrapper } from 'views/bridge'
import BridgeTable from './components/BridgeTable'

const Wrapper = styled.div`
  width: 100%;
  .bridge__container {
    padding: 48px 12.6% 32px 12.6%;
    @media screen and (max-width: 1440px) {
      padding: 48px 5.6% 32px 5.6%;
    }
  }
`

const BridgeHistory = () => {
  return (
    <Wrapper>
      <BridgeWrapper className='bridge__container'>
        <p>back</p>
        <BridgeTable />
      </BridgeWrapper>
    </Wrapper>
  )
}

export default BridgeHistory
