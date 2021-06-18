import { Button, Flex } from '@alium-official/uikit'
import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as AlmTokenStatsIcon } from '../../../../assets/images/nav-stats.svg'
import { ReactComponent as MyCollectionIcon } from '../../../../assets/images/nav-collection.svg'

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
      <Button to='/' variant={location.pathname === '/' ? 'primary' : 'tertiary'} as={Link}>
        <IconWrapper active={location.pathname === '/'} size={16}>
          <AlmTokenStatsIcon />
        </IconWrapper>
        ALM token stats
      </Button>
      <Button variant={location.pathname === '/collection' ? 'primary' : 'tertiary'} to='/collection' as={Link}>
        <IconWrapper active={location.pathname === '/collection'} size={16}>
          <MyCollectionIcon />
          {/* <img src={MyCollectionIcon} alt="My collection" /> */}
        </IconWrapper>
        My collection
      </Button>
    </NavWrap>
  )
}

export default NftNavTabs