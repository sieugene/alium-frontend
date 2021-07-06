import { CurrencyAmount, Price } from '@alium-official/sdk'
// toSignificant like metamask
export const toSignificantCurrency = (currency: CurrencyAmount | Price) => {
  if (currency && currency?.toSignificant) {
    const total = Number(currency.toSignificant(1000))
    const replaced = getFlooredFixed(total, 3)
    return replaced
  }
  return ''
}
function getFlooredFixed(v: number, d: number) {
  // eslint-disable-next-line no-restricted-properties
  return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d)
}
