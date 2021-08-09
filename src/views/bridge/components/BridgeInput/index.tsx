import { useBridgeContext } from 'contexts/BridgeContext'
import { ExchangeIcon } from 'images/Exchange-icon'
import { useCallback } from 'react'
import { storeBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { formatValue } from 'utils/bridge/helpers'
import AdvancedInput from '../AdvancedInput'
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

  const {
    fromToken: token,
    setAmount,
    fromBalance: balance,
    amountInput: input,
    setAmountInput: setInput,
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
    const balance = formatValue(tokenBalance, token?.decimals)
    setInput(balance)
  }

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
          />
          <BridgeTransferButton onClick={transfer} desktop disabled={Boolean(Number(input) <= 0)}>
            Transfer
          </BridgeTransferButton>
        </div>

        <AdvancedInput>
          <BridgeTransferButton onClick={transfer} mobile disabled={Boolean(Number(input) <= 0)}>
            Transfer
          </BridgeTransferButton>
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
