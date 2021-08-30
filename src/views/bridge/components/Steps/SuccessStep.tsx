import { CloseItem } from 'components/Modal/BridgeModal'
import { BridgeSuccessIcon } from 'images/bridge/BridgeSuccessIcon'
import React from 'react'
import { ChevronRight } from 'react-feather'
import { useStoreBridge } from 'store/bridge/useStoreBridge'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { getExplorerLink, getExplorerName } from 'utils'
import { formatBridgeTokenAmount } from 'utils/bridge/helpers'
import { useBridge } from 'views/bridge/hooks/useBridge'
import AddTokenBtn from '../AddTokenBtn'
import { View } from '../Loaders/TransferLoader'

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

const SuccessStep = () => {
  const { cancel } = useBridge()
  const toggleNetworks = useStoreBridge((state) => state.toggleNetworks)
  const fromNetwork = useStoreBridge((state) => state.fromNetwork)
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const token = useStoreBridge((state) => state.tokens.fromToken)
  const amount = useStoreBridge((state) => state.amounts.fromAmount)
  const formattedAmount = token ? formatBridgeTokenAmount(token, amount) : '0'

  const txHash = useStoreBridge((state) => state.txHash)
  // to -> but reverted
  const link = getExplorerLink(currentChainId, txHash, 'transaction')

  // Switching is required because we do not do it in step 2
  const needToggle = () => {
    if (currentChainId !== fromNetwork) {
      toggleNetworks()
    }
  }

  React.useEffect(() => {
    needToggle()
  }, [])

  const onDismiss = () => {
    cancel()
  }

  return (
    <Wrapper>
      <Header>
        <CloseItem onClick={onDismiss} />
      </Header>
      <Content>
        <BridgeSuccessIcon />
        <h2 className='title'>Transaction completed</h2>
        <p className='amount'>
          Amount:{' '}
          <b>
            {formattedAmount} {token?.symbol}
          </b>
        </p>
        {txHash && (
          <View>
            <a href={link} target='_blank'>
              View on {getExplorerName(currentChainId)}
              <ChevronRight />
            </a>
          </View>
        )}
        <AddTokenBtn />
      </Content>
    </Wrapper>
  )
}

export default SuccessStep
