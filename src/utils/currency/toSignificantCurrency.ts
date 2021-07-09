import { CurrencyAmount, Price } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from './../formatBalance'

// toSignificant like metamask

export const toSignificantCurrency = (currency: CurrencyAmount | Price) => {
  if (currency?.raw) {
    const RawBN = new BigNumber(Number(`${currency.raw}`))
    const balance = getBalanceNumber(RawBN)
    return formatDigits(balance)
    // old method
    // return currency?.toSignificant(6)
  }
  return ''
}
const formatDigits = (balance: number) => {
  const text = balance.toString()
  const splitted = text.split('.')
  const half = splitted?.length > 1 && splitted[1].split('')
  const firstIsZero = half?.length >= 2 && half[0] + half[1] + half[2] === '000'
  if (firstIsZero) {
    return NonZero(half)
  } else {
    const replaced = getFlooredFixed(Number(balance), 3)
    return formatZero(replaced, balance.toString())
  }
}
// Оставляет нули, заполняя последним отличным от нуля
const NonZero = (words: string[]) => {
  let word = ''
  let breaked = false
  words.forEach((symbol) => {
    const asNumber = Number(symbol)
    if (!breaked) {
      if (asNumber === 0) {
        word += symbol
      } else {
        word += symbol
        breaked = true
      }
    }
  })
  return word
}

function getFlooredFixed(v: number, d: number) {
  return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d)
}
const formatZero = (formatted: string, fullStr: string) => {
  const isZero = formatted[formatted.length - 1] === '0'
  if (isZero && formatted.length > 2 && fullStr.length > 2) {
    const shiftedValue = fullStr[fullStr.length - 2]
    const shift = (shiftedValue !== '.' && shiftedValue !== '0' && fullStr[fullStr.length - 2]) || ''
    return formatted.substring(0, formatted.length - 1) + shift
  }
  return formatted
}
