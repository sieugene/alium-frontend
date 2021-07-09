import { Currency, TokenAmount } from '@alium-official/sdk'
import { AddIcon } from 'alium-uikit/src'
import { ColumnCenter } from 'components/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { memo, FC } from 'react';
import { Field } from 'state/mint/actions'
import styled from 'styled-components'

const StyledAddIcon = styled.div`
  border: 1.5px solid #6c5dd3;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  display: flex;

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
          <StyledAddIcon>
            <AddIcon color='#6C5DD3' width='12px' />
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
