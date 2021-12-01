import { FARM_MOBILE_MEDIA } from 'constants/layout/farm.layout'
import styled from 'styled-components'
import { FarmGridSort } from './FarmGridSort'
import FarmSearch from './FarmSearch'
import { FarmSortBy } from './FarmSortBy'
import { FarmStakedSwitcher } from './FarmStakedSwitcher'
import { FarmTabs } from './FarmTabs'

const Container = styled.div`
  position: relative;
  bottom: 40px;
  padding-left: 16px;
  padding-right: 16px;

  @media screen and (max-width: ${FARM_MOBILE_MEDIA}) {
    padding-left: 8px;
    padding-right: 8px;
  }
`
const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 8px rgba(220, 224, 244, 0.56);
  border-radius: 6px;
  width: 100%;
  height: 80px;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  position: relative;

  & > * + * {
    margin-left: 16px;
  }
`

const FarmFilters = () => {
  return (
    <Container>
      <Wrapper>
        <FarmTabs />
        <FarmStakedSwitcher />
        <FarmGridSort />
        <FarmSortBy />
        <FarmSearch />
      </Wrapper>
    </Container>
  )
}

export default FarmFilters
