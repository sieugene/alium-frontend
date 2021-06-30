import { Currency, TokenAmount } from '@alium-official/sdk'
import { Field } from 'state/mint/actions'

export type addLiquidityCurrencyFormatPayload = {
  liquidityMinted: TokenAmount
  currencies: {
    CURRENCY_A?: Currency
    CURRENCY_B?: Currency
  }
}

export const addLiquidityCurrencyFormat = (data: addLiquidityCurrencyFormatPayload) => {
  const { liquidityMinted, currencies } = data
  return {
    value: liquidityMinted?.toSignificant(6),
    token1: `${currencies[Field.CURRENCY_A]?.symbol}`,
    token2: `${currencies[Field.CURRENCY_B]?.symbol}`,
  }
}
