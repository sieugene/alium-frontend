import { FC } from 'react'
import styled from 'styled-components'
import HomeNew from './components/HomeNew'

const PageWrap = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`
const Wrapper = styled.div`
  max-width: 1440px;
  padding: 30px;
  width: 100%;
`

const Home: FC = () => {
  return (
    <PageWrap>
      <Wrapper>
        <HomeNew />
      </Wrapper>
    </PageWrap>
  )
}

export default Home
