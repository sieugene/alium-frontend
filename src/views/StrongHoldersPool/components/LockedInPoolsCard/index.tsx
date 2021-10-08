import { Skeleton } from 'alium-uikit/src'
import { ethersToBN, toEther } from 'utils/bigNumber'
import { useRewardTokenSymbol, useTotalLocked } from 'views/StrongHoldersPool/hooks'
import StatsCard from '../StatsCard'
import Title from '../Title'
import { ReactComponent as LockedIcon } from './locked.svg'

export default function LockedInPoolsCard() {
  const { data: totalLocked } = useTotalLocked()
  const rewardTokenSymbol = useRewardTokenSymbol()
  return (
    <StatsCard
      icon={<LockedIcon />}
      title={<Title>Locked in pools</Title>}
      content={
        totalLocked ? (
          <StatsCard.Value value={toEther(ethersToBN(totalLocked))} tokenSymbol={rewardTokenSymbol} />
        ) : (
          <Skeleton height='100%' />
        )
      }
    />
  )
}
