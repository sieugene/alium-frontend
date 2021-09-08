import { getBalanceNumber } from 'utils/formatBalance'
import { useBnbPriceFromPid } from 'views/farms/hooks/useFarmingPools'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalCake = getBalanceNumber(totalRewards)
  const priceBnbBusd = useBnbPriceFromPid()

  return totalCake * priceBnbBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
