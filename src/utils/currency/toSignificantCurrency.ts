import { CurrencyAmount, Fraction, JSBI, Price } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from './../formatBalance'

// toSignificant like uniswap
export const toSignificantCurrency = (currency: CurrencyAmount | Price) => {
  return formatCurrency(currency)
}
const formatCurrency = (currency: CurrencyAmount | Price, maxSub = 7) => {
  const RawBN = currency?.raw && new BigNumber(Number(`${currency.raw}`))
  // Dont use toString but '1.245000' make to '1.245'
  const amount = RawBN && `${getBalanceNumber(RawBN)}`.substring(0, maxSub)
  const firstMin = '0.0010'

  if (isNaN(getBalanceNumber(RawBN))) {
    return '-'
  }

  // Undefined condition
  if (!amount || !currency) {
    return '-'
  }

  // Zero condition
  // if (JSBI.equal(currency.quotient, JSBI.BigInt(0))) {
  //   return '0'
  // }

  // Minimal zeros is 0.001, checkout - 0.0011 is false and  0.0010 is true
  if (isMinimalAmount(amount, firstMin)) {
    return firstMin.slice(0, -1)
  }
  // Less
  if (Number(amount) < 0.00001) {
    return '<0.00001'
  }
  // Make '1.245000' to '1.245'
  return dropZero(amount) || '-'
}

const isMinimalAmount = (amount: string, min: string) => {
  const splitted = amount.split('')
  const zero = min.split('')
  let coincidence = 0
  zero.forEach((z, index) => {
    if (splitted[index] === z) {
      coincidence += 1
    }
  })
  return coincidence === 6
}

const dropZero = (str: string) => {
  const numbered = Number(str)
  return numbered ? numbered.toString() : str
}

// Uniswap formatter from uniswap-interface
export function formatCurrencyAmount(amount: CurrencyAmount | Price, sigFigs = 4) {
  if (!amount) {
    return '-'
  }

  if (JSBI.equal(amount.quotient, JSBI.BigInt(0))) {
    return '0'
  }

  if (amount.divide(amount).lessThan(new Fraction(JSBI.BigInt(1), JSBI.BigInt(1000)))) {
    return '<0.00001'
  }

  return amount.toSignificant(sigFigs)
}
