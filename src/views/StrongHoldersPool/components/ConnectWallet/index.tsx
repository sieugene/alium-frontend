import { Button, useWalletModal } from 'alium-uikit/src'
import useAuth from 'hooks/useAuth'
import styled from 'styled-components'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import Card from '../Card'
import { ReactComponent as PlusIcon } from './plus.svg'
import { ReactComponent as WalletIcon } from './wallet.svg'

export default function ConnectWallet() {
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  return (
    <ConnectWallet.Root>
      <WalletIcon />
      <ConnectWallet.Text>Please connect to your wallet first</ConnectWallet.Text>
      <ConnectWallet.Button onClick={onPresentConnectModal}>
        <PlusIcon />
        Connect Wallet
      </ConnectWallet.Button>
    </ConnectWallet.Root>
  )
}

ConnectWallet.Button = styled(Button)`
  letter-spacing: 1px;
  & > svg {
    margin-right: 16px;
  }
`

ConnectWallet.Text = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0b1359;
  margin: 16px 0 24px;
`

ConnectWallet.Root = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 438px;

  @media ${down(breakpoints.sm)} {
    min-height: 320px;

    ${ConnectWallet.Text} {
      font-size: 18px;
      line-height: 24px;
    }
  }
`
