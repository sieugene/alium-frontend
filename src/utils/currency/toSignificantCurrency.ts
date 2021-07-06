import { CurrencyAmount, Price } from '@alium-official/sdk'
// toSignificant like metamask
export const toSignificantCurrency = (currency: CurrencyAmount | Price) => {
  if (currency && currency?.toSignificant) {
    const total = Number(currency.toSignificant(1000))
    const replaced = getFlooredFixed(total, 3)
    return formatZero(replaced, total.toString())
  }
  return ''
}
function getFlooredFixed(v: number, d: number) {
  // eslint-disable-next-line no-restricted-properties
  return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d)
}
const formatZero = (formatted: string, fullStr: string) => {
  const isZero = formatted[formatted.length - 1] === '0'
  if (isZero && formatted.length > 2 && fullStr.length > 2) {
    const shift = fullStr[fullStr.length - 2] || ''
    return formatted.substring(0, formatted.length - 1) + shift
  }
  return formatted
}
