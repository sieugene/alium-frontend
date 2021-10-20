import ViewAlmPrice from 'alium-uikit/src/widgets/Menu/ViewAlmPrice'
import { NextLink } from 'components/NextLink'
import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, down, up } from 'views/StrongHoldersPool/mq'
import { SvgProps } from '../../components/Svg'
import Accordion from './Accordion'
import * as IconModule from './icons'
import { HamburgerCloseIcon } from './icons'
import Logo from './Logo'
import MenuButton from './MenuButton'
import { LinkLabel, MenuEntry } from './MenuEntry'
import { MenuNewItem } from './MenuNewItem'
import { MenuEntry as MenuEntryType, MenuSubEntry, PanelProps, PushedProps } from './types'

interface Props extends PanelProps, PushedProps {
  isMobile?: boolean
  togglePush?: () => void
}

const Icons = IconModule as unknown as { [key: string]: FC<SvgProps> }

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.nav.background};
  }
`

interface StyledIconProps {
  reverse?: boolean
}

const StyledIcon = styled.div`
  height: 24px;
  width: 24px;
  background: linear-gradient(0deg, #ffffff, #ffffff);
  box-shadow: 0 6px 8px rgba(220, 224, 244, 0.56);
  border-radius: 40px;
  display: flex;
  position: absolute;
  right: -12px;
  top: 36px;
  transition: background-color 200ms ease-in-out;
  border-right: 2px solid rgba(133, 133, 133, 0.1);

  &:hover {
    background: linear-gradient(0deg, #f0f0f0, #f0f0f0);
  }

  & > * {
    margin: auto;
    transition: transform 200ms ease-in-out;
    transform: ${(props: StyledIconProps) => (props.reverse ? 'rotate(180deg)' : '')};
  }
`

const StyledLinksPanel = styled.div`
  padding: 18px;

  @media ${up(breakpoints.md)} {
    padding-top: 33px;
    padding-left: 17px;
    padding-right: 17px;
  }

  @media screen and (max-width: 967px) {
    & > div:not(:last-child) {
      border-bottom: 1px solid #f4f5fa;
    }

    & > div > a {
      font-weight: 500;
    }

    & > div > div:first-child {
      font-weight: 500;
    }

    & > div > div:not(:first-child) > div > a {
      /* color: #8990a5 !important; */
      font-weight: 500;
    }
  }
`

const StyledLogoIcon = styled.div`
  display: none;

  @media ${up(breakpoints.md)} {
    display: block;
  }
`

const StyledLink = styled(NextLink.Multiple)<{ ispushed: boolean; isnew: boolean }>`
  flex-direction: ${(props) => (props.ispushed || !props.isnew ? 'inherit' : 'column')};

  div,
  span {
    margin-left: ${(props) => (props.ispushed || !props.isnew ? '8px' : '0px')} !important;
    margin-top: ${(props) => (props.ispushed || !props.isnew ? '0px' : '3px')} !important;
    transition: 0.3s all ease;
  }

  svg {
    margin-right: ${(props) => (props.ispushed || !props.isnew ? '8px' : '0px')} !important;
  }

  &:hover {
    div {
      &:last-child {
        opacity: ${(props) => (!props.isnew ? '1' : '0.7')} !important;
      }
    }
  }
`

const LinkLabelStyled = styled(LinkLabel)<{ ispushed: boolean }>`
  flex-grow: inherit !important;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  align-items: center;
  letter-spacing: 0.1px;
  display: ${(props) => (props.ispushed ? 'flex' : 'none')};
  color: #0b1359;
`

const PanelBody: FC<Props> = ({ ispushed, pushNav, links, togglePush, isDark }) => {
  const location = useRouter()
  const isMobile = useMedia(down(breakpoints.sm))

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined
  const homeLink = links.find((link) => link.label === 'Home')

  const isActive = (item: MenuSubEntry) => {
    return item.href === location.pathname || location.pathname.includes(`${item.href}/`)
  }

  const isAssociated = (entry: MenuEntryType) => {
    const isHome = location.pathname === '/'
    return (
      !isHome &&
      entry?.triggers?.length &&
      Boolean(
        entry?.triggers.find((trigger) => location.pathname.includes(trigger) || trigger.includes(location.pathname)),
      )
    )
  }

  return (
    <Container>
      <ViewAlmPrice inPanel />
      <StyledLogoIcon>
        <Logo isDark={isDark} href={homeLink?.href ?? '/'} ispushed={ispushed} />
      </StyledLogoIcon>
      <MenuButton aria-label='Toggle menu' onClick={togglePush}>
        {ispushed ? (
          <StyledIcon>
            <HamburgerCloseIcon width='6px' />
          </StyledIcon>
        ) : (
          <StyledIcon reverse>
            <HamburgerCloseIcon width='6px' />
          </StyledIcon>
        )}
      </MenuButton>
      <StyledLinksPanel>
        {links.map((entry) => {
          const Icon = Icons[entry.icon]
          const iconElement = <Icon width='24px' mr='8px' />
          const calloutClass = entry.calloutClass ? entry.calloutClass : undefined

          if (entry.items) {
            const linkTriggered = isAssociated(entry)
            const itemsMatchIndex = entry.items.findIndex(isActive)
            const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0

            return (
              <Accordion
                key={entry.label}
                ispushed={ispushed}
                pushNav={pushNav}
                icon={iconElement}
                label={entry.label}
                initialOpenState={initialOpenState}
                className={calloutClass}
                active={linkTriggered}
              >
                {ispushed &&
                  entry.items.map((item) => (
                    <MenuEntry key={item.href} secondary isActive={isActive(item)} onClick={handleClick}>
                      <NextLink href={item.href}>{item.label}</NextLink>
                    </MenuEntry>
                  ))}
              </Accordion>
            )
          }
          return (
            <Fragment key={entry.label}>
              <MenuEntry isActive={isActive(entry)} className={calloutClass}>
                <StyledLink href={entry.href} handleClick={handleClick} ispushed={ispushed} isnew={entry?.new}>
                  {iconElement}
                  <LinkLabelStyled ispushed={ispushed}>{entry.label}</LinkLabelStyled>
                  {entry?.new && (
                    <span>
                      <MenuNewItem />
                    </span>
                  )}
                </StyledLink>
              </MenuEntry>
            </Fragment>
          )
        })}
      </StyledLinksPanel>
    </Container>
  )
}

export default PanelBody
