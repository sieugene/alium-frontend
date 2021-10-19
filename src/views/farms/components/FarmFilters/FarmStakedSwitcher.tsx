import { useTranslation } from 'react-i18next'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import styled from 'styled-components'

const SwitchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
`
const Switch = styled.div<{ align: 'start' | 'end'; active: boolean }>`
  background: ${(props) => (props.active ? '#B9E4D2' : '#f4f5fa')};
  border: 1.42857px solid ${(props) => (props.active ? '#24BA7B' : '#D2D6E5')};
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
  margin-right: 8px;

  @media screen and (min-width: 1440px) {
    margin-right: 16px;
  }
`
export const FarmStakedSwitcher = () => {
  const { t } = useTranslation()
  const stakedOnly = useStoreFarms((state) => state.stakedOnly)
  const setStakedOnly = useStoreFarms((state) => state.setStakedOnly)
  return (
    <SwitchWrap>
      <Switch align={stakedOnly ? 'end' : 'start'} active={stakedOnly} onClick={() => setStakedOnly(!stakedOnly)}>
        <span />
      </Switch>
      <h3>{t('Staked only')}</h3>
    </SwitchWrap>
  )
}
