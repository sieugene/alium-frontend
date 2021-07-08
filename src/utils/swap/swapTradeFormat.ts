import { Trade } from '@alium-official/sdk'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'

export const swapTradeFormat = (trade: Trade) => {
  return {
    token: `${toSignificantCurrency(trade?.inputAmount)} ${trade?.inputAmount?.currency?.symbol}`,
    value: `${toSignificantCurrency(trade?.outputAmount)} ${trade?.outputAmount?.currency?.symbol}`,
  }
}
