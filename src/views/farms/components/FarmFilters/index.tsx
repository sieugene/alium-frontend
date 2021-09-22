import {
  FARM_EXT_MOBILE_MEDIA,
  FARM_LAPTOP_MEDIA,
  FARM_MOBILE_MEDIA,
  FARM_TABLET_MEDIA,
} from 'constants/layout/farm.layout'
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
  display: grid;

  position: relative;
  grid-template-columns: 186px 149px 56px 1.4fr 0.3fr;
  grid-gap: 16px;
  @media screen and (max-width: ${FARM_LAPTOP_MEDIA}) {
    height: auto;
    grid-template-columns: 0.7fr 0.6fr 0.3fr 0.5fr 64px;
    justify-items: flex-start;
    grid-row-gap: 30px;
    align-items: stretch;
  }
  @media screen and (max-width: ${FARM_TABLET_MEDIA}) {
    grid-template-columns: 0.4fr 1fr 0.4fr;
  }
  @media screen and (max-width: ${FARM_MOBILE_MEDIA}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: ${FARM_EXT_MOBILE_MEDIA}) {
    grid-template-columns: 1fr;
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
