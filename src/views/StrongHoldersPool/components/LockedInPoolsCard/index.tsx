import { Skeleton } from 'alium-uikit/src'
import { ethersToBigNumber } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { useRewardTokenInfo, useTotalLocked } from 'views/StrongHoldersPool/hooks'
import StatsCard from '../StatsCard'
import Title from '../Title'
import { ReactComponent as LockedIcon } from './locked.svg'

export default function LockedInPoolsCard() {
  const { data: totalLocked } = useTotalLocked()
  const { rewardTokenSymbol } = useRewardTokenInfo()
  return (
    <StatsCard
      icon={<LockedIcon />}
      title={<Title>Locked in pools</Title>}
      content={
        totalLocked ? (
          <StatsCard.Value value={getBalanceAmount(ethersToBigNumber(totalLocked))} suffix={' ' + rewardTokenSymbol} />
        ) : (
          <Skeleton height='100%' />
        )
      }
    />
  )
}
