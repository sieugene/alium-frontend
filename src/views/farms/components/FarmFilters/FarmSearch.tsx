import { CloseIcon } from 'alium-uikit/src'
import { FARM_DESKTOP_MEDIA, FARM_TABLET_MEDIA } from 'constants/layout/farm.layout'
import useOnClickOutside from 'hooks/useOnClickOutside'
import React, { useRef, useState } from 'react'
import { Search } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import styled from 'styled-components'

const Wrapper = styled.div<{ activeFullWidth: boolean }>`
  position: relative;
  width: fit-content;
  @media screen and (max-width: ${FARM_DESKTOP_MEDIA}) {
    position: absolute;
    right: 0;
    top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    justify-content: flex-end;
    ${(props) =>
      props.activeFullWidth &&
      `
    width: 100%;
    right: 0;
    bottom: 16px;
    input {
      width: 100%;
      padding: 14px 80px 14px 16px;
      }
    `}
  }
  @media screen and (max-width: ${FARM_TABLET_MEDIA}) {
    position: absolute;
    right: 0;
    bottom: 16px;
    top: auto;
  }
`

const SearchInput = styled.input<{ isFilled: boolean; activeFullWidth: boolean }>`
  width: 257px;
  height: 48px;
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
  @media screen and (max-width: ${FARM_DESKTOP_MEDIA}) {
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

  @media screen and (max-width: ${FARM_DESKTOP_MEDIA}) {
    cursor: pointer;
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
  @media screen and (max-width: ${FARM_DESKTOP_MEDIA}) {
    height: 48px;
    width: 48px;
    box-sizing: border-box;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 70px;
    ${(props) => !props.activeFullWidth && 'display: none;'}
  }
`

const FarmSearch = () => {
  const { t } = useTranslation()
  const input = useRef(null)
  const [active, setActive] = useState(false)
  const value = useStoreFarms((state) => state.query)
  const setvalue = useStoreFarms((state) => state.setQuery)

  const isFilled = value?.length > 0
  const clear = () => {
    setvalue('')
  }
  const close = () => {
    setActive(false)
  }
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setvalue(event.target.value)
  }
  useOnClickOutside(input, close, ['close__farm', 'search__farm'])
  return (
    <Wrapper activeFullWidth={active}>
      <SearchInput
        ref={input}
        isFilled={isFilled}
        activeFullWidth={active}
        placeholder={t('Search Farms')}
        value={value}
        onChange={handleChangeQuery}
      />
      {isFilled && (
        <IconClose onClick={clear} activeFullWidth={active} id='close__farm'>
          <CloseIcon id='close__farm' />
        </IconClose>
      )}
      <IconSearch onClick={() => setActive(!active)} id='search__farm'>
        <Search id='search__farm' />
      </IconSearch>
    </Wrapper>
  )
}

export default FarmSearch
