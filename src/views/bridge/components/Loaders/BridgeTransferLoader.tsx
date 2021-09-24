import { Token } from '@alium-official/sdk'
import TransferLoader from 'components/Modal/transaction/TransferLoader'
import { useWeb3Context } from 'hooks/bridge/useWeb3Context'
import { FC } from 'react'
import { ChevronRight } from 'react-feather'
import Loader from 'react-loader-spinner'
import { useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { getExplorerLink, getExplorerName } from 'utils'

const StyledLoader = styled(Loader)`
  width: 80px;
  height: 80px;
`

export const View = styled.div`
  cursor: pointer;
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  letter-spacing: 1px;

  color: #6c5dd3;
  svg {
    stroke: #6c5dd3;
    width: 18px;
    height: 16px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`

interface Props {
  token: Token
  amount: string
}
const BridgeTransferLoader: FC<Props> = ({ token, amount }) => {
  const loadingText = useStoreBridge((state) => state.transactionText)
  const txHash = useStoreBridge((state) => state.txHash)
  const { providerChainId } = useWeb3Context()

  const link = getExplorerLink(providerChainId, txHash, 'transaction')
  return (
    <TransferLoader>
      <h2>
        Transfer {amount} {token?.symbol} pending...
      </h2>
      <p>{loadingText || 'Transaction is pending...'}</p>
      {txHash && (
        <View>
          <a href={link} target='_blank'>
            View on {getExplorerName(providerChainId)} <ChevronRight />
          </a>
        </View>
      )}
    </TransferLoader>
  )
}

export default BridgeTransferLoader
