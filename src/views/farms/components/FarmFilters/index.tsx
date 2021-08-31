import { FARM_LAPTOP_MEDIA } from 'constants/layout/farm.layout'
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
`
const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 8px rgba(220, 224, 244, 0.56);
  border-radius: 6px;
  width: 100%;
  height: 80px;
  padding: 16px;
  display: grid;

  position: relative;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
  @media screen and (max-width: ${FARM_LAPTOP_MEDIA}) {
    grid-template-columns: auto auto auto auto auto;
    grid-row-gap: 30px;
    justify-items: stretch;
    align-items: stretch;
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
