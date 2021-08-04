import { ExchangeIcon } from 'images/Exchange-icon'
import { storeBridge, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import { useBridgeTokens } from 'views/bridge/hooks/useBridgeTokens'
import AdvancedInput from '../AdvancedInput'
import { BridgeTransferButton } from '../BridgeTransferButton'
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
  const updateInput = storeBridge.getState().updateBridgeInputs
  const value = useStoreBridge((state) => state.bridgeInputs.main)

  const { tokens, balances } = useBridgeTokens('ALM')
  const token = tokens.fromNetwork
  const tokenBalance = balances.fromNetwork

  const onUserInput = (value: string) => {
    updateInput('main', value)
    updateInput('from', value)
    updateInput('to', value)
  }

  const transfer = () => {
    toggleModal(true)
  }

  const onMax = () => {
    const balance = toSignificantCurrency(tokenBalance)
    updateInput('main', balance)
    updateInput('from', balance)
    updateInput('to', balance)
  }

  return (
    <InputWrapper>
      <div className='left-column'>
        <div className='input'>
          <BridgeCurrencyInput
            id='bridge-input'
            showMaxButton={true}
            onUserInput={onUserInput}
            value={value}
            onMax={onMax}
            currency={token}
            disableCurrencySelect
          />
          <BridgeTransferButton onClick={transfer} desktop disabled={Boolean(Number(value) <= 0)}>
            Transfer
          </BridgeTransferButton>
        </div>

        <AdvancedInput>
          <BridgeTransferButton onClick={transfer} mobile disabled={Boolean(Number(value) <= 0)}>
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
