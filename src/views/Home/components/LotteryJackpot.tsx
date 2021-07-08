import { BigNumber } from 'bignumber.js'
import { useTotalRewards } from 'hooks/useTickets'
import { usePriceCakeBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import CardBusdValue from './CardBusdValue'
import CardValue from './CardValue'

const LotteryJackpot = () => {
  const lotteryPrizeAmount = useTotalRewards()
  const balance = getBalanceNumber(lotteryPrizeAmount)
  const lotteryPrizeAmountBusd = new BigNumber(balance).multipliedBy(usePriceCakeBusd()).toNumber()

  return (
    <>
      <CardValue value={10} lineHeight='1.5' />
      <CardBusdValue value={lotteryPrizeAmountBusd} />
    </>
  )
}

export default LotteryJackpot
