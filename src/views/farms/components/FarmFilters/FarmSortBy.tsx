import { DropdownList } from 'alium-uikit/src/components/DropdownList'
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
    margin-right: 16px;
  }
`

export const FarmSortBy = () => {
  const list = ['hot', 'test', 'trtr', 'gfg']
  const [active, setActive] = useState(list[0])

  return (
    <Wrapper>
      <h2>Sort by</h2>
      <DropdownList list={list} active={active} select={(item: string) => setActive(item)} />
    </Wrapper>
  )
}
