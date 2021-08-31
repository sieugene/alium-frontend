import { DropdownList } from 'alium-uikit/src/components/DropdownList'
import {
  FARM_DESKTOP_MEDIA,
  FARM_MAX_TABLET_MEDIA,
  FARM_MIN_TABLET_MEDIA,
  FARM_TABLET_MEDIA,
} from 'constants/layout/farm.layout'
import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
  @media screen and (max-width: ${FARM_DESKTOP_MEDIA}) {
    h2 {
      display: none;
    }
  }
`

const StyledDropdown = styled(DropdownList)`
  @media screen and (max-width: ${FARM_DESKTOP_MEDIA}) {
    width: 192px;
  }
  @media screen and (max-width: ${FARM_MAX_TABLET_MEDIA}) {
    width: 172px;
  }
`

export const FarmSortBy = () => {
  const list = ['hot', 'test', 'trtr', 'gfg']
  const [active, setActive] = useState(list[0])

  return (
    <Wrapper>
      <h2>Sort by</h2>
      <StyledDropdown list={list} active={active} select={(item: string) => setActive(item)} />
    </Wrapper>
  )
}
