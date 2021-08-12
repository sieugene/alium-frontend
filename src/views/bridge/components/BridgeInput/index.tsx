import { useBridgeContext } from 'contexts/BridgeContext'
import { BigNumber } from 'ethers'
import { ExchangeIcon } from 'images/Exchange-icon'
import { useCallback } from 'react'
import { storeBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { formatBridgeTokenAmount } from 'utils/bridge/helpers'
import { isRebasingToken } from 'utils/bridge/rebasingTokens'
import AdvancedInput from '../AdvancedInput'
import BridgeApproveBtn from '../BridgeApproveBtn'
import { BridgeTransferButton } from '../BridgeTransferButton'
import { useDelay } from '../FromToken'
import BridgeCurrencyInput from './BridgeCurrencyInput'

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .input {
    display: flex;
  }
  .right-column {
    display: flex;
    align-items: center;
  }
`

const SwitchIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: linear-gradient(0deg, #ffffff, #ffffff);
  box-shadow: 0px 6px 8px rgba(220, 224, 244, 0.56);
  border-radius: 40px;
  transition: 0.4s;
  :hover {
    background: ${({ theme }) => theme.colors.primary};

    & svg path {
      stroke: #fff;
    }
  }
`

const BridgeInput = () => {
  const toggleModal = storeBridge.getState().toggleModal
  const toggleNetworks = storeBridge.getState().toggleNetworks
  const { tokensDetailLoader } = useBridgeContext()

  const {
    fromToken: token,
    setAmount,
    toAmountLoading,
    allowed,
    fromBalance: balance,
    amountInput: input,
    toAmount,
    fromAmount,
    setAmountInput: setInput,
    approve,
    unlockLoading,
  } = useBridgeContext()

  const tokenBalance = balance

  const updateAmount = useCallback(() => {
    setAmount(input)
  }, [input, setAmount])
  const delayedSetAmount = useDelay(updateAmount, 500)

  const transfer = () => {
    toggleModal(true)
  }

  const onMax = () => {
    const balance = formatBridgeTokenAmount(token, tokenBalance)
    setInput(balance)
    setAmount(balance)
  }

  const disableBtn = toAmount <= BigNumber.from(0) || fromAmount <= BigNumber.from(0) || Boolean(Number(input) <= 0)

  const isRebaseToken = isRebasingToken(token)
  const disabledApprove = allowed || isRebaseToken || toAmountLoading

  return (
    <InputWrapper>
      <div className='left-column'>
        <div className='input'>
          <BridgeCurrencyInput
            id='bridge-input'
            showMaxButton={true}
            onUserInput={setInput}
            value={input}
            onMax={onMax}
            currency={token}
            disableCurrencySelect
            onKeyUp={delayedSetAmount}
            loading={tokensDetailLoader}
          />
          {disabledApprove ? (
            <BridgeTransferButton onClick={transfer} desktop disabled={disableBtn}>
              Transfer
            </BridgeTransferButton>
          ) : (
            <BridgeApproveBtn
              amount={fromAmount}
              balance={balance}
              approve={approve}
              buttonDisabled={disabledApprove}
              unlockLoading={unlockLoading}
              desktop
            />
          )}
        </div>

        <AdvancedInput>
          {disabledApprove ? (
            <BridgeTransferButton onClick={transfer} mobile disabled={disableBtn}>
              Transfer
            </BridgeTransferButton>
          ) : (
            <BridgeApproveBtn
              amount={fromAmount}
              balance={balance}
              approve={approve}
              buttonDisabled={disabledApprove}
              unlockLoading={unlockLoading}
              mobile
            />
          )}
        </AdvancedInput>
      </div>
      <div className='right-column'>
        <SwitchIcon onClick={toggleNetworks}>
          <ExchangeIcon />
        </SwitchIcon>
      </div>
    </InputWrapper>
  )
}

export default BridgeInput
