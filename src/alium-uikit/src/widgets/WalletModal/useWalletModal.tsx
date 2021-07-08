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
  title?: string,
  logoutTitle?: string,
  balance?: string,
  explorerName?: string,
  explorerLink?: string,
  onTransactionHistoryHandler?: () => void,
  balanceHook?: () => void,
): ReturnType => {
  const currentChainId = useStoreNetwork((state) => state.currentChainId)

  const loginWithUpdateNetwork = async (connectorId: ConnectorNames): Promise<void> => {
    try {
      await login(connectorId)
    } catch (e) {
      console.error(e)
    }
  }

  const chainIdData: { [i: number]: { tokenSymbol: string; networkName: string } } = {
    1: {
      tokenSymbol: 'ETH',
      networkName: 'Ethereum Chain',
    },
    4: {
      tokenSymbol: 'ETH',
      networkName: 'Ethereum Chain Testnet Ropsten',
    },
    56: {
      tokenSymbol: 'BNB',
      networkName: 'Binance Smart Chain',
    },
    97: {
      tokenSymbol: 'BNB',
      networkName: 'Binance Smart Chain Testnet',
    },
    128: {
      tokenSymbol: 'HT',
      networkName: 'Huobi ECO Chain',
    },
    137: {
      tokenSymbol: 'MATIC',
      networkName: 'Polygon Matic Chain',
    },
    256: {
      tokenSymbol: 'HT',
      networkName: 'Huobi ECO Chain Testnet',
    },
    80001: {
      tokenSymbol: 'MATIC',
      networkName: 'Polygon Matic Chain Testnet',
    },
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
      tokenSymbol={chainIdData[currentChainId]?.tokenSymbol ?? 'Undefined Token'}
      networkName={chainIdData[currentChainId]?.networkName ?? `Undefined Chain (ID: ${currentChainId})`}
      onTransactionHistoryHandler={onTransactionHistoryHandler}
      balanceHook={balanceHook}
    />,
  )
  // useEffect(()=>{
  //   onPresentAccountModal()
  // }, [balance])
  return { onPresentConnectModal, onPresentAccountModal, chainId: currentChainId }
}

export default useWalletModal
