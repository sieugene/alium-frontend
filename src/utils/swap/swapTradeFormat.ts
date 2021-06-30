import { Trade } from '@alium-official/sdk'

export const swapTradeFormat = (trade: Trade) => {
  return {
    token: `${trade?.inputAmount?.toSignificant(6)} ${trade?.inputAmount?.currency?.symbol}`,
    value: `${trade?.outputAmount?.toSignificant(6)} ${trade?.outputAmount?.currency?.symbol}`,
  }
}
