import { Button,Flex } from '@alium-official/uikit'
import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { ROUTES } from 'routes'
import styled from 'styled-components'
import { ReactComponent as MyCollectionIcon } from '../../../../assets/images/nav-collection.svg'
import { ReactComponent as AlmTokenStatsIcon } from '../../../../assets/images/nav-stats.svg'

const NavWrap = styled(Flex)`
  padding: 8px 16px;
  border: 1px solid #D2D6E5;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 56px;
  width: fit-content;
  a:first-child {
    margin-right: 8px;
  }
  @media (max-width: 568px){
    flex-wrap: wrap;
    button {
      margin: 0;
      width: 100%;
      &:first-child {
        margin-right: 0;
        margin-bottom: 8px;
      }
    }
  }
`

const IconWrapper = styled.div<{ size?: number, active: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? `${size}px` : '32px')};
    width: ${({ size }) => (size ? `${size}px` : '32px')};
  }
  svg {
   path{
     stroke: ${({ active }) => (active ? '#FFF' : "#6C5DD3")}
   } 
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-end;
  }
`

function NftNavTabs() {

  const location = useLocation()

  return (
    <NavWrap>
      <Button
        to={ROUTES.tokenHolderArea}
        variant={location.pathname === ROUTES.tokenHolderArea ? 'primary' : 'tertiary'}
        as={Link}
      >
        <IconWrapper active={location.pathname === ROUTES.tokenHolderArea} size={16}>
          <AlmTokenStatsIcon />
        </IconWrapper>
        ALM token stats
      </Button>
      <Button
        variant={location.pathname === ROUTES.collection ? 'primary' : 'tertiary'}
        to={ROUTES.collection}
        as={Link}
      >
        <IconWrapper active={location.pathname === ROUTES.collection} size={16}>
          <MyCollectionIcon />
          {/* <img src={MyCollectionIcon} alt="My collection" /> */}
        </IconWrapper>
        My collection
      </Button>
    </NavWrap>
  )
}

export default NftNavTabs