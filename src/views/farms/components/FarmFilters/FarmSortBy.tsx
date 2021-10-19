import { DropdownList } from 'alium-uikit/src/components/DropdownList'
import {
  FARM_DESKTOP_MEDIA,
  FARM_EXT_MOBILE_MEDIA,
  FARM_LAPTOP_MEDIA,
  FARM_MOBILE_MEDIA,
  FARM_TABLET_MEDIA,
} from 'constants/layout/farm.layout'
import { useTranslation } from 'react-i18next'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import styled from 'styled-components'
import { FarmSortOption } from 'views/farms/farms.types'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
    margin-right: 16px;
  }
  @media screen and (max-width: ${FARM_LAPTOP_MEDIA}) {
    justify-content: center;
  }
  @media screen and (max-width: ${FARM_DESKTOP_MEDIA}) {
    h2 {
      display: none;
    }
  }
  @media screen and (max-width: ${FARM_MOBILE_MEDIA}) {
    position: relative;
    right: 100px;
  }
  @media screen and (max-width: ${FARM_EXT_MOBILE_MEDIA}) {
    right: 0;
  }
`

const StyledDropdown = styled(DropdownList)`
  @media screen and (max-width: ${FARM_DESKTOP_MEDIA}) {
    width: 192px;
  }
  @media screen and (max-width: ${FARM_TABLET_MEDIA}) {
    width: 172px;
  }
`

export const FarmSortBy = () => {
  const { t } = useTranslation()
  const sortOption = useStoreFarms((state) => t(state.sortOption))
  const setSortOption = useStoreFarms((state) => state.setSortOption)
  const list = Object.values(FarmSortOption).map((opt) => t(opt))

  return (
    <Wrapper>
      <h2>{t('Sort by')}</h2>
      <StyledDropdown list={list} active={sortOption} select={(item: FarmSortOption) => setSortOption(item)} />
    </Wrapper>
  )
}
