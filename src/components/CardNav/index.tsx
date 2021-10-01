import { ButtonMenu, ButtonMenuItem, Flex, Heading } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { ROUTES } from 'routes'
import styled from 'styled-components'

interface props {
  activeIndex?: number
}

export const CardNav: FC<props> = ({ activeIndex = 0 }) => {
  const { t } = useTranslation()
  const routes = [
    { href: ROUTES.exchange, title: t('menu.swap') },
    { href: ROUTES.pool, title: t('menu.liquidity') },
    { href: ROUTES.migrate, title: t('menu.migrate') },
  ]

  return (
    <Flex alignItems='center' p='12px'>
      <StyledNav>
        <Heading as='h1' size='xl' color='heading' mb='40px' mt='20px'>
          {t('menu.trade')}
        </Heading>
        <ButtonMenuStyled size='md' variant='primary' activeIndex={activeIndex}>
          {routes.map(({ href, title }) => (
            <ButtonMenuItem href={href} key={href} as='a'>
              {title}
            </ButtonMenuItem>
          ))}
        </ButtonMenuStyled>
      </StyledNav>
    </Flex>
  )
}

// styles

const ButtonMenuStyled = styled(ButtonMenu)`
  & a {
    width: 140px;
    text-align: center;
    @media screen and (max-width: 480px) {
      width: 106px;
    }
  }
`

const StyledNav = styled.div`
  margin-bottom: 32px;

  & > h1 {
    margin-bottom: 16px;
    margin-top: 0;
    font-size: 48px;
  }

  & > div {
    padding: 8px;
  }

  @media screen and (max-width: 768px) {
    & > h1 {
      font-size: 32px;
      margin-top: 0;
    }
  }

  @media screen and (max-width: 376px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;

    & > h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    & > div {
      align-self: center;
    }
  }
`
