import { Currency, TokenAmount } from '@alium-official/sdk'
import { ColumnCenter } from 'components/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { ExchangeIcon } from 'images/Exchange-icon'
import { FC, memo } from 'react'
import { Field } from 'state/mint/actions'
import styled from 'styled-components'

const StyledAddIcon = styled.div`
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;

  align-items: center;
  margin-bottom: 7px;
  justify-content: center;
  padding: 4px;
  border-radius: 12px;
  background: #fff;
  transition: 0.4s;
  svg {
    outline: none;
  }
  :hover {
    background: ${({ theme }) => theme.colors.primary};

    & svg path {
      stroke: #fff;
    }
  }
  > * {
    margin: auto;
  }
`

interface Props {
  formattedAmounts: any
  onFieldAInput: (typedValue: string) => void
  maxAmounts: {
    CURRENCY_A?: TokenAmount
    CURRENCY_B?: TokenAmount
  }
  atMaxAmounts: {
    CURRENCY_A?: TokenAmount
    CURRENCY_B?: TokenAmount
  }
  currencies: {
    CURRENCY_A?: Currency
    CURRENCY_B?: Currency
  }
  handleCurrencyASelect: (currA: Currency) => void
  onFieldBInput: (typedValue: string) => void
  handleCurrencyBSelect: (currB: Currency) => void
}

export const AddLiqudityInputs: FC<Props> = memo(
  ({
    formattedAmounts,
    onFieldAInput,
    maxAmounts,
    atMaxAmounts,
    handleCurrencyASelect,
    currencies,
    onFieldBInput,
    handleCurrencyBSelect,
  }) => {
    const onSwitchTokens = () => {
      handleCurrencyASelect(currencies[Field.CURRENCY_B])
      onFieldAInput(formattedAmounts[Field.CURRENCY_B])
      handleCurrencyBSelect(currencies[Field.CURRENCY_A])
      onFieldBInput(formattedAmounts[Field.CURRENCY_A])
    }
    return (
      <>
        <CurrencyInputPanel
          label='From'
          value={formattedAmounts[Field.CURRENCY_A]}
          onUserInput={onFieldAInput}
          onMax={() => {
            onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
          }}
          onCurrencySelect={handleCurrencyASelect}
          showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
          currency={currencies[Field.CURRENCY_A]}
          id='add-liquidity-input-tokena'
          showCommonBases={false}
        />
        <ColumnCenter>
          <StyledAddIcon
            onClick={() => {
              onSwitchTokens()
            }}
          >
            <ExchangeIcon />
          </StyledAddIcon>
        </ColumnCenter>
        <CurrencyInputPanel
          label='To (estimated)'
          value={formattedAmounts[Field.CURRENCY_B]}
          onUserInput={onFieldBInput}
          onCurrencySelect={handleCurrencyBSelect}
          onMax={() => {
            onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
          }}
          showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
          currency={currencies[Field.CURRENCY_B]}
          id='add-liquidity-input-tokenb'
          showCommonBases={false}
        />
      </>
    )
  },
)
