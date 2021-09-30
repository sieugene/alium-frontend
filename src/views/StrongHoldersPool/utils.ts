import BigNumber from 'bignumber.js'

export function formatBigNumber(value: BigNumber) {
  return value.decimalPlaces(4, BigNumber.ROUND_FLOOR).toFormat({
    ...BigNumber.config(null).FORMAT,
    groupSeparator: ' ',
  })
}
