import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import Flex from '../../components/Flex/Flex'
import { Link } from '../../components/Link'
import { HelpIcon } from '../../components/Svg'
import Text from '../../components/Text/Text'
import getChainId from '../../util/chainId/getChainId'
import { Modal } from '../Modal'
import { networks, wallets } from './config'
import NetworkSelector from './NetworkSelector'
import { Login } from './types'
import WalletCard from './WalletCard'

interface Props {
  login: Login
  onDismiss?: () => void
  title?: string
}

const HelpLink = styled(Link)`
  display: flex;
  align-self: flex-start;
  align-items: center;
  margin-top: 24px;
`

const StyledPoint = styled.div`
  width: 32px;
  height: 32px;
  background: #f5f7ff;
  border-radius: 6px;
  display: flex;

  > * {
    color: #8990a5;
    font-size: 11px;
    margin: auto;
  }

  @media screen and (max-width: 800px) {
    display: none;
  }
`

const StyledFlex = styled(Flex)`
  margin-left: 60px;
  flex-wrap: wrap;
  > * {
    width: 72px;
  }
  > *:not(:last-child) {
    margin-right: 16px;
  }
  @media screen and (max-width: 800px) {
    margin-left: 18px;
  }
`

const StyledFlexPoint = styled(Flex)`
  @media screen and (max-width: 800px) {
    > div {
      margin-left: 0 !important;
    }
  }
`

const StyledWalletFlex = styled(StyledFlex)`
  > div:last-child {
    margin-right: 64px;
  }
`

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null, title = 'Connect to a wallet' }) => {
  const id = getChainId()

  const [selectedNetwork, setSelectedNetwork] = useState(
    id === 256 || id === 128 ? networks[1].title : networks[0].title,
  )
  const [selectedWallet, setSelectedWallet] = useState('')

  const handleClose = () => {
    onDismiss()
  }

  return (
    <Modal title={title} onDismiss={handleClose}>
      <StyledFlexPoint alignItems="center" marginBottom="5px">
        <StyledPoint>
          <p>1</p>
        </StyledPoint>
        <Text style={{ fontSize: '14px', color: '#0B1359', marginLeft: '16px' }}>Choose Network</Text>
      </StyledFlexPoint>
      <StyledFlex>
        {networks.map((entry) => (
          <NetworkSelector
            key={entry.title}
            chainId={entry.chainId}
            selected={entry.title === selectedNetwork}
            networkConfig={entry}
            setSelectedNetwork={setSelectedNetwork}
          />
        ))}
      </StyledFlex>
      <StyledFlexPoint alignItems="center" marginTop="30px" marginBottom="5px">
        <StyledPoint>
          <p>2</p>
        </StyledPoint>
        <Text style={{ fontSize: '14px', color: '#0B1359', marginLeft: '16px' }}>Choose Wallet</Text>
      </StyledFlexPoint>
      <StyledWalletFlex>
        {wallets.map((entry) => {
          return entry.mobile ? (
            isMobile && (
              <WalletCard
                key={entry.title}
                login={login}
                selected={entry.title === selectedWallet}
                walletConfig={entry}
                onDismiss={onDismiss}
                setSelectedWallet={setSelectedWallet}
                selectedNetwork={selectedNetwork}
              />
            )
          ) : (
            <WalletCard
              key={entry.title}
              login={login}
              selected={entry.title === selectedWallet}
              walletConfig={entry}
              onDismiss={onDismiss}
              setSelectedWallet={setSelectedWallet}
              selectedNetwork={selectedNetwork}
            />
          )
        })}
      </StyledWalletFlex>
      <HelpLink href="https://aliumswap.medium.com/how-to-set-up-a-wallet-to-use-alium-finance-cca9fa7cb8b0" external>
        <HelpIcon color="primary" mr="6px" height="18px" width="18px" />
        <Text fontSize="10px" color="#6C5DD3" style={{ fontWeight: 500 }}>
          Learn how to connect
        </Text>
      </HelpLink>
    </Modal>
  )
}

export default ConnectModal
