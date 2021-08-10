import { useBridgeContext } from 'contexts/BridgeContext'
import { useTransactionStatus } from 'hooks/bridge/useTransactionStatus'
import { BridgeConfirmIcon } from 'images/bridge/BridgeConfirmIcon'
import React, { useState } from 'react'
import { BRIDGE_STEPS, storeBridge, useStoreBridge } from 'store/bridge/useStoreBridge'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { formatValue } from 'utils/bridge/helpers'
import { useBridgeNetworks } from 'views/bridge/hooks/useBridgeNetworks'
import TransferError from '../Errors/TransferError'
import TransferLoader from '../Loaders/TransferLoader'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  margin-top: 40px;
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-top: 24px;
  }
  p {
    margin-top: 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
`

const TransferStep = () => {
  useTransactionStatus()

  const [loading, setLoading] = useState(false)
  const [transferError, setTransferError] = useState(false)
  const token = useStoreBridge((state) => state.tokens.fromToken)
  const amount = useStoreBridge((state) => state.amounts.fromAmount)
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const setChainId = useStoreNetwork((state) => state.setChainId)
  const connected = useStoreNetwork((state) => state.connected)
  const { networkFrom } = useBridgeNetworks()

  const { transfer, loading: loadingTransaction } = useBridgeContext()

  const wrongCurrentNetwork = React.useMemo(
    () => networkFrom?.chainId !== currentChainId,
    [currentChainId, networkFrom],
  )

  const changeStep = storeBridge.getState().changeStep
  const updateStepStatus = storeBridge.getState().updateStepStatus

  const networkOrAccountErrors = wrongCurrentNetwork || !connected
  const showLoading = loading && !networkOrAccountErrors

  const [approved, setApproved] = useState(false)

  // If network valid and connected,  call approve
  React.useEffect(() => {
    if (!networkOrAccountErrors && !loading && !transferError && transfer && !loadingTransaction) {
      setLoading(true)
      transfer()
        .then((res) => {
          setApproved(true)
        })
        .catch((error) => {
          setTransferError(true)
          setLoading(false)
        })
    }
  }, [networkOrAccountErrors, transferError])

  // Waiting for Block Confirmations
  React.useEffect(() => {
    if (!loadingTransaction && approved) {
      setLoading(false)
      updateStepStatus(BRIDGE_STEPS.TRANSFER, true)
      changeStep(BRIDGE_STEPS.SWITCH_NETWORK)
    }
  }, [loadingTransaction, approved])

  // Validate chainId if current not equal "from" chainId
  React.useEffect(() => {
    if (wrongCurrentNetwork) {
      setChainId(networkFrom?.chainId)
    }
  }, [wrongCurrentNetwork])

  return (
    <Wrapper>
      {transferError ? (
        <TransferError
          onRepeat={() => {
            setTransferError(false)
          }}
        />
      ) : showLoading ? (
        <TransferLoader token={token} amount={token ? formatValue(amount, token?.decimals) : '0'} />
      ) : (
        <ConfirmMessage />
      )}
    </Wrapper>
  )
}

const StyledConfirm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;

    text-align: center;
    letter-spacing: 0.3px;

    color: #0b1359;
  }
`
const ConfirmMessage = () => {
  return (
    <StyledConfirm>
      <BridgeConfirmIcon />
      <p>Confirm the transaction in your wallet</p>
    </StyledConfirm>
  )
}

export default TransferStep
