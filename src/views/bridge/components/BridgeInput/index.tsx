import { useAlmToken } from 'hooks/useAlm'
import { ExchangeIcon } from 'images/Exchange-icon'
import { useState } from 'react'
import styled from 'styled-components'
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
  const [value, setvalue] = useState('0')
  const token = useAlmToken()
  const onUserInput = (value: string) => {
    setvalue(value)
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
            currency={token}
            disableCurrencySelect
          />
          <BridgeTransferButton desktop disabled={Boolean(Number(value) <= 0)}>
            Transfer
          </BridgeTransferButton>
        </div>

        <AdvancedInput>
          <BridgeTransferButton mobile disabled={Boolean(Number(value) <= 0)}>
            Transfer
          </BridgeTransferButton>
        </AdvancedInput>
      </div>
      <div className='right-column'>
        <SwitchIcon
          onClick={() => {
            // onSwitchTokens()
          }}
        >
          <ExchangeIcon />
        </SwitchIcon>
      </div>
    </InputWrapper>
  )
}

const CurrencyInput = () => {
  return
}

export default BridgeInput
