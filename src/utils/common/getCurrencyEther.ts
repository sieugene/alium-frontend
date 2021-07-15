import { Token, WETH } from '@alium-official/sdk'

// Do not user CurrencyAmount.ether but only return BNB
export const getCurrencyEther = (chainId: number): Token => {
  // return WETH[chainId] || CurrencyAmount.ether
  return WETH[chainId]
}
