import dynamic from 'next/dynamic'
import React, { FC } from 'react'
import { useStoreAccount } from 'store/account/useStoreAccount'
import styled from 'styled-components'
import Flex from '../../components/Flex/Flex'
import { useWalletModal } from '../WalletModal'
import { Login } from '../WalletModal/types'
import { ConnectButton } from './ConnectButton'

const NetworkSwitch = dynamic(() => import('./NetworkSwitch'), { ssr: false })

interface Props {
  account?: string
  login: Login
  logout: () => void
  buttonTitle?: string
  balance?: string
  explorerName?: string
  explorerLink?: string
  onTransactionHistoryHandler?: any
  balanceHook?: any
}

const StyledConnectButton = styled.div`
  margin-right: -10px;

  @media screen and (max-width: 768px) {
    margin-right: 10px;
  }
`

const StyledAddIcon = styled.div`
  border: 1.5px solid #ffffff;
  display: flex;
  border-radius: 6px;
  margin-right: 17px;
  * {
    margin: auto;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`

const StyledButtonTitle = styled.div`
  font-size: 14px;
`

const UserBlock: FC<Props> = (props) => {
  const modalConnect = useStoreAccount((state) => state.modalConnect)
  const { account, login, logout, explorerName, explorerLink, onTransactionHistoryHandler } = props

  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
    login,
    logout,
    account,
    explorerName,
    explorerLink,
    onTransactionHistoryHandler,
  )
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null

  React.useEffect(() => {
    if (modalConnect) {
      onPresentConnectModal()
    }
  }, [modalConnect])

  return (
    <Flex alignItems='center'>
      <NetworkSwitch />
      <ConnectButton
        isAccount={!!account}
        accountEllipsis={accountEllipsis}
        onClick={() => (account ? onPresentAccountModal() : onPresentConnectModal())}
      />
    </Flex>
  )
}

export default UserBlock
