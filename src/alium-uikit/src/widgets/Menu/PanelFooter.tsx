import { SocialNetworks } from 'alium-uikit/src/components/SocialNetworks'
import { FC } from 'react'
import { PanelProps, PushedProps } from './types'

interface Props extends PanelProps, PushedProps {}

const PanelFooter: FC<Props> = ({ ispushed }) => <SocialNetworks ispushed={ispushed} inPanel />

export default PanelFooter
