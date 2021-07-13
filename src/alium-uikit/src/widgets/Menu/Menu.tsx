import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex } from '../../components/Flex'
import Overlay from '../../components/Overlay/Overlay'
import { BurgerIcon, CloseIcon } from '../../components/Svg'
// import BetaIcon from '../../components/Svg/Icons/Beta'
import Logo from '../../components/Svg/Icons/Logo'
import { Text } from '../../components/Text'
import { useMatchBreakpoints } from '../../hooks'
import { MENU_HEIGHT, SIDEBAR_WIDTH_FULL, SIDEBAR_WIDTH_REDUCED } from './config'
import { LogoIcon as LogoWithText } from './icons'
import { MenuButton2 } from './MenuButton2'
import Panel from './Panel'
import { NavProps } from './types'
import UserBlock from './UserBlock'
import ViewAlmPrice from './ViewAlmPrice'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  width: 240px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
  background-color: #f4f5fa;
`

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`

const Inner = styled.div<{ ispushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${MENU_HEIGHT}px;
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ ispushed }) => `${ispushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ ispushed }) => `calc(100% - ${ispushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
  }
`

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;
  display: none;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`

const StyledLogoWithText = styled.div`
  opacity: 1;
  ${({ theme }) => theme.mediaQueries.nav} {
    opacity: 0;
  }
  @media screen and (max-width: 575px) {
    display: none;
  }
`

const StyledLogoWithoutText = styled.div`
  opacity: 1;
  ${({ theme }) => theme.mediaQueries.nav} {
    opacity: 0;
  }
  display: none;
  @media screen and (max-width: 575px) {
    display: block;
  }
`

const StyledBetaIcon = styled.div<{ ispushed?: boolean }>`
  display: flex;
  align-items: center;
  margin-left: -20px;
  ${({ ispushed }) => ispushed && 'margin-left: 152px;'}

  svg {
    margin-right: 10px;
  }

  @media screen and (max-width: 968px) {
    position: relative;
    margin-left: 8px;
    > div {
      display: none;
    }
    :hover {
      > div {
        display: block;
      }
    }
  }
  @media screen and (max-width: 575px) {
    margin-left: 20px;
  }
`

const StyledText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  @media screen and (max-width: 968px) {
    position: absolute;
    width: 142px;
    background: #ffffff;
    box-shadow: 0 2px 16px rgba(185, 189, 208, 0.48);
    border-radius: 6px;
    font-size: 11px;
    text-align: center;
    top: 40px;
    left: -50px;
    padding: 14px;
    :before {
      content: '\\A';
      border-style: solid;
      border-width: 15px 15px 15px 0;
      border-color: transparent white transparent transparent;
      position: absolute;
      top: -15px;
      left: 65px;
      transform: rotate(90deg);
    }
  }
`

const StyledClickableLink = styled.a`
  color: #6c5dd3;
  cursor: pointer;

  :hover {
    color: #8677f0;
  }
`

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  @media screen and (min-width: 968px) {
    justify-content: space-between;
  }
`

const Menu: FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  links,
  loginBlockVisible = true,
  buttonTitle = 'Connect',
  options,
  children,
  balance,
  explorerName,
  explorerLink,
  onTransactionHistoryHandler,
  betaText = "This is the Beta version. You can't add liquidity here anymore. Press here to switch to the main version.",
  betaLink,
  balanceHook,
}) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  const [ispushed, setIsPushed] = useState(!isMobile)
  const [showMenu, setShowMenu] = useState(true)

  useEffect(() => {
    let scrollPrev = 0

    const handleHeaderToggleOnScroll = () => {
      const scrolled = window.scrollY

      if (scrolled > 128 && scrolled >= scrollPrev - 64) {
        setShowMenu(false)
        setIsPushed(false)
      } else {
        setShowMenu(true)
      }
      scrollPrev = scrolled
    }

    document.addEventListener('scroll', handleHeaderToggleOnScroll)

    return () => {
      document.removeEventListener('scroll', handleHeaderToggleOnScroll)
    }
  }, [])

  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <Flex>
          <StyledLogoWithText>
            <LogoWithText className='desktop-icon' isDark={isDark} withText />
          </StyledLogoWithText>
          <StyledLogoWithoutText>
            <Logo width='40px' height='40px' />
          </StyledLogoWithoutText>
          {false && betaText && (
            <StyledBetaIcon ispushed={ispushed}>
              {/* <BetaIcon height="28px" width="43px" /> */}
              <StyledText color='#8990A5'>
                {betaText.slice(0, betaText?.lastIndexOf('here'))}
                <StyledClickableLink href={betaLink}>here</StyledClickableLink>
                {betaText.slice(betaText?.lastIndexOf('here') + 4)}
              </StyledText>
            </StyledBetaIcon>
          )}
        </Flex>
        <TopWrapper>
          <ViewAlmPrice ispushed={ispushed} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {loginBlockVisible && (
              <UserBlock
                account={account}
                login={login}
                logout={logout}
                buttonTitle={buttonTitle}
                balance={balance}
                explorerName={explorerName}
                explorerLink={explorerLink}
                onTransactionHistoryHandler={onTransactionHistoryHandler}
                balanceHook={balanceHook}
                {...options}
              />
            )}
            <MenuButton2 aria-label='Toggle menu' onClick={() => setIsPushed((prevState: boolean) => !prevState)}>
              {ispushed ? <CloseIcon color='primary' width='24' height='25' /> : <BurgerIcon width='24' height='24' />}
            </MenuButton2>
          </div>
        </TopWrapper>
      </StyledNav>
      <BodyWrapper>
        <Panel
          ispushed={ispushed}
          isMobile={isMobile}
          showMenu={showMenu}
          isDark={isDark}
          toggleTheme={toggleTheme}
          pushNav={setIsPushed}
          links={links}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
        />
        <Inner ispushed={ispushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={ispushed} onClick={() => setIsPushed(false)} role='presentation' />
      </BodyWrapper>
    </Wrapper>
  )
}

export default Menu
