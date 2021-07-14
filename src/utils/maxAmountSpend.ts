import { CurrencyAmount, JSBI } from '@alium-official/sdk'
import { MIN_ETH } from 'config/settings'
import { storeNetwork } from 'store/network/useStoreNetwork'

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount): CurrencyAmount | undefined {
  const { nativeCurrency } = storeNetwork.getState().networkProviderParams
  if (!currencyAmount) return undefined
  if (currencyAmount.currency === nativeCurrency) {
    if (JSBI.greaterThan(currencyAmount.raw, MIN_ETH)) {
      return CurrencyAmount.ether(JSBI.subtract(currencyAmount.raw, MIN_ETH))
    }
    return CurrencyAmount.ether(JSBI.BigInt(0))
  }
  return currencyAmount
}

export default maxAmountSpend
