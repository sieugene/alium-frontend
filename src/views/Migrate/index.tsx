import { CardBody, Heading } from 'alium-uikit/src'
import { CardNav } from 'components/CardNav'
import { AutoColumn } from 'components/Column'
import { BottomGrouping, Wrapper } from 'components/swap/styleds'
import { FC } from 'react'
import styled from 'styled-components'
import SwapAppBody from 'views/Swap/SwapAppBody'

const CardWrapper = styled.div`
  width: 100%;
`

const StyledCardHeader = styled.div`
  border-bottom: 1px solid #f4f5fa;
  padding: 24px 30px;
`

const ButtonWrap = styled.div`
  margin-top: 15px;
  max-width: 50%;
`

const ViewMigrate: FC = () => {
  return (
    <CardWrapper>
      <CardNav activeIndex={2} isWithMigrate={true} />
      <SwapAppBody>
        <StyledCardHeader>
          <Heading color='heading'>Migrate</Heading>
        </StyledCardHeader>
        <Wrapper id='swap-page'>
          <CardBody>
            <AutoColumn gap='md' />
            <ButtonWrap>
              <BottomGrouping>migrate</BottomGrouping>
            </ButtonWrap>
          </CardBody>
        </Wrapper>
      </SwapAppBody>
    </CardWrapper>
  )
}

export default ViewMigrate
