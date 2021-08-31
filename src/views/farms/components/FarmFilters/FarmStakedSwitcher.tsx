import { FARM_MIN_TABLET_MEDIA, FARM_MOBILE_MEDIA } from 'constants/layout/farm.layout'
import { useState } from 'react'
import styled from 'styled-components'

const SwitchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
  @media screen and (max-width: ${FARM_MIN_TABLET_MEDIA}) {
    flex: 50%;
    justify-content: flex-end;
  }
  @media screen and (max-width: ${FARM_MOBILE_MEDIA}) {
    flex: inherit;
    width: 50%;
  }
`
const Switch = styled.div<{ align: 'start' | 'end' }>`
  background: #f4f5fa;
  border: 1.42857px solid #d2d6e5;
  box-sizing: border-box;
  border-radius: 50px;
  width: 56px;
  height: 28px;
  padding: 2.2px;
  cursor: pointer;
  display: flex;
  justify-content: flex-${(props) => props.align};
  span {
    height: 20px;
    width: 20px;
    background: #ffffff;
    box-shadow: 0px 4.2px 8.4px rgba(185, 189, 208, 0.4);
    border-radius: 50%;
    display: block;
  }
`
export const FarmStakedSwitcher = () => {
  const [active, setActive] = useState(false)
  return (
    <SwitchWrap onClick={() => setActive(!active)}>
      <Switch align={active ? 'end' : 'start'}>
        <span />
      </Switch>
      <h3>Staked only</h3>
    </SwitchWrap>
  )
}
