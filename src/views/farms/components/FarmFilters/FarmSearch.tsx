import { CloseIcon } from 'alium-uikit/src'
import { useState } from 'react'
import { Search } from 'react-feather'
import styled from 'styled-components'

const DESKTOP_MEDIA = '1340px'

const Wrapper = styled.div<{ activeFullWidth: boolean }>`
  position: relative;
  @media screen and (max-width: ${DESKTOP_MEDIA}) {
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    justify-content: flex-end;
    ${(props) =>
      props.activeFullWidth &&
      `
    position: absolute;
    width: 100%;
    right: 0;
    input {
      width: 100%;
      padding: 14px 80px 14px 16px;
      }
    `}
  }
`

const SearchInput = styled.input<{ isFilled: boolean; activeFullWidth: boolean }>`
  width: 257px;
  height: 48px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: ${(props) => (props.isFilled ? '#6c5dd3' : '#8990a5')};

  border: 1px solid ${(props) => (props.isFilled ? '#6c5dd3' : '#d2d6e5')};
  box-sizing: border-box;
  border-radius: 6px;
  padding: 14px 80px 14px 16px;
  &:hover {
    border: 1px solid #8990a5;
  }
  &:active,
  &:focus {
    outline: none;
    border: 1px solid #6c5dd3;
    color: #6c5dd3;
  }
  transition: width 0.4s cubic-bezier(0, 0.795, 0, 1);
  @media screen and (max-width: ${DESKTOP_MEDIA}) {
    width: 48px;
    padding: 0;
    ${(props) =>
      !props.activeFullWidth &&
      `
      border: 1px solid #8990a5;
      color: transparent;
      &::placeholder{
        color: transparent;
      }
    `}
  }
`

const IconSearch = styled.div`
  position: absolute;
  right: 17px;
  top: 12px;
  svg {
    stroke: #8990a5;
  }
  @media screen and (max-width: ${DESKTOP_MEDIA}) {
    height: 48px;
    width: 48px;
    box-sizing: border-box;
    border-radius: 6px;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const IconClose = styled.div<{ activeFullWidth: boolean }>`
  svg {
    width: 24px;
    height: 24px;
  }
  position: absolute;
  right: 52px;
  top: 12px;
  cursor: pointer;
  @media screen and (max-width: ${DESKTOP_MEDIA}) {
    right: 70px;
    ${(props) => !props.activeFullWidth && 'display: none;'}
  }
`

const FarmSearch = () => {
  const [active, setActive] = useState(false)
  const [value, setvalue] = useState('')
  const isFilled = value?.length > 0
  const clear = () => {
    setvalue('')
  }
  return (
    <Wrapper activeFullWidth={active}>
      <SearchInput
        isFilled={isFilled}
        activeFullWidth={active}
        placeholder='Search Farms'
        value={value}
        onChange={({ target }) => setvalue(target?.value)}
      />
      {isFilled && (
        <IconClose onClick={clear} activeFullWidth={active}>
          <CloseIcon />
        </IconClose>
      )}
      <IconSearch onClick={() => setActive(!active)}>
        <Search />
      </IconSearch>
    </Wrapper>
  )
}

export default FarmSearch
