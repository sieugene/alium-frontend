import { FC } from 'react'
import styled from 'styled-components'
import Link from '../../components/Link/Link'
import { SvgProps } from '../../components/Svg'
import { socials } from './config'
import * as IconModule from './icons'
import { PanelProps, PushedProps } from './types'

interface Props extends PanelProps, PushedProps {}

const Icons = IconModule as unknown as { [key: string]: FC<SvgProps> }

const Container = styled.div<{ ispushed?: boolean }>`
  flex: none;
  padding: 0px 16px 0px 16px;

  @media screen and (max-width: 967px) {
    position: absolute;
    bottom: 90px;
    left: ${({ ispushed }) => (!ispushed ? '100px' : '20px')};
    width: 70%;
  }
`

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 28px;
  /* flex-wrap: wrap; */
  @media screen and (max-width: 967px) {
    padding: 0;
  }
`

const StyledExternalLink = styled(Link)`
  margin-bottom: 17px;
  svg * {
    transition: fill 100ms ease-in-out;
  }
  :hover {
    svg * {
      stroke: none !important;
      fill: #6c5dd3;
    }
  }
`
const StyledSocial = styled.div<{ ispushed?: boolean }>`
  display: flex;
  flex-wrap: ${(props) => (props.ispushed ? 'inherit' : 'wrap')};
  a {
    margin-left: 11px;
    &:last-child {
      margin-right: 16px;
    }
  }
`
const PanelFooter: FC<Props> = ({ ispushed }) => {
  return (
    <Container ispushed={ispushed}>
      <SocialEntry>
        <StyledSocial ispushed={ispushed}>
          {socials.map((social, index) => {
            const Icon = Icons[social.icon]
            const iconProps = { width: '16px', color: 'textSubtle', style: { cursor: 'pointer' } }
            const mr = index < socials.length - 1 ? '24px' : 0
            return (
              <StyledExternalLink external key={social.label} href={social.href} aria-label={social.label}>
                {Icon && <Icon {...iconProps} />}
              </StyledExternalLink>
            )
          })}
        </StyledSocial>
      </SocialEntry>
    </Container>
  )
}

export default PanelFooter
