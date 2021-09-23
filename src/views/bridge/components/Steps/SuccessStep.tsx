import TransactionCompleted from 'components/Modal/TransactionCompleted'
import React from 'react'
import { useStoreBridge } from 'store/bridge/useStoreBridge'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { formatBridgeTokenAmount } from 'utils/bridge/helpers'
import { useBridge } from 'views/bridge/hooks/useBridge'

const Wrapper = styled.div`
  width: 500px;
  min-height: 363px;
  padding: 8px;

  @media screen and (max-width: 768px) {
    max-width: 354px;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Content = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0b1359;
  .title {
    margin-top: 24px;
  }
  b {
    color: #1ea86d;
  }
  .amount {
    margin-top: 4px;
  }
`
// TODO , checkout logic when bridge work
const SuccessStep = () => {
  const { cancel } = useBridge()
  const toggleNetworks = useStoreBridge((state) => state.toggleNetworks)
  const fromNetwork = useStoreBridge((state) => state.fromNetwork)
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  // current token
  const fromToken = useStoreBridge((state) => state.tokens.fromToken)
  const toToken = useStoreBridge((state) => state.tokens.toToken)
  const token = fromToken?.chainId === currentChainId ? fromToken : toToken
  const amount = useStoreBridge((state) => state.amounts.fromAmount)
  const formattedAmount = token ? formatBridgeTokenAmount(token, amount) : '0'

  const txHash = useStoreBridge((state) => state.txHash)

  // Switching is required because we do not do it in step 2
  const needToggle = () => {
    if (currentChainId !== fromNetwork) {
      toggleNetworks()
    }
  }

  React.useEffect(() => {
    needToggle()
  }, [])

  return <TransactionCompleted cancel={cancel} token={token} txHash={txHash} amount={formattedAmount} />
}

export default SuccessStep
