import { getBalanceNumber } from 'utils/formatBalance'
import { useBusdPriceFromPid } from './../views/farms/hooks/useFarmingPools'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalCake = getBalanceNumber(totalRewards)
  // this is wrong
  const priceBnbBusd = useBusdPriceFromPid(1)

  return totalCake * priceBnbBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
