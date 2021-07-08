import { BigNumber } from 'bignumber.js'
import { useTotalClaim } from 'hooks/useTickets'
import { usePriceCakeBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import CardBusdValue from './CardBusdValue'
import CardValue from './CardValue'

const CakeWinnings = () => {
  const { claimAmount } = useTotalClaim()
  const claimAmountBusd = new BigNumber(claimAmount).multipliedBy(usePriceCakeBusd()).toNumber()

  return (
    <>
      <CardValue value={getBalanceNumber(claimAmount)} lineHeight='1.5' />
      <CardBusdValue value={claimAmountBusd} />
    </>
  )
}

export default CakeWinnings
