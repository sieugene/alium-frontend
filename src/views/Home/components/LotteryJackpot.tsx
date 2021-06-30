import { BigNumber } from 'bignumber.js'
import { useTotalRewards } from 'hooks/useTickets'
import React from 'react'
// import useI18n from 'hooks/useI18n'
import { usePriceCakeBusd } from 'state/hooks'
// import { Text } from 'alium-uikit/src'
import { getBalanceNumber } from 'utils/formatBalance'
import CardBusdValue from './CardBusdValue'
import CardValue from './CardValue'

const LotteryJackpot = () => {
  // const TranslateString = useI18n()
  const lotteryPrizeAmount = useTotalRewards()
  const balance = getBalanceNumber(lotteryPrizeAmount)
  // const lotteryPrizeAmoutCake = balance.toLocaleString(undefined, {
  //   maximumFractionDigits: 2,
  // })
  const lotteryPrizeAmountBusd = new BigNumber(balance).multipliedBy(usePriceCakeBusd()).toNumber()

  return (
    <>
      <CardValue value={10} lineHeight="1.5" />
      <CardBusdValue value={lotteryPrizeAmountBusd} />
    </>
  )
}

export default LotteryJackpot
