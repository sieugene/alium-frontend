import { Skeleton } from 'alium-uikit/src'
import { toEther, useTotalLocked } from 'views/StrongHoldersPool/hooks'
import StatsCard from '../StatsCard'
import Title from '../Title'
import { ReactComponent as LockedIcon } from './locked.svg'

export default function LockedInPoolsCard() {
  const { totalLocked } = useTotalLocked()
  return (
    <StatsCard
      icon={<LockedIcon />}
      title={<Title>Locked in pools</Title>}
      content={
        totalLocked ? <StatsCard.Value value={toEther(totalLocked)} suffix=' ALM' /> : <Skeleton height='100%' />
      }
    />
  )
}
