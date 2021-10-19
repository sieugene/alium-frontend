import { Button, Flex } from 'alium-uikit/src'
import { NextLink } from 'components/NextLink'
import { AlmTokenStatsIcon } from 'images/account/AlmTokenStatsIcon'
import { MyCollectionIcon } from 'images/account/MyCollectionIcon'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ROUTES } from 'routes'
import styled from 'styled-components'

function NftNavTabs() {
  const { t } = useTranslation()
  const location = useRouter()

  return (
    <NavWrap>
      <NextLink href={ROUTES.tokenHolderArea}>
        <NftButton fullwidth variant={location.pathname === ROUTES.tokenHolderArea ? 'primary' : 'tertiary'}>
          <IconWrapper active={location.pathname === ROUTES.tokenHolderArea} size={16}>
            <AlmTokenStatsIcon />
          </IconWrapper>
          {t('ALM token stats')}
        </NftButton>
      </NextLink>
      <NextLink href={ROUTES.collection}>
        <NftButton fullwidth variant={location.pathname === ROUTES.collection ? 'primary' : 'tertiary'}>
          <IconWrapper active={location.pathname === ROUTES.collection} size={16}>
            <MyCollectionIcon />
          </IconWrapper>
          {t('My collection')}
        </NftButton>
      </NextLink>
    </NavWrap>
  )
}

export default NftNavTabs

// styles

const NavWrap = styled(Flex)`
  padding: 8px 16px;
  border: 1px solid #d2d6e5;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 56px;
  width: fit-content;

  a:first-child {
    margin-right: 8px;
  }

  @media (max-width: 568px) {
    width: 100%;
    padding: 8px;
    flex-wrap: nowrap;

    & > a {
      display: block;

      &:first-child {
        width: 175px;
      }

      &:last-child {
        width: 155px;
      }
    }

    button {
      margin: 0;
      width: 100%;

      &:first-child {
        margin-right: 0;
      }
    }
  }
`

const NftButton = styled(Button)`
  @media (max-width: 568px) {
    padding: 0 16px;
  }
`

const IconWrapper = styled.div<{ size?: number; active: boolean }>`
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
    path {
      stroke: ${({ active }) => (active ? '#FFF' : '#6C5DD3')};
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-end;
  }
`
