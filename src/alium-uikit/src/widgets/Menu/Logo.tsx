import { NextLink } from 'components/NextLink'
import React from 'react'
import styled from 'styled-components'
import Flex from '../../components/Flex/Flex'
import { LogoIcon } from '../../components/Svg'
import { LogoIcon as LogoWithText } from './icons'

interface Props {
  isDark: boolean
  href: string
  isPushed?: boolean
}

const StyledLink = styled(NextLink)`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 144px;
    height: auto;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
`

const Logo: React.FC<Props> = ({ isDark, href, isPushed }) => {
  const isAbsoluteUrl = href.startsWith('http')
  const innerLogo = (
    <NextLink.multiple href={'/'}>
      <LogoIcon className="mobile-icon" />
      {!isPushed ? (
        <LogoWithText className="desktop-icon" isDark={isDark} />
      ) : (
        <LogoWithText className="desktop-icon" isDark={isDark} withText />
      )}
    </NextLink.multiple>
  )

  return (
    <Flex>
      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="Alium home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink href={href} aria-label="Alium home page">
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  )
}

export default Logo
