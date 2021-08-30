import { SortCardIcon } from 'images/farms/icons/sort-card-icon'
import { SortTableIcon } from 'images/farms/icons/sort-table-icon'
import { useState } from 'react'
import styled from 'styled-components'
import { objectParamsToFalse } from 'utils/common/objectParamsToFalse'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ClickableIcon = styled.div<{ active: boolean }>`
  cursor: pointer;
  svg {
    path {
      ${(props) => props.active && 'stroke: #6C5DD3;'}
    }
  }
`

export const FarmGridSort = () => {
  const [activeGrid, setActiveGrid] = useState({
    card: true,
    table: false,
  })

  const changeActive = (tab: keyof typeof activeGrid) => {
    setActiveGrid((state) => ({
      ...objectParamsToFalse(state),
      [tab]: true,
    }))
  }
  return (
    <Wrapper>
      <ClickableIcon onClick={() => changeActive('card')} active={activeGrid.card}>
        <SortCardIcon />
      </ClickableIcon>
      <ClickableIcon active={activeGrid.table} onClick={() => changeActive('table')}>
        <SortTableIcon />
      </ClickableIcon>
    </Wrapper>
  )
}
