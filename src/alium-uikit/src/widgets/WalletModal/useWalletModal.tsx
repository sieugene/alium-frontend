import React from 'react'
import { useModal } from '../Modal'
import ConnectModal from './ConnectModal'
import AccountModal from './AccountModal'
import { Login } from './types'
import { getChainId } from '../../util'
import { ConnectorNames } from '../../util/connectorId/setConnectorId'

interface ReturnType {
  onPresentConnectModal: () => void
  onPresentAccountModal: () => void
  chainId?: number | null
}

const useWalletModal = (
  login: Login,
  logout: () => void,
  account?: string,
  title?: string,
  logoutTitle?: string,
  balance?: string,
  explorerName?: string,
  explorerLink?: string,
  onTransactionHistoryHandler?: void,
  balanceHook?: void
): ReturnType => {
  const [id, setId] = React.useState(getChainId())

  const loginWithUpdateNetwork = async (connectorId: ConnectorNames): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        await login(connectorId)
        setTimeout(() => {
          setId(getChainId())
        }, 0)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  const [onPresentConnectModal] = useModal(<ConnectModal login={loginWithUpdateNetwork} title={title} />)
  const [onPresentAccountModal] = useModal(
    <AccountModal
      account={account || ''}
      logout={logout}
      title={title}
      logoutTitle={logoutTitle}
      balance={balance}
      explorerName={explorerName}
      explorerLink={explorerLink}
      tokenSymbol={id === 56 || id === 97 ? 'BNB' : 'HT'}
      networkName={id === 56 || id === 97 ? 'Binance Smart Chain' : 'Huobi ECO Chain'}
      onTransactionHistoryHandler={onTransactionHistoryHandler}
      balanceHook={balanceHook}
    />
  )
  // useEffect(()=>{
  //   onPresentAccountModal()
  // }, [balance])
  return { onPresentConnectModal, onPresentAccountModal, chainId: id }
}

export default useWalletModal
