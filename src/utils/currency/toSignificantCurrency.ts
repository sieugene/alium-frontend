import { CurrencyAmount, Fraction, JSBI, Price } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance } from './../formatBalance'

// toSignificant like uniswap
export const toSignificantCurrency = (currency: CurrencyAmount | Price, defaultValue?: string) => {
  return formatCurrency(currency, 6, defaultValue)
}

const formatCurrency = (currency: CurrencyAmount | Price, maxSub = 6, defVal?: string) => {
  const defaultValue = defVal || '-'
  const RawBN = currency?.raw && new BigNumber(Number(`${currency.raw}`))
  // Dont use toString but '1.245000' make to '1.245'

  const balance = RawBN && `${getFullDisplayBalance(RawBN)}`?.split('.')
  const amount = fromSplitBalance(balance, maxSub)

  const firstMin = '0.0010'

  // Undefined condition
  if ((RawBN && isNaN(Number(getFullDisplayBalance(RawBN)))) || !amount || !currency) {
    return defaultValue
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
  return dropZero(amount) || defaultValue
}

// Split by "." max size after "." 6
const fromSplitBalance = (balance: string[], maxSub: number) => {
  if (balance?.length >= 2) {
    return `${balance[0]}.${balance[1].substring(0, maxSub)}`
  }
  if (balance?.length === 1) {
    return `${balance[0]}`
  }
  return balance?.length ? balance[0] : ''
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
