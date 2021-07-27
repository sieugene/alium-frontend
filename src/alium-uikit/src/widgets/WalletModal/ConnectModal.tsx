import React, { FC, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import Flex from '../../components/Flex/Flex'
import { Link } from '../../components/Link'
import { HelpIcon } from '../../components/Svg'
import Text from '../../components/Text/Text'
import { Modal } from '../Modal'
import { networksDev, networksProd, wallets } from './config'
import NetworkSelector from './NetworkSelector'
import { Login, NetworksConfig, WalletShowOn } from './types'
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
  /* > div:last-child {
    margin-right: 64px;
  }
  */
  flex-wrap: nowrap;
  @media screen and (max-width: 420px) {
    flex-wrap: wrap;
  }
`

const ConnectModal: FC<Props> = ({ login, onDismiss = () => null, title = 'Connect to a wallet' }) => {
  const setChainId = useStoreNetwork((state) => state.setChainId)
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const isDev = process.env.APP_ENV === 'development'
  const networks = isDev ? networksDev : networksProd

  const networkConfig = networks.find((x) => x.chainId === currentChainId) ?? { title: '???' }
  const [selectedNetwork, setSelectedNetwork] = useState(networkConfig.title)
  const [selectedWallet, setSelectedWallet] = useState('')

  const handleClose = () => {
    onDismiss()
  }

  const [walletsList, setWalletsList] = useState([])
  React.useEffect(() => {
    setWalletsList(wallets())
  }, [])

  return (
    <Modal title={title} onDismiss={handleClose}>
      <StyledFlexPoint alignItems='center' marginBottom='5px'>
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
            setSelectedNetwork={(wallet) => {
              setChainId(entry.chainId)
              setSelectedNetwork(wallet)
            }}
          />
        ))}
      </StyledFlex>
      <StyledFlexPoint alignItems='center' marginTop='30px' marginBottom='5px'>
        <StyledPoint>
          <p>2</p>
        </StyledPoint>
        <Text style={{ fontSize: '14px', color: '#0B1359', marginLeft: '16px' }}>Choose Wallet</Text>
      </StyledFlexPoint>
      <StyledWalletFlex>
        {walletsList.map((entry) => {
          const config = networkConfig as NetworksConfig
          const availableConnectors = config?.supportConnectors

          return (
            <WalletDisplay key={entry.title} showOn={entry.showOn}>
              <WalletCard
                login={login}
                selected={entry.title === selectedWallet}
                walletConfig={entry}
                onDismiss={onDismiss}
                setSelectedWallet={setSelectedWallet}
                selectedNetwork={selectedNetwork}
                availableConnectors={availableConnectors}
              />
            </WalletDisplay>
          )
        })}
      </StyledWalletFlex>
      <HelpLink href='https://aliumswap.medium.com/how-to-set-up-a-wallet-to-use-alium-finance-cca9fa7cb8b0' external>
        <HelpIcon color='primary' mr='6px' height='18px' width='18px' />
        <Text fontSize='10px' color='#6C5DD3' style={{ fontWeight: 500 }}>
          Learn how to connect
        </Text>
      </HelpLink>
    </Modal>
  )
}

const WalletDisplay = ({ children, showOn }: { showOn: WalletShowOn; children: React.ReactNode }) => {
  let component: React.ReactNode
  switch (showOn) {
    case WalletShowOn.mobile:
      component = isMobile && children
      break
    case WalletShowOn.desktop:
      component = !isMobile && children
      break
    case WalletShowOn.anywhere:
      component = children
      break
    default:
      component = children
  }
  return <> {component || null}</>
}

export default ConnectModal
