import { useTranslation } from 'next-i18next'
import React from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { ConnectorNames } from '../../util/connectorId/setConnectorId'
import { useModal } from '../Modal'
import AccountModal from './AccountModal'
import ConnectModal from './ConnectModal'
import { Login } from './types'

interface ReturnType {
  onPresentConnectModal: () => void
  onPresentAccountModal: () => void
  chainId?: number | null
}

const useWalletModal = (
  login: Login,
  logout: () => void,
  account?: string,
  explorerName?: string,
  explorerLink?: string,
  onTransactionHistoryHandler?: () => void,
): ReturnType => {
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const { t } = useTranslation()
  const loginWithUpdateNetwork = async (connectorId: ConnectorNames): Promise<void> => {
    try {
      await login(connectorId)
    } catch (e) {
      console.error(e)
    }
  }

  const chainIdData: { [i: number]: { tokenSymbol: string; networkName: string } } = {
    1: {
      tokenSymbol: t('walletModal.1.tokenSymbol'),
      networkName: t('walletModal.1.networkName'),
    },
    4: {
      tokenSymbol: t('walletModal.4.tokenSymbol'),
      networkName: t('walletModal.4.networkName'),
    },
    56: {
      tokenSymbol: t('walletModal.56.tokenSymbol'),
      networkName: t('walletModal.56.networkName'),
    },
    97: {
      tokenSymbol: t('walletModal.97.tokenSymbol'),
      networkName: t('walletModal.97.networkName'),
    },
    128: {
      tokenSymbol: t('walletModal.128.tokenSymbol'),
      networkName: t('walletModal.128.networkName'),
    },
    137: {
      tokenSymbol: t('walletModal.137.tokenSymbol'),
      networkName: t('walletModal.137.networkName'),
    },
    256: {
      tokenSymbol: t('walletModal.256.tokenSymbol'),
      networkName: t('walletModal.256.networkName'),
    },
    80001: {
      tokenSymbol: t('walletModal.80001.tokenSymbol'),
      networkName: t('walletModal.80001.networkName'),
    },
  }

  const [onPresentConnectModal] = useModal(<ConnectModal login={loginWithUpdateNetwork} />)
  const [onPresentAccountModal] = useModal(
    <AccountModal
      account={account || ''}
      logout={logout}
      explorerName={explorerName}
      explorerLink={explorerLink}
      tokenSymbol={chainIdData[currentChainId]?.tokenSymbol ?? t('walletModal.undefinedToken')}
      networkName={chainIdData[currentChainId]?.networkName ?? t('walletModal.undefinedChain', { currentChainId })}
      onTransactionHistoryHandler={onTransactionHistoryHandler}
    />,
  )

  return { onPresentConnectModal, onPresentAccountModal, chainId: currentChainId }
}

export default useWalletModal
