import { FC } from 'react'
import styled from 'styled-components'
import { SIDEBAR_WIDTH_FULL, SIDEBAR_WIDTH_REDUCED } from './config'
import PanelBody from './PanelBody'
import PanelFooter from './PanelFooter'
import { PanelProps, PushedProps } from './types'

interface Props extends PanelProps, PushedProps {
  showMenu: boolean
  isMobile: boolean
  togglePush?: () => void
}

const StyledPanel = styled.div<{ ispushed: boolean; showMenu: boolean }>`
  position: fixed;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.nav.background};
  height: 100vh;
  transition: padding-top 0.2s, width 0.2s;
  border-right: ${({ ispushed }) => (ispushed ? '2px solid rgba(133, 133, 133, 0.1)' : 0)};
  z-index: 11;
  overflow: ${({ ispushed }) => (ispushed ? 'initial' : 'initial')};
  transform: translate3d(0, 0, 0);
  z-index: 20;
  top: 97px;
  right: 0;
  width: ${({ ispushed }) => (ispushed ? `315px` : 0)};

  ${({ theme }) => theme.mediaQueries.nav} {
    border-right: 2px solid rgba(133, 133, 133, 0.1);
    width: ${({ ispushed }) => `${ispushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    top: 0;
    left: 0;
    padding-top: 28px;
  }
  @media screen and (max-width: 480px) {
    width: ${({ ispushed }) => `${ispushed ? '100vw' : '0px'}`};
  }
`

const Panel: FC<Props> = (props) => {
  const { ispushed, showMenu } = props
  return (
    <StyledPanel ispushed={ispushed} showMenu={showMenu}>
      <PanelBody {...props} />
      <PanelFooter {...props} />
    </StyledPanel>
  )
}

export default Panel
