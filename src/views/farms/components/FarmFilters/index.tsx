import styled from 'styled-components'
import { FarmGridSort } from './FarmGridSort'
import { FarmSortBy } from './FarmSortBy'
import { FarmStakedSwitcher } from './FarmStakedSwitcher'
import { FarmTabs } from './FarmTabs'

const Container = styled.div`
  position: relative;
  bottom: 40px;
  padding-left: 16px;
  padding-right: 16px;
`
const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 8px rgba(220, 224, 244, 0.56);
  border-radius: 6px;
  width: 100%;
  height: 80px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
`

const FarmFilters = () => {
  return (
    <Container>
      <Wrapper>
        <FarmTabs />
        <FarmStakedSwitcher />
        <FarmGridSort />
        <FarmSortBy />
      </Wrapper>
    </Container>
  )
}

export default FarmFilters
